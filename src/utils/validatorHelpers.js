const { 
 digitRegex,
 upperLetterRegex, 
 specificLetterRegex } = require('./patterns');

const removeLast = data => {
 const dataCopy = [...data];
 const removed = dataCopy.pop();
 return dataCopy;
};

const regexChecker = (value,regex) => {
 return regex.test(value);
};

const spacesChecker = data => {
 if(data.includes('')) {
  throw new Error('no leading, trailing or between lines spacing alowed');
 }
 return true;
};

const separatedBy1Space = data => {
 removeLast(data).map((x)=>{
  if(!regexChecker(x,digitRegex)){
   throw new Error('values should numbers\
 and separated with a single space.');
  }
 });
 return true;
};

const hasOnlyLetters = data => {
 const dataCopy = [...data];
 const lastElement = dataCopy.pop();
 if(!regexChecker(lastElement,upperLetterRegex)){
  throw new Error('last line should only have uppercase letters');
 }
 return true;
};

const hasSpecificLetters = data => {
 const dataCopy = [...data];
 const lastElement = dataCopy.pop();
 if(!regexChecker(lastElement,specificLetterRegex)){
  throw new Error('last line should only have these letters: NWSE');
 }
 return true;
};

module.exports = { 
 spacesChecker, 
 separatedBy1Space, 
 hasOnlyLetters, 
 removeLast,
 hasSpecificLetters,
 regexChecker
};
