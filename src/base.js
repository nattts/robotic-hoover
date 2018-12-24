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
  let content = await readFile(file, 'utf8');
  if (!content) { throw new Error('no content');}
  return content;
 }
 catch(e) { throw new Error('error with filereader', e);}
};

const getData = async(file,filereader,processor) => {
 try{
  let data = await filereader(file);
  let processed = await processor(data);
  return processed;
 }
 catch(e){ throw new Error('error with getting data',e);}
};

const inputProcessor = async data => {
 try{
  if(!data){ throw new Error('data lost');}
  let parsed = stringParser(data);
  let mapped = objectMapper(parsed);
  return mapped;
 }
 catch(e) { throw new Error('error with processor', e);} 
};


/**
* @function { show } 
*
* @param { Object } coords
* @param { Number } hooverX, hooverY
* @function {isAnySpotsLeft} @param { Array } spotsCoords
*/

const show = async (coords, hooverX, hooverY) => {
 try{
  console.log('\x1Bc');

  let spotsCoords = coords.spots;
  let { x:roomX, y:roomY } = coords.room;

  let matrix = createMatrix(roomX,roomY);

  let spots = await spotGenerator(matrix,spotsCoords,placeElement);

  let board = await placeElement(matrix,'hoover',hooverX,hooverY);
 
  if (await isOverlap({x:hooverX, y:hooverY},spotsCoords)) {
   let removed = await cleanSpot({x:hooverX, y:hooverY},spotsCoords);
   store.setRemovedSpots();
  }
  let reverseBoard = board.reverse();
  console.log(reverseBoard);

  if (await isAnySpotLeft(spotsCoords)) {
   let interval = store.getInterval();
   await stopInterval(interval);
   console.log(`hoover position:  ${hooverX} ${hooverY}`);
   console.log(`spots cleaned: ${store.getRemovedSpots()}`);
   return ({ x:hooverX, y:hooverY });
  }
  
  return await nextMove(coords,{ x:hooverX, y:hooverY });
 
 } catch(e){ console.log('error with render ', e);}
};

module.exports = { 
 placeElement, 
 fileReader, 
 getData, 
 inputProcessor,
 spotGenerator,
 show
};



