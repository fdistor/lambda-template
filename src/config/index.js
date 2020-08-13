const configs = require('./config.json');
let config;

if (process.env.NODE_ENV === 'development') config = { ...configs.development };
else if (process.env.NODE_ENV === 'production') config = { ...configs.production };
else {
  console.log(`Unknown NODE_ENV: ${process.env.NODE_ENV}. Defaulting to development.`);
  config = { ...configs.development };
}

module.exports = config;
