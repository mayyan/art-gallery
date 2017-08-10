# myapp

## Technical Highlights
1. App was seeded using [express-generator](https://expressjs.com/en/starter/generator.html)
2. Webpack generated js bundle.
3. [Masonry](https://masonry.desandro.com/) layout
4. normalize.css
5. Load css/less via js. Css/less dependencies are also bundled in js bundle.
6. [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) 


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

## Watch with HMR (Hot Module Replacement)

Using *webpack-hot-middleware*, app does not need webpack running at watch mode. Simply run the app, changes automatically trigger browser reload.


