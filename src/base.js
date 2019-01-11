const { utils } = require('./utils/helpers');
const { stringParser } = require('./parser/stringParser');
const { objectMapper } = require('./mapper/mapper');
const { promisify } = require('util');
const { fromJS, toJS } = require('immutable');
const { store } = require('./store');
const fs = require('fs');


const base = {

 fileReader: async file => {
  try{
   const readFile = promisify(fs.readFile);
   const content = await readFile(file, 'utf8');
   if (!content) { throw new Error('no content');}
   return content;
  }
  catch(e) { throw new Error('error with filereader');}
 },

 getData: async(file,filereader) => {
  try{
   if (!file) { throw new Error('no file');}
   return await filereader(file);
  }
  catch(e){ throw new Error('error with getting data');}
 },

 inputProcessor: async data => {
  try{
   if(!data){ throw new Error('data lost');}
   const parsed = stringParser(data);
   return objectMapper(parsed);
  }
  catch(e) { throw new Error('error with processor');} 

 },

 /**
* @function { show } 
* @const {board.reverse()} to make starting point of x:0, y:0 be in the bottom left corner.
*
* @member {nextStep} is immutable in orderto be able to use mutable
* coordinates in case of hoover gets out of bounds.
* @member {mutable} converting back to mutable to be able to update in the future.
*
* @const {reverseboard} to make starting point of x:0, y:0 be in the bottom left corner
*/

 show: async coords => {
  try{
   //clearing the console
   console.log('\x1Bc');
   const matrix = await utils.createMatrix(coords.room.x,coords.room.y);
   const spots = await utils.spotGenerator(matrix,coords,utils.placeElement);
   const board = await utils.placeElement(matrix,'hoover',coords);

   if (await utils.isOverlap(coords)) {
    const spotsLeft = await utils.cleanSpot(coords);
    coords.spots = [...spotsLeft];
    store.setRemovedSpots();
   }

   console.log(board.reverse());

   if (await utils.isAnySpotLeft(coords.spots)) {
    return await utils.stop(store, coords, utils.stopInterval); 
   }
    
   if(await utils.isAnyDirectionLeft(coords.drive)) {
    return await utils.stop(store, coords, utils.stopInterval); 
   }
   
   const nextStep = await utils.nextMove(coords);
   const mutable = nextStep.toJS();

   if(await utils.isOutOfBound(mutable)){
    coords.drive = [...mutable.drive];
    return coords;
   }
    
   return mutable;

  } 
  catch(e){ console.log('error with render ', e);}
 }

};

module.exports = { base };

