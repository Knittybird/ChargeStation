import {chargers} from "./data/result_data.js"

const pug = require('pug');

const renderPug = data => pug.renderFile('views/results_list.pug', data);

test('It should render pug correctly', () => {
  expect(renderPug({chargers})).toMatchSnapshot();
});