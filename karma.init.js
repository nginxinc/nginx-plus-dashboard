import './enzyme.js';
import appsettings from './src/appsettings';

localStorage.clear();
appsettings.init();

const context = require.context('./src', true, /\.test\.jsx?$/);

context.keys().forEach(context);
