const { defaultMaxListeners } = require("node-fetch/node_modules/form-data")

const fetchDetails = require('../dist/public/defaultMaxListeners.js);
const fetch = require('node-fetch');

jest.mock('fetch');

it('renders')