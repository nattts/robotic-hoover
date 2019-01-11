const { checkers } = require('../utils/validatorHelpers');
const { removeNewLines } = require('../utils/parserHelpers');


const validator = async data => {
 try{
  let cleanLines = removeNewLines(data);
  checkers.spacesChecker(cleanLines);
  checkers.separatedBy1Space(cleanLines);
  checkers.hasOnlyLetters(cleanLines);
  checkers.hasSpecificLetters(cleanLines);
  return data;
 } 
 catch(e){ throw new Error(e);}

};

module.exports = { validator };