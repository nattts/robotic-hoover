const { base } = require('./base');
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

const run = async () => {
 try{
  base.getData('input.txt', base.fileReader)
 .then(validator)
 .then(base.inputProcessor)
 .then((result)=> render(result))
 .catch((e) => console.log(new Error(e))); 
}
 catch(e){ console.log('error while runnning', e);}
}


module.exports = { store, run };

