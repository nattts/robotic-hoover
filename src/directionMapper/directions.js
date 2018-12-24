const { dirN, dirE, dirS, dirW } = require('../utils/directionHelpers');

const directions = str =>{
 let arr = [];
 let split = [...str];
 split.forEach((s)=> {
  switch(s){
  case 'N':
   arr.push(dirN);
   break;
  case 'W':
   arr.push(dirW);
   break;
  case 'E':
   arr.push(dirE);
   break;
  case 'S':
   arr.push(dirS);
   break;
  }
  
 });
 return arr;
};

module.exports = { directions };