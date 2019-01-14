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

const render = coords => {
 const interval = setInterval(()=> {
  const result = base.show(coords);
  coords = {...result};
 }, 500);
 
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


module.exports = { store,run };

