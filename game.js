/*==========   GENERAL   ==========*/
Array.prototype.swap = function (i, j) {
  var temp = this[i];
  this[i] = this[j];
  this[j] = temp;
  return this;
}





/*==========   GAME CODE   ==========*/
/*=====  Game Objects  =====*/
var nextCard = document.getElementById("nextCard");
var nextCardContainer = document.getElementById("nextCardContainer");
var currentCard = document.getElementById("currentCard");


/*=====  Card Content Variables  =====*/
var questions = ["Why do donuts have holes?", 
                 "Who invented the modern flush toilet?",
                 "How did soap operas get their name?"];
var answers = ["When hole-less donuts were fried, the centers would be undercooked and inedible. A man named Captain Hanson Gregory discovered that when he fried donuts with holes in them would be cooked evenly, and donuts have had holes ever since.",
               "The first modern flushable toilet was described in 1596 by Sir John Harington, an English courtier and the godson of Queen Elizabeth I. Harington’s device called for a 2-foot-deep oval bowl waterproofed with pitch, resin and wax and fed by water from an upstairs cistern. Flushing Harington’s pot required 7.5 gallons of water—a veritable torrent in the era before indoor plumbing.",
               "When soap operas were first aired in the 1920s, their creators needed sponsors to fund them. In an effort to reach their target audience, women, they chose soap companies to sponsor them. As a result, the media began calling them 'soap operas'."];
var numQuestions = questions.length;
var index=0;

/*=====  Card Flip Controllers  =====*/
var onFront = true;
var flipReady = true;

/*=====  Card Functions =====*/
// Randomly Shuffle Cards
function shuffle() {
  for (var i = 0; i < numQuestions - 2; i++) {
    var randNum = Math.floor(Math.random() * (numQuestions));
    questions.swap(i, randNum);
    answers.swap(i, randNum);
  }
}

// Call Animation for Next Card
function newCard(){
  flipReady = false;
  nextCard.classList.add('slide-in');
  nextCardContainer.classList.add('container-slide-in');
}

// Set Content of Current and Next Card
function setCurrentCard(i){
  document.getElementById("currentQuestion").innerHTML = questions[i];
  document.getElementById("currentAnswer").innerHTML = answers[i];
}
function setNextCard(i){
  document.getElementById("nextQuestion").innerHTML = questions[i];
  document.getElementById("nextAnswer").innerHTML = answers[i];
}

//Flip Card
function flip() {
  if(flipReady){
    currentCard.classList.toggle("flip");
    onFront = !onFront;
  }

}

// Run On Start
function setup(){
  shuffle();
  setCurrentCard(index);
  index=(index+1)%numQuestions;
  setNextCard(index);
}





/*==========   Animation Stuff   ==========*/
//Reset Cards After Next Card Slides into Place
nextCard.addEventListener("webkitAnimationEnd", resetCards);
nextCard.addEventListener("animationend", resetCards);

// Switch Cards & Reset New Card Animation
function resetCards() {
  setCurrentCard(index);
  flipReady = true;
  // TEST TO NOT FLIP NEW CARD IF CURRENT CARD IS FLIPPED
  if(!onFront){
    currentCard.style.transitionDuration = "0s";
    flip();
    
  }
  nextCard.classList.remove('slide-in');
  nextCardContainer.classList.remove('container-slide-in');
  index=(index+1)%numQuestions;
  setNextCard(index);
}





/*==========   HELP MODAL   ==========*/
var help = document.getElementById('helpModal');

/*=====  Toggle Modal Visibility =====*/
function showHelp() {
    help.style.display = "flex";
}

function hideHelp() {
    help.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == help) {
        hideHelp();
    }
}

/*=====  Change Slides =====*/
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1;}    
  if (n < 1) {slideIndex = slides.length;}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
