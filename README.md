# art-gallery
Art Gallery - An experimental Node.js/React.js web application.

I'm using it to practice a few things I'm learnings.

## Technical Highlights
1. App was seeded using [express-generator](https://expressjs.com/en/starter/generator.html)
1. [Webpack](https://webpack.js.org) generated js bundle.
1. Manage external dependencies in webpack
1. Load CSS/LESS via js. CSS/LESS dependencies are also bundled in js bundle.
1. [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)
1. [expressjs-fileuplaod](https://github.com/richardgirges/express-fileupload)
1. [React.js](https://facebook.github.io/react/) components, JSX
1. [Dust.js](http://www.dustjs.com/) page-level templates
1. [Bootstrap](https://getbootstrap.com/)
1. [Masonry](https://masonry.desandro.com/) layout
1. [Material Icon](https://material.io/icons/)
1. [Basic Authentication](https://www.npmjs.com/package/express-basic-auth) for administrative interactions: upload, remove
1. [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) instead of $.ajax. GET, POST, PUT, DELETE.

## Install dependencies
    $ cd art-gallery && npm install

## Build
    $ npm run build

## Run the app
    $ DEBUG=art-gallery:* npm start
Open browser url: http://localhost:3000/

## Watch
    $ npm run watch
Run `npm run watch` from the command line to see that webpack compiles your code, but doesn't exit to the command line. This is because the script is still watching your files.

Or, run `npm run watch &` in the background.

## Watch with HMR 
HMR = Hot Module Replacement

Using *webpack-hot-middleware*, app does not need webpack running at watch mode. Simply run the app, changes automatically trigger browser reload.

## Minify images
[imagemin-cli](https://github.com/imagemin/imagemin-cli)

    $ cd src/images_orig
    $ imagemin * --out-dir=../images

TODO: automate upload and minify

## Debug Server-side
Follow step in [Paul Irish's blog](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27)

    $ npm run debug
    $ Open `about:inspect` in Chrome
    $ Click the Open dedicated DevTools for Node link.
    
## Debug Client-side
Sourcemap is enabled in webpack by `devtool: 'inline-source-map'`.
<img src="https://raw.githubusercontent.com/mayyan/art-gallery/master/src/images/debugging_client_side.png" width=430>

