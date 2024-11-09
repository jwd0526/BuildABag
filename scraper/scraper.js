const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
	let browser = await chromium.launch({ headless: true });
	let page = await browser.newPage();

	const filePath = 'clubs_data.csv';
	fs.writeFileSync(filePath, "Type,Manufacturer,Product Name,Loft,Club No,Rule Pre-2010,Rule Post-2010,Image Link\n");

	await page.goto('https://www.usga.org/InfoClubsDB/Search.aspx');
	const results = [];
	let clubTypeElements = await page.$$("#ddlclubtypes option");
	let clubTypeOptions = await Promise.all(
		clubTypeElements.map(async (type) => await type.textContent())
	);

	for (let i = 1; i < clubTypeOptions.length; i++) {
		const clubTypeValue = clubTypeOptions[i].replace(/ \(\d+\)$/, "");
		await page.selectOption('#ddlclubtypes', clubTypeElements[i]);
		await page.waitForTimeout(1000);

		let manufacturerElements = await page.$$('#ddlManf option');
		for (let j = 2; j < manufacturerElements.length; j++) {
			await page.selectOption('#ddlManf', manufacturerElements[j]);
			await page.waitForTimeout(1000);

			await page.click("#btnSubmit");

			let startTime = Date.now();
			await page.route('**/*', (route) => {
				if (Date.now() - startTime > 1000) {
					route.abort();
				} else {
					route.continue();
				}
			});

			await page.waitForSelector('#conformingContainer', { timeout: 5000 });

			const containers = await page.$$('#conformingContainer');
			for (const container of containers) {
				const club = {
					type: clubTypeValue.substring(0, clubTypeValue.length - 8),
					manufacturer: await container.$(':nth-child(1) > :nth-child(2)').then(el => el?.textContent()).then(text => text?.trim()),
					productName: await container.$(':nth-child(2) > :nth-child(2)').then(el => el?.textContent()).then(text => text?.trim()),
					loft: await container.$(':nth-child(3) > :nth-child(2)').then(el => el?.textContent()).then(text => text?.trim()),
					clubNo: await container.$(':nth-child(4) > :nth-child(2)').then(el => el?.textContent()).then(text => text?.trim()),
					pre2010: await container.$(':nth-child(6) > :nth-child(2)').then(el => el?.textContent()).then(text => text?.trim()),
					year2010: await container.$(':nth-child(7) > :nth-child(2)').then(el => el?.textContent()).then(text => text?.trim()),
					imgLink: await container.$(':nth-child(8) > :nth-child(3) > :nth-child(1)').then(el => el?.getAttribute('src'))
				};
		
				results.push(club);
				const csvRow = `${club.type},${club.manufacturer},${club.productName},${club.loft},${club.clubNo},${club.pre2010},${club.year2010},${club.imgLink}\n`;
				fs.appendFileSync(filePath, csvRow);
				await page.waitForTimeout(10);
				console.log(club);
			}

			await browser.close();
			browser = await chromium.launch({ headless: true });
			page = await browser.newPage();

			await page.goto('https://www.usga.org/InfoClubsDB/Search.aspx');
			clubTypeElements = await page.$$("#ddlclubtypes option");
			await page.selectOption('#ddlclubtypes', clubTypeElements[i]);
			await page.waitForTimeout(1000);
			manufacturerElements = await page.$$('#ddlManf option');
		}
	}

	console.log(results);
	await browser.close();
})();
