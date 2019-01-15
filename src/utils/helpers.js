const { store } = require('../store');
const { fromJS } = require('immutable'); 

const utils = {

 createMatrix:(row,col) => [...Array(row)].map(row => Array(col).fill([])),

 getSpotPositions: data => data.slice(2, data.length-1),

 getConstantPositions: data => {
  let constants = [...data];
  return constants.filter((x) =>
   constants.indexOf(x) === 0 || 
   constants.indexOf(x) === 1 || 
   constants.indexOf(x) === constants.length-1);

 },

 //maps values to the keys
 toMap: (spotspos,constants) => ({
  room:constants[0],
  hoover:constants[1],
  spots:spotspos,
  drive:constants[constants.length-1]
 }),
 
 //enumerates data with x and y keys 
 toEnumerate: element => ( {x:element[0],y:element[1]} ),

 report: (coords,store) => {
  const info = `hoover position:  ${coords.hoover.x} ${coords.hoover.y}
  spots cleaned: ${store.getRemovedSpots()} `;
  return console.log(info);
 },

 stopInterval: intrvl => clearInterval(intrvl),

 stop:(store,callback) => callback(store.getInterval()),

 isAnyDirectionLeft: driveCoordsArray => driveCoordsArray.length === 0,

 isAnySpotLeft: spotCoordsArray => spotCoordsArray.length === 0,

 isOverlap: coords => coords.spots.some((x) => 
  JSON.stringify(coords.hoover) === JSON.stringify(x)
 ),

 isOutOfBound: coords => {
  const { x:roomX, y:roomY } = coords.room;
  const { x:hooverX, y: hooverY} = coords.hoover;
  if(hooverY > roomY-1 ||
     hooverX > roomX-1 || 
     hooverX < 0 ||
     hooverY < 0 ) { 
   return true;
  }
 },


 /**
* @function { nextMove } 
* @param { Object } coords
* @member {nextStep} coords.drive[0] accessing the first 
* function in the drive directions, calls it with the current 
* hoover coordinates, saves it to 'nextStep'.
* 
* @member {immutableCoords}, {nxt} adding immutablility.
* @member {drive} first index gets removed from drive directions array.
* @member {filtered} filtering that out 'undefined' ad it took place 
* after removing 1st index in drive. 
* coords.drive[0] accessing the first 
* function in the drive directions, calls it with the current 
* hoover coordinates, saves it to 'nextStep' variable.
* then first index of gets removed from drive directions array, 
* then hoover coordinates get updated
* 
* Then creating new object with updated hoover position and array 
* with directions
*/

 nextMove: coords => {
  try{
   const nextStep = coords.drive[0](coords.hoover);
   const immutableCoords = fromJS(coords);
   const nxt = fromJS(nextStep);
   const drive = immutableCoords.get('drive').shift();
   const filtered = drive.filter((x)=> x != undefined);
   return Object.assign(immutableCoords
    .set('hoover',nxt)
    .set('drive', filtered));
  }
  catch(e){ throw new Error('error in next move', e);}
 },


 placeHoover:(grid, hoover) => {
  grid[hoover.y][hoover.x] = 11;
  return grid;
 },

 placeSpot: (grid, spot) => {
  grid[spot.y][spot.x] = 33;
  return grid;
 },

 spotGenerator: (grid,coords,callback) => {
  try{
   const coordsArray = [...coords.spots];
   if(!coordsArray){ throw new Error('missing coordinates');}
   return coordsArray.map( coord => callback(grid,coord));
  }
  catch(e){ throw new Error('error in spot generator', e);}
 },


 findSpotIndex: (hooverPos,spotsArr) => 
  spotsArr.findIndex((element) => 
   JSON.stringify(element) ===  JSON.stringify(hooverPos)),

 /*
* @function cleanSpot 
* @argument {object} coords 
* @argument {coords.spots} Array of objects
* @argument {coords.hoover} Object
*
* removes spot by deleting an object of spot position 
* if it match hoover position
*/

 cleanSpot: (coords, callback) => {
  let index = callback(coords.hoover,coords.spots);
  coords.spots.splice(index,1);
  return coords.spots;
 }


};

module.exports = { utils };
