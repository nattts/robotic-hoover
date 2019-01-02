const { 
 spacesChecker, 
 separatedBy1Space, 
 hasOnlyLetters, 
 hasSpecificLetters } = require('../utils/validatorHelpers');

const { removeNewLines } = require('../utils/parserHelpers');

const validator = async data => {
 try{
  let cleanLines = removeNewLines(data);
  spacesChecker(cleanLines);
  separatedBy1Space(cleanLines);
  hasOnlyLetters(cleanLines);
  hasSpecificLetters(cleanLines);
  return data;
 } 
 catch(e){ throw new Error(e);}

};

module.exports = { validator };