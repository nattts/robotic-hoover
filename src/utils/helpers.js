const { store } = require('../store');
const { fromJS } = require('immutable'); 

const utils = {

 createMatrix: async (row,col) => [...Array(row)].map(row => Array(col).fill([])),

 getSpotPositions: data => data.slice(2, data.length-1),

 getConstantPositions: data => {
  let constants = [...data];
  return constants.filter((x) =>
   constants.indexOf(x) === 0 || 
   constants.indexOf(x) === 1 || 
   constants.indexOf(x) === constants.length-1);

 },

 //maps values to the keys
 toMap : (spotspos,constants) => ({
  room:constants[0],
  hoover:constants[1],
  spots:spotspos,
  drive:constants[constants.length-1]
 }),
 
 //enumerates data with x and y keys 
 toEnumerate: element => ( {x:element[0],y:element[1]} ),

 stopInterval: async (intrvl,coords,removedSpots) => {
  await clearInterval(intrvl);
  console.log(`hoover position:  ${coords.hoover.x} ${coords.hoover.y}`);
  console.log(`spots cleaned: ${removedSpots}`);
  return coords;

 },

 isAnyDirectionLeft: async coords => {
  try{
   return coords.length === 0;
  }
  catch(e){ throw new Error('error in any direction left', e);}
 },

 stop: async(store, coords, callback) => 
  await callback(store.getInterval(),coords,store.getRemovedSpots()),


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

 nextMove: async coords => {
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


 isAnySpotLeft: async coords => {
  try{
   return coords.length === 0;
  }
  catch(e){ throw new Error('error in any spot left', e);}
 },

 isOverlap: async coords => {
  try{
   return coords.spots.some((x) => {
    return JSON.stringify(coords.hoover) === JSON.stringify(x);
   });
  }
  catch(e){ throw new Error('error in overlaping', e);}
 },


 placeElement: async (grid,element,coords) => {
  try{
   if(element === 'hoover'){
    const {x,y} = {x:coords.hoover.x, y:coords.hoover.y}; 
    grid[y][x] = 11;
    return grid;
   }
   if(element === 'spot'){
    const {x,y} = {x:coords.x, y:coords.y};
    grid[y][x] = 33;
    return grid;
   }
  }
  catch(e) {throw new Error('error placing element', e);}
 },

 spotGenerator: async (board,c,fn) => {
  try{
   const coords = [...c.spots];
   if(!coords){ throw new Error('missing coordinates');}
   return coords.map(async coord => await fn(board,'spot',coord));
  }
  catch(e){ throw new Error('error in spot generator', e);}
 },

 findSpotIndex: async (hooverPos,spotsArr) => {
  try{
   return spotsArr.findIndex((element) => {
    return JSON.stringify(element) ===  JSON.stringify(hooverPos);
   });
  }
  catch(e){ throw new Error('err', e);}
 },

 /*
* @function cleanSpot 
* @param {object} coords 
* @param {coords.spots} Array of objects
* @param {coords.hoover} Object
*
* removes spot by deleting an object of spot position 
* if it match hoover position
*/

 cleanSpot: async coords => {
  try{
   let index = await utils.findSpotIndex(coords.hoover,coords.spots);
   coords.spots.splice(index,1);
   return coords.spots;
  }
  catch(e){ throw new Error('error in cleaning', e);}
 },

 isOutOfBound: async coords => {
  const { x:roomX, y:roomY } = coords.room;
  const { x:hooverX, y: hooverY} = coords.hoover;
  if(hooverY > roomY-1 || hooverX > roomX-1 || hooverX < 0 || hooverY < 0 ){ 
   return true;
  }
 }

};

module.exports = { utils };
