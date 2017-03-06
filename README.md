
# Barebone Ionic
This project is a generic Ionic application with ingredients that can be part of every modern Ionic application.

## Dependecies, Run and Build

### Install NodeJS dependencies

Run `npm install` to install all needed dependencies.

### Install Plugins and Javascript dependencies
#### Linux/MacOX
Run `./install.sh` to install all needed plugins and dependencies

#### Windows Users
Similarly, Windows users should run `install.bat`.

### Run the app
Use `grunt serve -l` to run the app in browser and watch for changes in code

or

use `grunt serve` to just run the app for a browser preview

or

use `grunt serve --lab` to run the app in a browser on two platforms at the same time.

### Add a platform

```bash
$ grunt platform:add:<platform>
```

Supported Cordova platforms:

```bash
$ grunt platform:add:ios
$ grunt platform:add:android
```

### Build the app

```bash
$ grunt build
```

### Εmulate the app on simulator
iOS:

```bash
$ grunt emulate:ios
```

Android:

```bash
$ grunt emulate:android
```

For more information, see [Ionic Framework Generator's instructions](https://github.com/diegonetto/generator-ionic).

### Plugins installation

Use the following commands and install all the plugins required by the app:
```bash
$ cordova plugin add {plugin id or url}
```

eg:

```bash
cordova plugin add cordova-plugin-inappbrowser
```

#### Used Cordova plugins
In case that the required Cordova plugins are not installed while installing NodeJS dependencies, Cordova's command mentioned previously can be used to install the following plugins:

* **ionic-plugin-keyboard** - It provides functions to make interacting with the keyboard easier, and fires events to indicate that the keyboard will hide/show.
* **cordova-plugin-console** - This plugin is meant to ensure that console.log() is as useful as it can be. It adds additional function for iOS, Ubuntu, Windows Phone 8, and Windows.
* **cordova-plugin-device** - This plugin defines a global device object, which describes the device's hardware and software.
* **cordova-plugin-inappbrowser** - Provides a web browser view. It could be used to open images, access web pages, and open PDF files.
* **cordova-plugin-geolocation** - Grab the current location of the user, or grab continuous location changes
* **cordova-plugin-network-information** - This plugin provides an implementation of an old version of the Network Information API. It provides information about the device's cellular and wifi connection, and whether the device has an internet connection.
* **cordova-plugin-whitelist** - This plugin implements a whitelist policy for navigating the application webview on Cordova 4.0
* **cordova-plugin-camera** - This plugin defines a global navigator.camera object, which provides an API for taking pictures and for choosing images from the system's image library.
* **cordova-plugin-transport-security** - Cordova / PhoneGap Plugin to allow 'Arbitrary Loads' by adding a declaration to the Info.plist file to bypass the iOS 9 App Transport Security
* **cordova-admob-pro** - Powerful Ad Plugin for Google AdMob and DFP. Easy use, show mobile Ad with single line of JavaScript. Stable and up to date with latest SDK. Compatible with Cordova CLI, PhoneGap Build, Intel XDK/Crosswalk, Google ChromeApp, IBM Worklight. (https://github.com/floatinghotpot/cordova-admob-pro)
* **de.appplant.cordova.plugin.email-composer** - The plugin provides access to the standard interface that manages the editing and sending an email message (https://github.com/katzer/cordova-plugin-email-composer.git).
* **phonegap-plugin-push** - This plugin offers support to receive and handle native push notifications with a single unified API, and with no dependency on any other plugins. (https://github.com/phonegap/phonegap-plugin-push.git).
* **nl.x-services.plugins.socialsharing** - Share images, text, messages via Facebook, Twitter, Email, SMS, WhatsApp, etc using this plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git).
* **com.keosu.cordova.stream** - The plugin allows to play audio stream (https://github.com/skounis/cordova-audio-stream-plugin)
* **cordova-plugin-apprate** - The AppRate plugin makes it easy to prompt the user to rate your app, either now or later, or never (https://github.com/pushandplay/cordova-plugin-apprate.git).
* **cordova-sqlite-storage** - Native interface to sqlite in a Cordova/PhoneGap plugin for Android, iOS, Windows "Universal" (8.1), Amazon Fire-OS, and WP(7/8) with API similar to HTML5/Web SQL API (https://github.com/litehelpers/Cordova-sqlite-storage.git).
* **com.telerik.stripe** - Stripe is a payment infrastructure for the internet. Stripe Cordova SDK is built around the well organized REST API (https://github.com/Telerik-Verified-Plugins/Stripe).

## AdMob integration

**To use AdMob you need:**
1. Create an account on https://apps.admob.com
2. Create an app
3. Put iOS and Android keys to Gruntfile from the AdMob account

## Demo
Install [Ionic View](http://view.ionic.io/) and preview the app on your mobile device using the following Ionic View ID: `241b6d37`

## Documentation
* [Barebone Ionic Quick Start Guide](https://docs.google.com/document/d/1spYFuMub625PYBZYXWIzKM-XszkIoueacdzPWS2IYqA/edit?usp=sharing)

## Changelog
```
2.23 - Dec 13, 2016
- Youtube player stops when the app is paused

2.22 - Oct 20, 2016
- Slide menu remains open on tablets and wide screens
- Support for Youtube channel URLs based on both username and channel IDs

2.21 - Oct 13, 2016
- Fixed misplaced radio play button on real devices

2.20 - Sep 09, 2016
- Migration to the Cloud Client Push

2.19 - Sep 02, 2016
- Upgrade Firebase to 3.x

2.18 - May 04, 2016
- Ionic update to v1.3.0
- Fix on showing a pin and setting the destination on Android's maps app
- Fix of the ionic keyboard plugin id


2.17 - March 03, 2016
- Addition of six new themes
- oAuth fix
- Spacing between the cards in the home screen fix

2.16 - February 09, 2016
- Ionic update to v1.2.4 as Ionic 1.2 uses native scrolling by default.
- Ionic CLI update to v1.7.13
- Email composer fix for Android 6

2.15 - January 12, 2016
- Example of Stripe payment processor usage. Includes checkout and charge of credit card

2.14 - January 04, 2016
- Four theme options

2.13 - December 22, 2015
- Improved installation process
- Downgrade of Apache Cordova iOS to v3.9.2 because of plugin conflicts
- Copy of package file to be used as a replacement when needed
- Usage of a forked version of the audio stream plugin

2.12 - December 15, 2015
- Fix on ConnectionType always returning Connection.UNKNOWN (Android)
- Ionic update to v1.1.1
- Cordova CLI update to v5.4.1
- Ionic CLI update to v1.7.12
- ngCordova update to v0.1.23-alpha
- Support of android versions back to 4.0
- Replacement of AdMob plugin with AdMob Pro
- Cordova iOS engine update to 4.0.0
- Plugins update
- Improved installation process for Win/Linux/MacOS
- README.md update with improved instructions on how to install, run, build the app.

2.11 - November 3, 2015
- Restaurant module. Full working restaurant ordering system. Includes list of menu items, shopping cart, checkout, delivery methods and confirmation email.
- README.md update with improved instructions on how to install, run, build the app.

2.10 - October 18, 2015
- Local-storage module. Full working Local-storage CRUD example
- Tinder Cards module. Tinder cards full working demonstration.
- Swipeable Cards module. Swipeable cards full working demonstration.
- Ionic CLI update to v1.7.6
- Minor issues fix related to bouncing view.

2.9 - October 9, 2015
- oAuth samples utilizing Twitter, Facebook and Google as service providers
- PopOver context (right) menu

2.8 - October 6, 2015
- Utilization of the Transport Security Plugin to allow HTTP requests for iOS9
- SQLite module. A full working SQLite example

2.7 - September 30, 2015
- Ionic update to v1.1.0
- Cordova CLI update to v5.3.3
- Ionic CLI update to v1.6.4

2.6 - September 10, 2015
- User's Feedback module. This module provides the user the option to compose and send a report which consist of, a text message, an image, a video and the geographic location of the device.

2.5 - September 8, 2015
- AdMob integration

2.4 - August 7, 2015
- Rate module. Integration of Cordova Apprate Plugin and demonstration of a real case scenario
- Update ngCordova to v0.1.18-alpha.
- Explicit reference to ng-cordova-auth. It is required bye the v0.1.18-alpha of ngCordova
- Integration with Ionic Platform and deployment through Ionic View

2.3 - July 31, 2015
- Event modules. A screen which displays Calendar entries in a Event/Calendar view has been added.
- Network connection check: The application check for network connections before each http request and displays a message if the connection can not be established.
- Cordova Whitelist plugin added which improves the behaviour of network connections for Android
- Cordova update to 5.1.1
- Ionic CLI update to v1.6.3

2.2 - July 18, 2015
- Fix: Map Display on iOS simulator and devices
- Ionic CLI update to v1.6.1
- Ionic update to v1.0.1

2.1 - July 11, 2015
- Live Radio / Audio Stream playback

2.0 - June 27, 2015
- SASS support
- Cordova update to v5.0.0
- Ionic update to v1.5.5.
- Fix the "grunt serve" issue duo to version 1.0.1 of the "grunt-concurrent" module

1.8 - June 27, 2015
- Shopping Cart with products browsing, add to cart and checkout

1.7 - June 20, 2015
- Live Chat backed by Firebase
- Firebase Authentication
- Icons in the Slide Menu

1.6 - June 13, 2015
- Facebook API authentication by using a permanent token (no user login is required)
- Facebook Page Albums integration.  The application creates Photo Albums by using the albums and their images of the specified Facebook page.
- Sharing article to Facebook, Twitter, Email and any other defined in the device service.

1.5 - June 10, 2015
- Facebook User Albums integration. The application loads the Albums the authorised user has uploaded in his Facebook account and displays them as Galleries.
- Google Charts integration

1.4 - June 9, 2015
- Position Screen which demonstrates the location service. It is watching and gets and displays the current position of the device.

1.3 - June 8, 2015
- Sample screens demonstrating all the Form Elements and Layouts
- Sample screens demonstrating Tabs and all their available styles.

1.2 - June 3, 2015
- Facebook Graph API integration with examples
- - Login
- - Get user's full name and email address
- Instagram API integration with examples
- - Login
- - Get user's recent posts

1.1 - May 31, 2015
- Vimeo API integration with examples.
- Infinite scroll example.
- Automate dependencies installation via grunt.

1.0 - May 17, 2015
- Initial release
```

## Credits

* [Yeoman](http://yeoman.io/)
* [Yeoman's Ionic Framework generator](https://github.com/diegonetto/generator-ionic)
* Flickr images
 * http://bit.ly/1QGEh93
 * http://bit.ly/1QGElWg
 * http://bit.ly/1QGEklg
 * http://bit.ly/1QGEl8F
 * http://bit.ly/1QGEr06
 * http://bit.ly/1QGEpp9
 * http://bit.ly/1QGEskS

## Third Party Licences
* [Apache License](http://www.apache.org/licenses/)
* [MIT License](https://opensource.org/licenses/MIT)
