import * as base from './base'

const { validator } = require('./validator/inputValidator');
const { store } = require('./store');

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
  const result = await base.show(coords);
  coords = {...result};

 }, 800);
 
 store.setInterval(interval);

};

base.getData('input.txt', base.fileReader)
 
 .then(base.validator)
 .then(base.inputProcessor)
 .then((result)=> render(result))
 .catch((e) => console.log(new Error(e))); 

module.exports = { store };

