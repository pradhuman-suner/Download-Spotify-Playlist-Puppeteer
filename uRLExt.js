
const puppeteer = require('puppeteer-extra');


// Add stealth plugin and use defaults 
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

// Use stealth 
puppeteer.use(pluginStealth());

const chromeExecutablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'; // |

(async () => {
    const browser = await puppeteer.launch({ headless: false, executablePath: chromeExecutablePath, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

    // Specify the number of iterations
   
    console.log('No of Songs : '+  await countDownloadButtons(browser));
    const numIterations = 1; 

    // Array to store extracted URLs
    const extractedUrls = [];

    // Iterate through the specified number of times
    for (let i = 0; i < numIterations; i++) {

        const page = await browser.newPage();

        // Navigate to the initial webpage
        await page.goto('https://spotifymate.com/');

        // Wait for the page to load
        await page.waitForSelector('#url');

        // Input the Spotify playlist link
        const spotifyLink = 'https://open.spotify.com/playlist/29EAuIFb4uQSTNWFnnvSua?si=aaecb0508047452f&nd=1';
        await page.type('#url', spotifyLink);

        // Click the Search button
        await page.click('#send');

        await autoScroll(page);

        // Wait for the search results to load
        await page.waitForSelector('.abutton.is-success.is-fullwidth');
        // Find all buttons within the specified div class
        const buttons = await page.$$('.abutton.is-success.is-fullwidth');

        // Click the download button for the current iteration
        const downloadButton = buttons[i];
        await downloadButton.click();
        await page.waitForNavigation();

        // Find the <a> tag and extract the href attribute
        const aTag = await page.$('.abutton.is-success.is-fullwidth');
        const href = await aTag.evaluate(element => element.getAttribute('href'));

        // Add the extracted URL to the array
        extractedUrls.push(href);

        page.close();

    }

    console.log('Extracted URLs:', extractedUrls);


    // Save extracted URLs to a text file
    const urlsText = extractedUrls.join('\n');
    fs.writeFileSync('extracted_urls.txt', urlsText, 'utf-8');
    console.log('Extracted URLs saved to extracted_urls.txt');



    const downloadpage = await browser.newPage();
    // Open extracted URLs in Chrome
    for (const url of extractedUrls) {


        try {
            await downloadpage.goto(url);
            console.log(`Opened: ${url}`);
        } catch (error) {
            console.error(`Error opening ${url}: ${error.message}`);
            continue;
        }

    }

    //await browser.close();
})();


async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            const distance = 200; // Increase this value for faster scrolling
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 50); // Decrease this value for faster scrolling
        });
    });
}


async function countDownloadButtons(browser) {


    const pageNew = await browser.newPage();

    // Navigate to the initial webpage
    await pageNew.goto('https://spotifymate.com/');
    await pageNew.waitForSelector('#url');

    // Input the Spotify playlist link
    const spotifyLink = 'https://open.spotify.com/playlist/29EAuIFb4uQSTNWFnnvSua?si=aaecb0508047452f&nd=1';
    await pageNew.type('#url', spotifyLink);

    // Click the Search button
    await pageNew.click('#send');

    await autoScroll(pageNew);

    const downloadButtonSelector = '.abutton.is-success.is-fullwidth';

    // Wait for the download buttons to appear
    await pageNew.waitForSelector(downloadButtonSelector);

    // Get the count of download buttons
    const downloadButtonCount = await pageNew.$$eval(downloadButtonSelector, buttons => buttons.length);

    return downloadButtonCount;
}