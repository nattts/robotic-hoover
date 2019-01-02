const { 
 getSpotPositions,
 getConstantPositions,
 toEnumerate,
 toMap
} = require('../utils/helpers');

const enumerator = data => {
 
 const dataCopy = [...data];
 //temporarly remove as will need to put it back to the end of array
 const tmpRemoved = dataCopy.pop();
 const enumerated = dataCopy.map(toEnumerate);
 enumerated.push(tmpRemoved);
 return enumerated;
 
};

const objectMapper = data => {

 const enumerated = enumerator(data);
 const spotPosition = getSpotPositions(enumerated);
 const constants = getConstantPositions(enumerated);
 const mapped = toMap(spotPosition,constants);
 return mapped;

};

module.exports = { objectMapper };




