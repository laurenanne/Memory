const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);


    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let count =0;
let cardCount =0;
let cardA;
let cardB;
let eventA;
let eventB;

const score = {flips: 0, pairs: 0};
const flips = document.createElement('div');
flips.innerText = `flips: ${score['flips']}`;
document.body.append(flips);

const pairs = document.createElement('div');
pairs.innerText = `pairs: ${score['pairs']}`;
document.body.append(pairs);


// TODO: Implement this function!
function handleCardClick(event) {
    cardCount +=1;
    score['flips']=cardCount;
    flips.innerText = `flips: ${score['flips']}`;
    count+=1;
    
    if(count ===1){
        eventA = event.target;
        cardA = event.target.style.backgroundColor = event.target.className;
        
        if(event.target.classList.contains('selected')){
            console.log("Pick another card");
            count = count -1;
        }
        else{    
            console.log("you just clicked", event.target);
            eventA.classList.add('selected');
        }
    }

    if(count ===2){
        eventB = event.target;
        cardB = event.target.style.backgroundColor = event.target.className;
        
        if(event.target.classList.contains('selected')){
            console.log("Pick another card");
            count = count -1;

        }
        else{
            console.log("you just clicked", event.target);  
            window.setTimeout(compare,1000);
        }
    }

    if (count==3){
        console.log(alert("ONLY TWO CARDS CAN BE SELECTED AT A TIME"));
        count = count -1;
    }

}



function compare(){
    if (cardA===cardB){
    console.log("It's a match")
    count=count-2;
    eventB.classList.add('selected');
    score['pairs']+=1;
    pairs.innerText = `pairs: ${score['pairs']}`;
    if(score['pairs']===5){
        localStorage.setItem('scoreTracker', JSON.stringify(score));
        console.log("Great Job!");
    }

}

else{
    console.log("Try again");
    console.log(eventA);
    console.log(eventB);
    eventA.classList.remove('selected');
    eventB.classList.remove('selected');
    eventA.style.backgroundColor = '';
    eventB.style.backgroundColor ='';
    count=count-2;

}

}

const restartBtn = document.createElement("button");
restartBtn.innerHTML = "RESTART GAME";
restartBtn.type = "reset";
restartBtn.setAttribute('id', 'restart');
document.body.appendChild(restartBtn);
restartBtn.addEventListener('click', function (e){
    window.location.reload();
})


// when the DOM loads
createDivsForColors(shuffledColors);









// const startBtn = document.createElement("button");
// startBtn.innerHTML = "START GAME";
// startBtn.type = "submit;"
// document.body.prepend(startBtn);
// startBtn.addEventListener('click', function (e){
//     console.log("Pick a card");    

// })












