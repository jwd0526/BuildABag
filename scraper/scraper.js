const { chromium } = require('playwright');
const fs = require('fs');
const { MongoClient } = require('mongodb');

(async () => {
    const mongoUri = "mongodb+srv://tomzhaozhenghang:Zzh20020304@cluster0.6tu3l.mongodb.net/itmsDB?retryWrites=true&w=majority"; // Replace with your MongoDB URI
    const client = new MongoClient(mongoUri);
    const dbName = "itmsDB"; // Replace with your database name
    const collectionName = "clubs";

    const filePath = 'clubs_data.csv';

    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB.");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Initialize CSV file with headers
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(
                filePath,
                "Type,Manufacturer,Product Name,Loft,Club No,Rule Pre-2010,Rule Post-2010,Image Link\n"
            );
        }

        // Launch Playwright browser
        let browser = await chromium.launch({ headless: false,
			executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
		}); // Change to true for headless
        let page = await browser.newPage();

        await page.goto('https://www.usga.org/InfoClubsDB/Search.aspx');
        console.log('Page loaded.');

        const results = [];
        let clubTypeElements = await page.$$("#ddlclubtypes option");
        if (clubTypeElements.length === 0) {
            throw new Error("No club types found. Check the page structure.");
        }
        console.log(`Found ${clubTypeElements.length} club types.`);

        for (let i = 1; i < clubTypeElements.length; i++) {
            const clubTypeValue = await clubTypeElements[i].textContent();
            console.log(`Processing club type: ${clubTypeValue.trim()}`);

            await page.selectOption('#ddlclubtypes', { index: i });
            await page.waitForTimeout(1000);

            let manufacturerElements = await page.$$('#ddlManf option');
            if (manufacturerElements.length === 0) {
                console.log(`No manufacturers found for club type ${clubTypeValue.trim()}. Skipping.`);
                continue;
            }

            for (let j = 2; j < manufacturerElements.length; j++) {
                await page.selectOption('#ddlManf', { index: j });
                await page.waitForTimeout(1000);

                await page.click("#btnSubmit");
                console.log(`Submitted club type ${clubTypeValue.trim()} and manufacturer index ${j}.`);

                try {
                    await page.waitForSelector('#conformingContainer', { timeout: 10000 });
                } catch (err) {
                    console.log(`No data found for manufacturer index ${j}. Skipping.`);
                    continue;
                }

                const containers = await page.$$('#conformingContainer');
                console.log(`Found ${containers.length} containers.`);

                for (const container of containers) {
                    const club = {
                        type: clubTypeValue.trim(),
                        manufacturer: await container.$(':nth-child(1) > :nth-child(2)')
                            .then(el => el?.textContent()?.trim()),
                        productName: await container.$(':nth-child(2) > :nth-child(2)')
                            .then(el => el?.textContent()?.trim()),
                        loft: await container.$(':nth-child(3) > :nth-child(2)')
                            .then(el => el?.textContent()?.trim()),
                        clubNo: await container.$(':nth-child(4) > :nth-child(2)')
                            .then(el => el?.textContent()?.trim()),
                        pre2010: await container.$(':nth-child(6) > :nth-child(2)')
                            .then(el => el?.textContent()?.trim()),
                        year2010: await container.$(':nth-child(7) > :nth-child(2)')
                            .then(el => el?.textContent()?.trim()),
                        imgLink: await container.$(':nth-child(8) > :nth-child(3) > :nth-child(1)')
                            .then(el => el?.getAttribute('src')),
                    };

                    // Write to CSV
                    const csvRow = `${club.type},${club.manufacturer},${club.productName},${club.loft},${club.clubNo},${club.pre2010},${club.year2010},${club.imgLink}\n`;
                    fs.appendFileSync(filePath, csvRow);

                    // Insert into MongoDB
                    await collection.insertOne(club);
                    results.push(club);
                    console.log(`Inserted club: ${JSON.stringify(club)}`);
                }
            }
        }

        console.log("Scraping completed!");
        console.log(`Total clubs scraped: ${results.length}`);
    } catch (err) {
        console.error("An error occurred:", err);
    } finally {
        console.log("Closing MongoDB connection.");
        await client.close();
        console.log("MongoDB connection closed.");
    }
})();
