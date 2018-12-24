const dirN = obj => ({x:obj.x, y:obj.y + 1});
const dirE = obj => ({x:obj.x + 1, y:obj.y});
const dirS = obj => ({x:obj.x, y:obj.y - 1});
const dirW = obj => ({x:obj.x - 1, y:obj.y});

module.exports = { dirN, dirW, dirS, dirE };