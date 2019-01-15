const { utils } = require('../utils/helpers');


describe('createMatrix', () => {
 test('creates a grid', () => {
  let row = 3;
  let col = 3;
  let expected = [ 
   [ [], [], [] ], 
   [ [], [], [] ], 
   [ [], [], [] ] 
  ];
  expect(utils.createMatrix(row, col)).toEqual(expected);
 });
 
});

describe('returns array of any number of objects between the 2nd \
 and the last object from the given array', () => {
 
 test('expected is an array', ()=>{
  let actual =  [
   { x: 5, y: 5 },
   { x: 1, y: 2 },
   { x: 1, y: 0 },
   { x: 2, y: 2 },
   { x: 2, y: 3 },
   [ [] ] ];
  
  let expected = [ { x: 1, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 3 } ];
  expect(utils.getSpotPositions(actual)).toEqual(expected);
 }); 

});

describe('returns an array of objects of\
 the lines 1,2 and the last',() => {

 test('filters given array to return only positions\
  with indexes 0,1 and array.length-1', () => {
  let data =  [
   { x: 5, y: 5 },
   { x: 1, y: 2 },
   { x: 1, y: 0 },
   { x: 2, y: 2 },
   { x: 2, y: 3 },
   [ [] ] ];
 
  let expected = [{ x: 5, y: 5 },{ x: 1, y: 2 },[ [] ] ];
 
  expect(utils.getConstantPositions(data)).toEqual(expected);
 });

});

describe('assigns keys to the values',() => {

 test('returns object with assigned keys' ,() => {
  let param1 = [{},{},{}];
  let param2 = [ {},{},[] ];
  let expected = ({
   room: param2[0],
   hoover: param2[1], 
   spots: param1,
   drive: param2[param2.length-1]
  });

  expect(utils.toMap(param1,param2)).toEqual(expected);

 });

});

describe('enumerates data' , ()=> {
 test('returns object with assigned x and y keys', () => {
  let actual = [ [23],[56] ];
  let expected = { x:actual[0], y:actual[1] };
  expect(utils.toEnumerate(actual)).toEqual(expected);
 });

});


describe('checks if any directions left in array' , ()=> {
 test('returns false if the array length > 0', () => {
  let actual = utils.isAnyDirectionLeft(['N','S']);
  expect(actual).toBeFalsy();
 });

 test('returns true if the array length < 0', () => {
  let actual = utils.isAnyDirectionLeft([]);
  expect(actual).toBeTruthy();
 });

});

describe('checks if any spots left in array' , ()=> {
 test('returns false if the array length > 0', () => {
  let actual = utils.isAnySpotLeft([{x:1, y:2}]);
  expect(actual).toBeFalsy();
 });

 test('returns true if the array length < 0', () => {
  let actual = utils.isAnySpotLeft([]);
  expect(actual).toBeTruthy();
 });

});

describe('checks if hoover overlap the spot' , ()=> {
 test('return true if hoover and spot objects are equal', () => {
  let actual = {};
  actual.spots = [ {x:1, y:2}, {x:4, y:3}  ];
  actual.hoover = { x:1, y:2};
  expect(utils.isOverlap(actual)).toBeTruthy();
 });

});

describe('placeHoover' , ()=> {
 test('insert an element on the grid.returns a nested array with an element \
  placed on the grid', () => {
  let grid = [ 
   [ [], [], [] ], 
   [ [], [], [] ], 
   [ [], [], [] ] 
  ];
  
  let coords = { x:1, y:2};
  grid[coords.y][coords.x] = 11;
  
  let expected = [ 
   [ [], [], [] ], 
   [ [], [], [] ], 
   [ [], 11, [] ] 
  ];

  expect(utils.placeHoover(grid,coords)).toEqual(expected);
 });

});

describe('spotGenerator' , ()=> {
 test('checks if a callback was called', () => {

  let mock = jest.fn();
 
  let grid = [ 
   [ [], [], [] ], 
   [ [], [], [] ], 
   [ [], [], [] ] 
  ];
  let coords = [ {x:1, y:2} ];
  
  expect(()=>{
   utils.spotGenerator(grid,coords,mock);
   expect(mock).toBeCalled();
  });
 
 });

});


describe('stop' , ()=> {
 test('checks if callbacks are called', () => {
  let mockArg = jest.fn();
  let mockCallback = jest.fn();
  
  expect(()=>{
   utils.stop(mockArg,mockCallback);
   expect(mockCallback).toBeCalled();
  });

  expect(()=>{
   utils.stop(mockArg,mockCallback);
   expect(mockArg).toBeCalled();
  });

 });

});


describe('cleanSpot' ,() => {
 test('checks if a callback is called', () => {
  let mockCoordsArg = jest.fn();
  let mockCallback = jest.fn();

  expect(()=>{
   utils.cleanSpot(mockCoordsArg,mockCallback);
   expect(mockCallback).toBeCalled();
  });

 });

});


