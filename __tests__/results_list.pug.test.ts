

const pug = require('pug');

const chargers = [
  {
    address: {
      addressLine: "222 SW Harrison Street",
      title: "Harrison Tower",
      town: "Portland",
      state: "OR",
      postalCode: "97201"
    },
    pos: {
      lat: 45.5097989,
      lng: -122.6794873
    }
  },
  {
    address: {
      addressLine: "100 SW Market St",
      title: "Park Square",
      town: "Portland",
      state: "OR",
      postalCode: "97201"
    },
    pos: {
      lat: 45.510792,
      lng: -122.67764
    }
  },
  {
    address: {
      addressLine: "1510 SW Harbor Wy",
      title: "Kimpton Riverplace Hotel",
      town: "Portland",
      state: "OR",
      postalCode: "97201"
    },
    pos: {
      lat: 45.511486,
      lng: -122.674101
    }
  },
  {
    address: {
      addressLine: "200 SW Market St, Suite 1720",
      title: "200 SW Market Building",
      town: "Portland",
      state: "OR",
      postalCode: "97201"
    },
    pos: {
      lat: 45.511592,
      lng: -122.6786039 
    },
  },
  {
    address: {
      addressLine: "1945 SE Water Ave",
      title: "Oregon Museum of Science and Industry (OMSI)",
      town: "Portland",
      state: "OR",
      postalCode: "97214"
    },
    pos: {
      lat: 45.508501,
      lng: -122.665932
    }
  },
  {
    address: {
      addressLine: "1401 Southwest Naito Parkway",
      title: "Portland Marriott Downtown Waterfront",
      town: "Portland",
      state: "OR",
      postalCode: "97201"
    },
    pos: {
      lat: 45.5123866,
      lng: -122.6756475
    }
  },
  {
    address: {
      addressLine: "2145 SE Water Avenue",
      title: "2145 SE Water Avenue",
      town: "Portland",
      state: "OR",
      postalCode: "97214"
    },
    pos: {
      lat: 45.50932,
      lng: -122.66639
    }
  }
]

const renderPug = data => pug.renderFile('views/results_list.pug', data);

test('It should render pug correctly', () => {
  expect(renderPug(chargers)).toMatchSnapshot();
});