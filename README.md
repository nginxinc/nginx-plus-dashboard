## NGINX Plus Dashboard

Live activity monitoring tool for NGINX Plus.

### Build process:

Ensure you have all dependencies installed:
```
yarn install
```

To build the dashboard run:
```
yarn build
```
The result will be placed in `dist/dashboard.html`.

### Testing:

To not have tests mixed with sources all test files should be placed in related `__test__` folders in the project.

```
yarn test
```
Running the above command will start karma server and build the coverage report.

#### Tests report:

`http://0.0.0.0:9876/` – start page of karma server where your tests will run

`http://0.0.0.0:9876/debug.html` – all tests and their statuses

#### Coverage report:

In the project folder check `coverage` directory – `index.html` includes everything you need.

### Useful links:
* [Quick description](https://www.nginx.com/products/nginx/live-activity-monitoring/)
* [Guide](https://docs.nginx.com/nginx/admin-guide/monitoring/live-activity-monitoring/#using-the-dashboard)
* [Live demo](https://demo.nginx.com/)

### 3rd party modules:
* [autoprefixer](https://www.npmjs.com/package/autoprefixer) – 7.2.6
* [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core) – 6.26.3
* [babel-loader](https://github.com/babel/babel-loader) – 7.1.5
* [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) – 4.1.6
* [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules) – 3.4.2
* [babel-plugin-transform-object-rest-spread](https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread) – 6.26.0
* [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) – 6.23.0
* [babel-polyfill](https://www.npmjs.com/package/babel-polyfill) – 6.26.0
* [babel-preset-env](https://www.npmjs.com/package/babel-preset-env) – 1.7.0
* [babel-preset-react](https://www.npmjs.com/package/babel-preset-react) – 6.24.1
* [chai](https://www.npmjs.com/package/chai) – 4.2.0
* [css-loader](https://www.npmjs.com/package/css-loader) – 3.5.3
* [cssnano](https://www.npmjs.com/package/cssnano) – 4.1.10
* [enzyme](https://www.npmjs.com/package/enzyme) – 3.11.0
* [enzyme-adapter-preact-pure](https://www.npmjs.com/package/enzyme-adapter-preact-pure) – 2.2.0
* [eslint](https://www.npmjs.com/package/eslint) – 4.19.1
* [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) – 15.1.0
* [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) – 2.20.2
* [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) – 5.1.1
* [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) – 7.20.0
* [history](https://www.npmjs.com/package/history) – 4.10.1
* [html-webpack-inline-source-plugin](https://www.npmjs.com/package/html-webpack-inline-source-plugin) – 0.0.10
* [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) – 3.2.0
* [karma](https://github.com/karma-runner/karma) – 5.0.9
* [karma-chrome-launcher](https://www.npmjs.com/package/karma-chrome-launcher) – 3.1.0
* [karma-coverage](https://www.npmjs.com/package/karma-coverage) – 2.0.2
* [karma-coverage-istanbul-reporter](https://www.npmjs.com/package/karma-coverage-istanbul-reporter) – 3.0.3
* [karma-mocha](https://www.npmjs.com/package/karma-mocha) – 2.0.1
* [karma-sinon-chai](https://www.npmjs.com/package/karma-sinon-chai) – 2.0.2
* [karma-sourcemap-loader](https://www.npmjs.com/package/karma-sourcemap-loader) – 0.3.7
* [karma-webpack](https://www.npmjs.com/package/karma-webpack) – 3.0.0
* [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin) – 0.9.0
* [mocha](https://www.npmjs.com/package/mocha) – 8.0.1
* [npm-font-open-sans](https://github.com/dasrick/npm-font-open-sans) – 1.1.0
* [nyc](https://www.npmjs.com/package/nyc) – 15.1.0
* [postcss-import](https://www.npmjs.com/package/postcss-import) – 11.1.0
* [postcss-inline-svg](https://github.com/TrySound/postcss-inline-svg/) – 3.1.1
* [postcss-loader](https://www.npmjs.com/package/postcss-loader) – 2.1.6
* [postcss-svgo](https://www.npmjs.com/package/postcss-svgo) – 4.0.2
* [postcss-url](https://github.com/postcss/postcss-url/) – 7.3.2
* [preact](https://www.npmjs.com/package/preact) – 8.5.3
* [preact-portal](https://www.npmjs.com/package/preact-portal) – 1.1.3
* [preact-compat](https://www.npmjs.com/package/preact-compat) – 3.19.0
* [preact-compat-enzyme](https://www.npmjs.com/package/preact-compat-enzyme) – 0.2.5
* [preact-render-to-string](https://www.npmjs.com/package/preact-render-to-string) – 3.8.2
* [preact-test-utils](https://www.npmjs.com/package/preact-test-utils) – 0.1.4
* [sinon](https://www.npmjs.com/package/sinon) – 9.0.2
* [sinon-chai](https://www.npmjs.com/package/sinon-chai) – 3.5.0
* [style-loader](https://www.npmjs.com/package/style-loader) – 0.18.2
* [webpack](https://www.npmjs.com/package/webpack) – 4.43.0
* [webpack-cli](https://www.npmjs.com/package/webpack-cli) – 3.3.11
* [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) – 3.11.0
* [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch) – 2.0.4
