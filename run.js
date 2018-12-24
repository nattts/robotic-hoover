const { 
 placeElement,
 getData,
 inputProcessor,
 fileReader,
 spotGenerator,
 show
} = require('./src/base.js');

const { store } = require('./src/store.js');


const render = async(coords) => {

 let { x:hooverX, y:hooverY } = coords.hoover; 
 
 const interval = setInterval(async()=> {
  let res = await show(coords,hooverX,hooverY);
  ({ x: hooverX, y: hooverY} = res);
 
 }, 800);
 
 store.setInterval(interval);

};



getData('input.txt', fileReader, inputProcessor)
 .then((res)=> render(res))
 .catch((e) => console.log(new Error(e))); 

module.exports = { store };

