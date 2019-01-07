const { 
 createMatrix,
 getSpotPositions,
 getConstantPositions,
 toEnumerate,
 toMap,
 stopInterval,
 nextMove,
 isAnySpotLeft,
 isOverlap,
 placeElement,
 spotGenerator,
 cleanSpot } = require('../utils/helpers');


describe('creates a grid', () => {
 test('creates a grid', () => {
  let row = 3;
  let col = 3;
  let expected = [ 
   [ [], [], [] ], 
   [ [], [], [] ], 
   [ [], [], [] ] 
  ];
  expect(createMatrix(row, col)).toEqual(expected);
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
  expect(getSpotPositions(actual)).toEqual(expected);
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
 
  expect(getConstantPositions(data)).toEqual(expected);
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

  expect(toMap(param1,param2)).toEqual(expected);

 });

});

describe('enumerates data' , ()=> {
 test('returns object with assigned x and y keys', () => {
  let actual = [ [23],[56] ];
  let expected = { x:actual[0], y:actual[1] };
  expect(toEnumerate(actual)).toEqual(expected);
 });

});








