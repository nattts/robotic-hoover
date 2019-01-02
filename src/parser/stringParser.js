const {removeNewLines, integerConverter } = require('../utils/parserHelpers');
const { directions } = require('../directionMapper/directions');


/**
 * @function {stringParser} converts input string into numbers
 * @param {array} data
 *
 */
const stringParser = data =>{
 try{
  // removes \n from input string
  let cleanLines = removeNewLines(data);

  //temporarly remove as will need to use it for parsing driving directions 
  let lastLine = cleanLines.pop();
  let driveArray = directions(lastLine);
  let converted = integerConverter(cleanLines);
  converted.push(driveArray);
  return converted;
 }
 catch(e){ console.log(e);

 }
 
};

module.exports = { stringParser };

