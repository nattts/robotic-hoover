const { 
 placeElement,
 getData,
 inputProcessor,
 fileReader,
 spotGenerator,
 show
} = require('./src/base');

const { validator } = require('./src/validator/inputValidator');
const { store } = require('./src/store');


/**
* @function { render } 
* @param { Object } coords
* 
* @const {result} of each interval used to update 
* existing coordinates.
*
*/

const render = async(coords) => {

 const interval = setInterval(async()=> {
  const result = await show(coords);
  coords = {...result};

 }, 800);
 
 store.setInterval(interval);

};

getData('input.txt', fileReader)
 .then(validator)
 .then(inputProcessor)
 //.then((result)=> console.log(result))
 .then((result)=> render(result))
 .catch((e) => console.log(new Error(e))); 

module.exports = { store };

