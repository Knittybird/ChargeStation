let options : any = require('../public/api_link');
//options tests
test('Option Test 1', () => {
    expect(options.res(["This", "is", "a", "test"])).toBe("This&is&a&test");
  })

test('Option Test 2', () => {
    expect(options.res([])).toBe("");
  })

test('Option Test 3', () => {
    expect(options.res(null)).toBe("");
  })

test('Option Test 4', () => {
    expect(options.res([1,2,3])).toBe("1&2&3");
  })

test('Option Test 5', () => {
    expect(options.res(["This is one element"])).toBe("This is one element");
  })

//addr tests
