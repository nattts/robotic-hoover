const { digitRegex,upperLetterRegex, specificLetterRegex } = require('./patterns');

function Checkers(){

 this.removeLast = data => {
  const dataCopy = [...data];
  const removed = dataCopy.pop();
  return dataCopy;
 };

 this.regexChecker = (value,regex) => {
  return regex.test(value);
 };

 this.spacesChecker = data => {
  if(data.includes('')) {
   throw new Error('no leading, trailing or between lines spacing alowed');
  }
  return true;
 };

 this.separatedBy1Space = data => {
  this.removeLast(data).map((x) => {
   if(!this.regexChecker(x,digitRegex)){
    throw new Error('values should numbers\
  and separated with a single space.');
   }
  });
  return true;

 };

 this.hasOnlyLetters = data => {
  const dataCopy = [...data];
  const lastElement = dataCopy.pop();
  if(!this.regexChecker(lastElement,upperLetterRegex)){
   throw new Error('last line should only have uppercase letters');
  }
  return true;
 };

 this.hasSpecificLetters = data => {
  const dataCopy = [...data];
  const lastElement = dataCopy.pop();
  if(!this.regexChecker(lastElement,specificLetterRegex)){
   throw new Error('last line should only have these letters: NWSE');
  }
  return true;
 };
 
}

const checkers = new Checkers();

module.exports = { checkers };


