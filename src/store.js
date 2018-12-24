/**
* 
* a class to store the interval variable and number of removed spots 
* 
*/

class Store{
 constructor() {
  this.removedSpots = 0;
  this.interval;
 }
 
 setInterval(i){
  this.interval = i;
 }
 getInterval(){
  return this.interval;
 }

 setRemovedSpots(r){
  this.removedSpots++;
 }

 getRemovedSpots(){
  return this.removedSpots;
 }
}

const store = new Store();

module.exports = { store };

