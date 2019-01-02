const { 
 createMatrix, 
 stopInterval, 
 nextMove,
 isAnySpotLeft, 
 isOverlap,
 placeElement,
 spotGenerator,
 cleanSpot } = require('./utils/helpers');

const { stringParser } = require('./parser/stringParser');
const { objectMapper } = require('./mapper/mapper');
const { promisify } = require('util');
const { store } = require('./store');
const fs = require('fs');

const readFile = promisify(fs.readFile);

const fileReader = async file => {
 try{
  const content = await readFile(file, 'utf8');
  if (!content) { throw new Error('no content');}
  return content;
 }
 catch(e) { throw new Error('error with filereader');}
};

const getData = async(file,filereader) => {
 try{
  return await filereader(file);
 }
 catch(e){ throw new Error('error with getting data');}
};

const inputProcessor = async data => {
 try{
  if(!data){ throw new Error('data lost');}
  const parsed = stringParser(data);
  return objectMapper(parsed);
 }
 catch(e) { throw new Error('error with processor');} 
 
};

/**
* @function { show } 
* @function {isAnySpotsLeft} @param { Array } spotsCoords
*/

const show = async (coords) => {
 try{
  //clearing the console
  console.log('\x1Bc');

  const matrix = createMatrix(coords.room.x,coords.room.y);
  const spots = await spotGenerator(matrix,coords,placeElement);
  const board = await placeElement(matrix,'hoover',coords);

  if (await isOverlap(coords)) {
   const spotsLeft = await cleanSpot(coords);
   coords.spots = [...spotsLeft];
   store.setRemovedSpots();
  }
  
  const reverseBoard = board.reverse();
  console.log(reverseBoard);


  if (await isAnySpotLeft(coords.spots)) {
   const interval = store.getInterval();
   const removedSpots = store.getRemovedSpots();
   return await stopInterval(interval,coords,removedSpots);
  }
  
  return await nextMove(coords);

 } 
 catch(e){ console.log('error with render ', e);}
};

module.exports = { 
 placeElement, 
 fileReader, 
 getData, 
 inputProcessor,
 spotGenerator,
 show
};



