const { utils } = require('../utils/helpers');

const enumerator = data => {
 try{
  const dataCopy = [...data];
  //temporarly remove as will need to put it back to the end of array
  const tmpRemoved = dataCopy.pop();
  const enumerated = dataCopy.map(utils.toEnumerate);
  enumerated.push(tmpRemoved);
  return enumerated;
 }
 catch(e){ console.log(e);
 }
 
};

const objectMapper = data => {
 try{
  const enumerated = enumerator(data);
  const spotPosition = utils.getSpotPositions(enumerated);
  const constants = utils.getConstantPositions(enumerated);
  const mapped = utils.toMap(spotPosition,constants);
  return mapped;
 }
 catch(e){ console.log(e);
 }


};

module.exports = { objectMapper };




