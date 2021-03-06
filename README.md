[![forthebadge](http://forthebadge.com/images/badges/fuck-it-ship-it.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/as-seen-on-tv.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/contains-cat-gifs.svg)](http://forthebadge.com)

[![forthebadge](http://forthebadge.com/images/badges/kinda-sfw.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/compatibility-betamax.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

toolbox for reddit
========================

Bundled extension of the /r/toolbox moderator tools for reddit.com

Containing:
- Comments Module: Highlight keywords and hide removed comments.
- Mod button: Adds a button to submissions and comments that allows you to Ban, unban, mod, unmod, approve, unapprove a user from that spot. If a user is banned it will also load the ban reason on the spot. Very handy when someone modmails you asking why they are banned!
- Mod Mail Pro: Filter your modmail, easily compose new modmail for your fellow mods, hide invite spam, much more!
- Moderation log matrix: See who does what in your team, analyze the modlog and output nice statistics.
- Removal Reasons: When removing a submission have a selection of predefined reasons you can select from. Supports removal comments and flairs!
- Toolbar Shortcuts: Put handy shortcuts to your often used pages in the toolbar.
- User Notes: Leave notes about users that other mods can see as well!
- Domain Tagger: A shared feature allowing mod teams to tag domains with colors. Makes it easier to spot spammy domains, approve approved domains, etc.
- Notifications of new (mod)mails, queue items, etc.
- Toolbar with queue counters
- Banlist live search: If you have a big ban list this is a awesome feature, it basically turn the banlist search bar in a live search bar that automatically updates with matchers.
- Trouble Shooter (beta): Highlights and sorts comments in subreddits you moderate to help guide you to potential sources of trouble i.e. controversial and negative score comments.

Documentation: https://www.reddit.com/r/toolbox/w/docs


# Building

Building is relatively easy through [nodejs](https://nodejs.org/) with gulp.

Install gulp globally.

```sh
$ npm install --global gulp
```

Then navigate to the root of the toolbox folder and install the dependencies

```sh
$ npm install
```

To build toolbox now simply run

```sh
$ gulp
```

Or if you have followed these steps before and are on windows click the build.bat file.

This will create a zip file which can be used in both Chrome as well as Firefox versions that support web extensions.

# Development

## Chrome

- Go to `chrome://extensions`.
- Check the "Developer mode" checkbox if it's not already checked.
- Click the "Load unpacked extension..." button.
- Load the `extension` directory.

Reload the extension when needed.

## Firefox (developer or nightly edition)

- Go to `about:debugging`.
- Click the "Load Temporary Add-on" button.
- Point to `extension/manifest.json`.

Reload the addon when needed.

### Third party support

All shared features settings and data are stored in subreddit wikis through versioned json. Third party applications can use this data to hook into toolbox features like usernotes.

Examples:

- https://github.com/creesch/reddit-moderator-toolbox/wiki/JSON:-usernotes
- https://github.com/creesch/reddit-moderator-toolbox/wiki/JSON:-toolbox-config
