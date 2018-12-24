const createMatrix = (row,col) => [...Array(row)].map(row=>Array(col).fill([]));

const getSpotPositions = data => data.slice(2, data.length-1);

const getConstantPositions = (data, spotPos) => {
 let constants = data;
 constants.splice(2,spotPos.length+1, constants[constants.length-1]);
 return constants;
};

//maps values to the keys
const mapper = (spotspos,constants) => ({
 room:constants[0],
 hoover:constants[1],
 spots:spotspos,
 drive:constants[constants.length-1]
});
 
//enumerates data with x and y keys 
const toEnumerate = element => ( {x:element[0],y:element[1]} );


const stopInterval = async intrvl => await clearInterval(intrvl);

/**
* @function { nextMove } 
* @param { Object } coords
* @param { Object } hooverCoords

* coords.drive[0] accessing the first 
* function in the coords.drive currentSpots, calls it with the current 
* hoover coordinates, saves it to 'nxt' variable.
* then coords.drive[0] gets removed from currentSpots.
* 
*/
const nextMove = async (coords,hooverCoords) => {
 try{
  let nxt = coords.drive[0](hooverCoords);
  coords.drive.shift();
  return nxt;
 }
 catch(e){ throw new Error('error in next move', e);}
};

const isAnySpotLeft = async(coords) => {
 try{
  return coords.length === 0;
 }
 catch(e){ throw new Error('error in any spot left', e);}
};

const isOverlap = async (hooverPos,spots) => {
 try{
  return spots.some((x) => {
   return JSON.stringify(hooverPos) === JSON.stringify(x);
  });
 }
 catch(e){ throw new Error('error in overlaping', e);}
};

const placeElement = async (grid,element,x,y) => {
 try{
  if(element === 'hoover'){
   grid[y][x] = 11;
   return grid;
  }
  if(element === 'spot'){
   grid[y][x] = 33;
   return grid;
  }
 }
 catch(e) {throw new Error('error placing element', e);}
};

const spotGenerator = async (board,coords,fn) => {
 try{
  if(!coords){ throw new Error('missing coordinates');}
  coords.map(async (coord) => await fn(board,'spot',coord.x, coord.y));
 }
 catch(e){ throw new Error('error in spot generator', e);}
};

const cleanSpot = async(hooverPos,spots) => {
 try{
  //array of objects {removed}
  let removed = spots.splice( spots.indexOf(hooverPos), 1 );
  return removed;
 }
 catch(e){ throw new Error('error in cleaning', e);}
};

module.exports = { 
 createMatrix,
 getSpotPositions,
 getConstantPositions,
 toEnumerate,
 mapper,
 stopInterval,
 nextMove,
 isAnySpotLeft,
 isOverlap,
 placeElement,
 spotGenerator,
 cleanSpot
};
