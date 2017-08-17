# myapp

## Technical Highlights
1. App was seeded using [express-generator](https://expressjs.com/en/starter/generator.html)
1. [Webpack](https://webpack.js.org) generated js bundle.
1. Manage external dependencies in webpack
1. Load CSS/LESS via js. CSS/LESS dependencies are also bundled in js bundle.
1. [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)
1. [expressjs-fileuplaod](https://github.com/richardgirges/express-fileupload)
1. React.js components, JSX
1. Dust.js page-level templates
1. [Bootstrap](https://getbootstrap.com/)
1. [Masonry](https://masonry.desandro.com/) layout

## Install dependencies
    $ cd myapp && npm install

## Build
    $ npm run build

## Run the app
    $ DEBUG=myapp:* npm start

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

## Debug
Follow step in [Paul Irish's blog](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27)

    $ npm run debug
    $ Open `about:inspect` in Chrome
    $ Click the Open dedicated DevTools for Node link.