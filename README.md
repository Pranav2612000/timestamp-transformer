
# Timestamp Transformer

<p align="center">
  <img alt="Timestamp Transformer's Logo" width="128" height="128" src="https://raw.githubusercontent.com/Pranav2612000/timestamp-transformer/main/public/logo.png">
</p>

Personally, a irritating problem I encountered while debugging through logs was trying to understand the time a log was written. It was painful to copy the timestamp and then convert it to get the actual time. 
This extension fixes this by transforming all the timestamps on the page, so you can navigate through your logs without any problems.
You can set the formats you want to see the date(time) in and also choose a range between which you want the dates to be auto formatted. Also, you can conveniently disable this extension for certain sites. Just install the [extension](https://chrome.google.com/webstore/#comingSoon) and you're done.

## Screenshots
<img alt="Timestamp Transformer's Options page" width="350" height="500" src="https://raw.githubusercontent.com/Pranav2612000/timestamp-transformer/main/screenshots/SettingsVertial.png">

## Usage
- Install the [extension](https://chrome.google.com/webstore/#comingSoon) from the Chrome Extension Store.
- Once the extension is enabled, visiting any page should auto transform all timestamps between the values `1420050600000` and `1893436200000`. You can change these values from the settings/options page.
- The changed values will be bounded by a small red dotted border. Hovering over these values should show you the actual timestamp. Clicking on the timestamp would undo the current change.

### Settings
- From the settings page you can also set the format in which you want the dates to be displayed.
- Also, If you want the extension to be disabled for a certain page(or set of pages) you can add that url to the list of blacklisted sites on the settings page. [ Wildcards supported ]
- Alternatively, you can click on the 'Disable for this site' option on the Context Menu
- The context menu will also allow you to undo/redo all transformations on the page.

## How does it work?
- On page load, we go through all elements and look for the ones who match a timestamp( in our range ).
- Once an element is found, we transform it to the output format and replace the original text.
- We wrap this transformed text in a separate `<span>` element which is responsible for custom styling, and special hover and click effects.

## Contribute
Create a fork and clone it. Run `npm install` to install the required dependencies.
To develop the extension, run `npm run dev-extension`. This will generate the extension build in `www/build` folder. Load it into chrome to test out the extension.

## Bug Reporting
Report your issues at https://github.com/Pranav2612000/timestamp-transformer/issues

## Designs
-

## Maintainer
- Pranav Joglekar

## License
This project is licensed under the terms of the MIT open source license. Please refer to LICENSE.md for the full terms.

## Built With
- [Chrome Extensions](https://developer.chrome.com/docs/extensions/)

