
# Download Spotify Playlist using Puppeteer

![GitHub stars](https://img.shields.io/github/stars/pradhuman-suner/Download-Spotify-Playlist---Puppeteer-)
![GitHub forks](https://img.shields.io/github/forks/pradhuman-suner/Download-Spotify-Playlist---Puppeteer-)
![GitHub](https://img.shields.io/github/license/pradhuman-suner/Download-Spotify-Playlist---Puppeteer-)

This repository contains a Puppeteer script that allows you to download Spotify playlists from [spotifymate.com](https://spotifymate.com/#!/). The script uses the Spotify API to authenticate and access playlist data for downloading.

## Prerequisites

- Node.js installed
- [Token ID for Spotify API](#getting-the-spotify-api-token-id)
- [Authentication Token](#getting-the-authentication-token)
- Google Chrome installed (for `chrome.exe` path)

## Getting Started

1. Clone this repository:

   ```sh
   git clone https://github.com/pradhuman-suner/Download-Spotify-Playlist---Puppeteer-.git
   cd Download-Spotify-Playlist---Puppeteer-
   ```

2. Install the necessary dependencies right in the project folder:

   ```sh
   npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth axios fs

   ```

3. Open the `main.js` file and replace the placeholders with your Spotify playlist details and access token.

4. If you haven't done so already, make sure to update the `chromeExecutablePath` variable with the correct path to your Google Chrome executable.

5. Run the Puppeteer script:

   ```sh
   node main.js
   ```

   The script will fetch the playlist data, navigate to [spotifymate.com](https://spotifymate.com/#!/), input the playlist link, and start the download process for each track in the playlist.

## Getting the Spotify API Token ID and Authentication Token

To access the Spotify API and use the script effectively, you'll need a Spotify playlist ID and an authentication token. Follow these steps to obtain them:

### Using Spotify Developer Account

If you have a Spotify Developer account, you can obtain the necessary information from there:

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
2. Create a new app if you haven't already.
3. Find your **Client ID** and **Client Secret** within your app settings.
4. Use your Client ID and Secret to obtain the Authentication Token by following the [Spotify Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/).
5. Obtain the Playlist ID for the playlist you want to download.

### Without a Spotify Developer Account

If you don't have a Spotify Developer account, you can manually retrieve the necessary information:

1. Open your browser and log in to Spotify.
2. Open the developer console using F12 or Ctrl+Shift+I.
3. Navigate to the "Network" tab.
4. Play a playlist and look for a network request named `operationName=fetchPlaylistMetadata`.
5. Find the request headers, and look for the `Authorization` header. The value after "Bearer " is your authentication token.
6. Check the response of the `operationName=fetchPlaylistMetadata` request, and you will find the playlist ID in the response data.

Replace the placeholders in the `main.js` script with the obtained Playlist ID and Authentication Token.

## License

This project is licensed under the [MIT License](LICENSE).
