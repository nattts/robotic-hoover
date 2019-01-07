const { 
 createMatrix, 
 stopInterval, 
 nextMove,
 isAnySpotLeft, 
 isOverlap,
 placeElement,
 spotGenerator,
 cleanSpot,
 isAnyDirectionLeft,
 stop,
 isOutOfBound } = require('./utils/helpers');

const { stringParser } = require('./parser/stringParser');
const { objectMapper } = require('./mapper/mapper');
const { promisify } = require('util');
const { fromJS, toJS } = require('immutable');
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
<<<<<<< HEAD
* @const {board.reverse()} to make starting point of x:0, y:0 be in the bottom left corner.
*
* @member {nextStep} is immutable in orderto be able to use mutable
* coordinates in case of hoover gets out of bounds.
* @member {mutable} converting back to mutable to be able to update in the future.
*
=======
* @const {reverseboard} to make starting point of x:0, y:0 be in the bottom left corner
>>>>>>> 377df2bdfdafa43214e397d4c7f47bffaa54fd93
*/

const show = async coords => {
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

  console.log(board.reverse());

  if (await isAnySpotLeft(coords.spots)) {
   return await stop(store, coords, stopInterval); 
  }
  
  if(await isAnyDirectionLeft(coords.drive)) {
   return await stop(store, coords, stopInterval); 
  }
 
  const nextStep = await nextMove(coords);
  const mutable = nextStep.toJS();

  if(await isOutOfBound(mutable)){
   coords.drive = [...mutable.drive];
   return coords;
  }
  
  return mutable;

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



