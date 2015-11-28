//note to future users: this game is meant to be easily changed. New people are added in two steps: 1- put a photo in the /img folder in the following format: name.jpg - horizontal photos work best. 2- add their name to the "people" array. The name should be the same as the one used for the jpg file, and it will be the same name that will need to be spelled. 

//initian state: show only "play" button
document.getElementById('main').style.visibility="hidden";
document.getElementById('jouer').onclick = function(){
document.getElementById('main').style.visibility="visible";
document.getElementById('encore').style.visibility="hidden";
var element = document.getElementById('jouer');
element.parentNode.removeChild(element);
}

//initial variables + getRandom function
var people = ['lili','tessa','pepe','grand-maman','grand-papa','vincent','philippe','genevieve','alexis','laurence']
var copyOfPeople = people.slice();

var newPerson;
var getRandom = function(){
  newPerson = people[Math.floor(Math.random()*people.length)];
  var index = people.indexOf(newPerson);
  people.splice(index, 1);
}
getRandom();
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","-"]
var next;
var nextOrder = 0

//create letter buttons
var createLetters = function(){
for (z = 0; z < letters.length; z++) {
  var newLetter = document.createElement('button');
  newLetter.className = "letter";
  newLetter.id = letters[z];
  newLetter.innerHTML = letters[z].toUpperCase();
  document.getElementById('letters').appendChild(newLetter);
  //click fct - check if right letter is clicked
  newLetter.onclick = function() {
    newPerson.setNext();
    if (next.toLowerCase() == this.id){
      document.getElementById(nextOrder).style.color="black";
      nextOrder++;
      newPerson.printHint();        
      //add animation, sound...
      if (nextOrder==numberOfLetters){
        document.getElementById('photo').style.backgroundImage=newPerson.image;
        document.getElementById('encore').style.visibility="visible";
        document.getElementById('letterSection').style.visibility="hidden";
          if (people.length === 0 ){
    people = copyOfPeople;
    copyOfPeople = people.slice();
  }
      }
    }
    else {
     //set what happens when you have wrong letter
    }
  }
}
}

//encore button - reset game
document.getElementById('encore').onclick=function(){
  nextOrder = 0;
  document.getElementById('photo').style.backgroundImage = "";
  document.getElementById('encore').style.visibility="hidden";
  document.getElementById('letterSection').style.visibility="visible";
  var myNode = document.getElementById("blankSquares");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  getRandom();
  newPerson = new person(newPerson);
  newPerson.createBlanks();
  newPerson.printHint();
}

//person object prototype
  function person(name) {
    this.name = name;
    this.image = "url('img/"+name+".jpg')";
    //made it up to 14 because all names should be shorter than that. 
    var positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13]

    this.createBlanks = function() {
      numberOfLetters = name.length;
      for (x = 0; x < name.length; x++) {
        var newBlank = document.createElement('div');
        newBlank.className = "blanks";
        newBlank.id = positions[x];
        document.getElementById('blankSquares').appendChild(newBlank);
      }
    }
    this.setNext = function() {
      var lettersToFind = name.split('');
      next = lettersToFind[nextOrder];
    }
    //this function needs to be changed to get rid of the positionsToFill array.
    this.printHint = function() {
      if(nextOrder!=numberOfLetters){
      this.setNext();
      document.getElementById(nextOrder).innerHTML= next.toUpperCase();
    }
    }
  }

createLetters();
var newPerson = new person(newPerson);
newPerson.createBlanks();
newPerson.printHint();