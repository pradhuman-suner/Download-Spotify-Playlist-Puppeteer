const puppeteer = require('puppeteer-extra');
const axios = require('axios');
// Add stealth plugin and use defaults 
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

// Use stealth 
puppeteer.use(pluginStealth());

const chromeExecutablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'; // |



(async () => {

    //const downloadPath = path.join(__dirname, 'C:\\Users\\tyson\\Desktop\\music'); // Change this to your desired download location

    const browser = await puppeteer.launch({
        headless: false,
        executablePath: chromeExecutablePath,
        defaultViewport: null, // To maximize the browser window
        // args: [`--user-data-dir=${downloadPath}`, '--disable-popup-blocking'],
    });
    

    // Replace these values with your Spotify playlist details
    const playlistId = '[ Spotify Playlist ID : 29EAuIFb4uQSTNWFnnvSua ';
    const accessToken = '[ Your Acess TOKEN ]';

    const offset = 100;
    const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=100`;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    try {
        // Fetch playlist data using Spotify API
        const response = await axios.get(apiUrl, { headers });
        const tracks = response.data.items;

        // Extract track URLs
        const trackUrls = tracks.map(track => track.track.external_urls.spotify);

        // Iterate through track URLs
        for (const trackUrl of trackUrls) {

            const page = await browser.newPage();

            // Navigate to the initial webpage
            await page.goto('https://spotifymate.com/');

            // Wait for the page to load
            await page.waitForSelector('#url');

            // Input the Spotify playlist link
            await page.type('#url', trackUrl);

            // Click the Search button
            await page.click('#send');

            // Wait for 5 seconds
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Wait for the download button to appear
            await page.waitForSelector('.abutton.is-success.is-fullwidth');

            // Find the <a> tag and extract the href attribute
            const aTag = await page.$('.abutton.is-success.is-fullwidth');
            const href = await aTag.evaluate(element => element.getAttribute('href'));


            try {
                await page.goto(href);
                console.log(`Opened: ${href}`);
                await new Promise(resolve => setTimeout(resolve, 2000));
                await page.close();
            
            } catch (error) {
                console.error(`Error opening ${href}: ${error.message}`);
                await new Promise(resolve => setTimeout(resolve, 2000));
                await page.close();
            
                continue;
            }



            
        }
    } catch (error) {
        console.error('Error:', error.message);
    }

   // await browser.close();
})();
