const { 
 getSpotPositions,
 getConstantPositions,
 toEnumerate,
 mapper
} = require('../utils/helpers');

const enumerator = data => {
 
 //temporarly remove as will need to put it back to the end of array
 let tmpRemoved = data.pop();
 let enumerated = data.map(toEnumerate);
 enumerated.push(tmpRemoved);
 return enumerated;
};

const objectMapper = data => {
 
 let enumerated = enumerator(data);
 let spotPosition = getSpotPositions(enumerated);
 let constants = getConstantPositions(enumerated,spotPosition);
 let mapped = mapper(spotPosition,constants);
 return mapped;

};

module.exports = { objectMapper };




