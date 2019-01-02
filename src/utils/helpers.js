const createMatrix = (row,col) => [...Array(row)].map(row => Array(col).fill([]));

const getSpotPositions = data => data.slice(2, data.length-1);

const getConstantPositions = data => {

 let constants = [...data];
 return constants.filter((x)=>
  constants.indexOf(x) === 0 || 
  constants.indexOf(x) === 1 || 
  constants.indexOf(x) === constants.length-1);

};

//maps values to the keys
const toMap = (spotspos,constants) => ({
 room:constants[0],
 hoover:constants[1],
 spots:spotspos,
 drive:constants[constants.length-1]
});
 
//enumerates data with x and y keys 
const toEnumerate = element => ( {x:element[0],y:element[1]} );

const stopInterval = async (intrvl,coords,removedSpots) => {
 await clearInterval(intrvl);
 console.log(`hoover position:  ${coords.hoover.x} ${coords.hoover.y}`);
 console.log(`spots cleaned: ${removedSpots}`);
 return coords;

};

/**
* @function { nextMove } 
* @param { Object } coords

* coords.drive[0] accessing the first 
* function in the drive directions, calls it with the current 
* hoover coordinates, saves it to 'nextStep' variable.
* then first index of gets removed from drive directions array, 
* then hoover coordinates get updated
* 
*/

const nextMove = async (coords) => {
 try{
  const nextStep = coords.drive[0](coords.hoover);
  coords.drive.shift();
  coords.hoover = nextStep;
  return coords;
 }
 catch(e){ throw new Error('error in next move', e);}
};

const isAnySpotLeft = async(coords) => {
 try{
  return coords.length === 0;
 }
 catch(e){ throw new Error('error in any spot left', e);}
};


const isOverlap = async (coords) => {
 try{
  return coords.spots.some((x) => {
   return JSON.stringify(coords.hoover) === JSON.stringify(x);
  });
 }
 catch(e){ throw new Error('error in overlaping', e);}
};


const placeElement = async (grid,element,coords) => {
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
};

const spotGenerator = async (board,c,fn) => {
 try{
  const coords = [...c.spots];
  if(!coords){ throw new Error('missing coordinates');}
  return coords.map(async (coord) => await fn(board,'spot',coord));
 }
 catch(e){ throw new Error('error in spot generator', e);}
};

const findSpotIndex = (hooverPos,spotsArr)=> {
 const index = spotsArr.findIndex((element) => {
  return JSON.stringify(element) ===  JSON.stringify(hooverPos);
 });
 return index;

};


/*
* @function cleanSpot 
* @param {object} coords 
* @param {spots} Array of objects
*
* removes spot by deleting an object of spot position 
* if it match hoover position
*/

const cleanSpot = async(coords) => {
 try{
  let index = findSpotIndex(coords.hoover,coords.spots);
  coords.spots.splice(index,1);
  return coords.spots;
 }
 catch(e){ throw new Error('error in cleaning', e);}
};

module.exports = { 
 createMatrix,
 getSpotPositions,
 getConstantPositions,
 toEnumerate,
 toMap,
 stopInterval,
 nextMove,
 isAnySpotLeft,
 isOverlap,
 placeElement,
 spotGenerator,
 cleanSpot
};
