const { chromium } = require('playwright');

(async () => {
    let browser = await chromium.launch({ headless: true });
    let page = await browser.newPage();
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
            await page.waitForSelector('#conformingContainer');
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
