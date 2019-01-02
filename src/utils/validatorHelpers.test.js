const { 
 spacesChecker,
 separatedBy1Space,
 hasOnlyLetters,
 removeLast,
 hasSpecificLetters,
 regexChecker
} = require('./validatorHelpers');

describe('checks if input has any leading, trailing or between lines spacing',() => {
 test('fails', () => {
  let actual = ['','2 3', '', '5 5', ''];
  let expected = 'no spaces around the input \
   or in between pair of numbers';
  expect(() => {
   spacesChecker(actual).toThrowError(expected);
  });
 });

 test('passes', () => {
  let actual = ['2 3', '4 10', '5 5'];
  expect(spacesChecker(actual)).toBeTruthy();
 });

});


describe('returns array exluding last element', () => {
 test('returns array exluding last element',() => {
  let actual = ['2 3', '4 10', '5 5', 'nnnwwweees'];
  let expected = ['2 3', '4 10', '5 5'];
  expect(removeLast(actual)).toEqual(expected);
 });

});


describe('checks data against a pattern. returns true or false', () => {
 test('returns true if regexp pattern match the value',() => {
  let value = '4 7';
  let reg = /^[0-9]+\s[0-9]+$/;
  expect(regexChecker(value, reg)).toBeTruthy();

 });

 test('returns false if regexp pattern does not match the value',() => {
  let value = 'ab';
  let reg = /^[0-9]+\s[0-9]+$/;
  expect(regexChecker(value, reg)).not.toBeTruthy();
 });

});

describe('checks if only 1 spase between numbers',() => {

 test('passes',() => {
  let actual = ['2 4', '4 10', '5 5', 'nnnwwweees'];
  expect(separatedBy1Space(actual)).toBeTruthy();

 });

 test('fails',() => {
  let actual = ['a y', '4 10', '5 5', 'nnnwwweees'];
  let expected = 'values should numbers\
 and separated with a single space.';
  expect(() => {
   expect(separatedBy1Space(actual)).toThrowError(expected);
  });
 });

});

describe('checks if last line of the input consists of any number of \
 the following letters: NSWE', () => {

 test('passes',() => {
  let actual = ['2 3', '4 10', '5 5', 'NWWWSSE'];
  expect(hasSpecificLetters(actual)).toBeTruthy();
 });

 test('fails',() => {
  let actual = ['a  b', '4 10', '5 5', 'ABCDEFJKLDJ'];
  let expected = 'last line should only have these letters: NWSE';
  expect(() => {
   expect(hasSpecificLetters(actual)).toThrowError(expected);
  });
 });

});


describe('checks if last line contains upper case letters only',() => {

 test('should fail if last line is lowercase ', () =>{
  let actual = ['2 3', '4 10', '5 5', 'abdc'];
  let expected = 'last line should only have uppercase letters';
  expect(() => {
   expect(hasOnlyLetters(actual)).toThrowError(expected);

  });
 });


 test('should fail if last line is not a string ', () =>{
  let actual = ['2 3', '4 10', '5 5', '22'];
  let expected = 'last line should only have uppercase letters';
  expect(() => {
   expect(hasOnlyLetters(actual)).toThrowError(expected);
  });
 });

 test('should fail if last line is not a upper case string ', () =>{
  let actual = ['2 3', '4 10', '5 5', 'ABcd'];
  let expected = 'last line should only have uppercase letters';
  expect(() => {
   expect(hasOnlyLetters(actual)).toThrowError(expected);
  });
 });

 test('should pass as the last line is not a upper case string ', () =>{
  let actual = ['2 3', '4 10', '5 5', 'ABCDFFFFFFFF'];
  expect(hasOnlyLetters(actual)).toBeTruthy();
 });

});




