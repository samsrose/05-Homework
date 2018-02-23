var BIOS;
var parse;
var ticker = 30;
var questionArray = [
	"TELL ME AUSTRALIA CAPITAL?", 
	"TELL ME LIBERIA CAPITAL? ", 
	"TELL ME TAIWAN CAPITAL?", 
	"TELL ME JAPAN! CAPITAL?", 
	"TELL ME CHINA! CAPITAL?", 
	"TELL ME TURKEY CAPITAL?", 
	"TELL ME COLOMBIA CAPITAL?", 
	"TELL ME INDIA CAPITAL?"
];
var answerArray = [
	["Canberra","Berlin","Sydney","Darwin"], 
	["Unknown","Monrovia","Tuzon","Marshall"], 
	["Washington D.C.","Taichung","Taipei","Hsinchu"], 
	["Kyoto","Hiroshima","Tokyo","Osaka"], 
	["Hong Kong", "Trump Tower", "Shanghai", "Beijing"], 
	["Ankara","Istanbul","Atlantis","Bursa"], 
	["Medellin", "Bogota", "Cartagena", "Timbuk2"], 
	["Mumbai","Hyderabad","Delhi","New Delhi"]
];
var imageArray = [
	"<img class='center-block img-right' src='assets/media/img/AUST.jpg'>", 
	"<img class='center-block img-right' src='assets/media/img/LIB.png'>", 
	"<img class='center-block img-right' src='assets/media/img/TAI.png'>", 
	"<img class='center-block img-right' src='assets/media/img/JAP.png'>", 
	"<img class='center-block img-right' src='assets/media/img/CHI.png'>", 
	"<img class='center-block img-right' src='assets/media/img/TURK.png'>", 
	"<img class='center-block img-right' src='assets/media/img/COL.png'>", 
	"<img class='center-block img-right' src='assets/media/img/IND.jpg'>"
];
var correctAnswers = [
	"A. Canberra", 
	"B. Monrovia", 
	"C. Taipei", 
	"C. Tokyo", 
	"D. Beijing", 
	"A. Ankara", 
	"B. Bogota", 
	"D. New Delhi"
];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var greyFlag = 0;
var blackFlag = 0;
var whiteFlag = 0;
var buttonClick = new Audio("assets/media/button.mp3");
var gameWin = new Audio("assets/media/win.m4a");
var gameLoss = new Audio("assets/media/lose.m4a");

$(document).ready(function() {
// this calls jquery to be injected into the DOM when it has loaded
var x = "Created by Sam Rose";
function bootloader() {
	BIOS = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>START!</a></p>";
	$(".injection").html(BIOS);
	console.log(x + ", with credits due to FALCO and Wojak's ramblings.")
}
//Assign the button to the BIOS variable, then select the .injection tag and inject it the content assigned to BIOS, in this case the start button
bootloader();
$("body").on("click", ".start-button", function(e){
	e.preventDefault();
	buttonClick.play();
	fireZeeMissiles(); //init generation of 
	time(); //init time ticker
}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	buttonClick.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");
		//console.log("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		//console.log("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click
$("body").on("click", ".reset-button", function(event){
	buttonClick.play();
	reset();
}); // Closes reset-button click
});  //  Closes jQuery wrapper
function generateLossDueToTimeOut() {
	whiteFlag++;
	parse = "<p class='text-center timer-p'>TIME LEFT: <span class='timer'>" + ticker + "</span></p>" + "<p class='text-center'>ERRRRRRRRRR!<br/>  ANSWER WAS: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".injection").html(parse);
	gameLoss.play();
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}
function generateWin() {
	greyFlag++;
	parse = "<p class='text-center timer-p'>TIME LEFT: <span class='timer'>" + ticker + "</span></p>" + "<p class='text-center'>Yaay! You got it right! <br>" + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".injection").html(parse);
	gameWin.play();
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	blackFlag++;
	parse = "<p class='text-center timer-p'>TIME LEFT: <span class='timer'>" + ticker + "</span></p>" + "<p class='text-center'>NOPE! The correct answer is: <br>"+ correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".injection").html(parse);
	gameLoss.play();
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function fireZeeMissiles() {
	parse = "<p class='text-center timer-p'>TIME LEFT: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".injection").html(parse);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	fireZeeMissiles();
	ticker = 30;
	time();
	}
	else {
		finalScreen();
	}
}

function time() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (ticker === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (ticker > 0) {
			ticker--;
		}
		$(".timer").html(ticker);
	}
}
function credits() {
	parse = "<b>Created by Sam Rose</b>"
	$("#credits").html(parse);
}

function finalScreen() {
	parse = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + ticker + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + greyFlag + "</p>" + "<p>Wrong Answers: " + blackFlag + "</p>" + "<p>Unanswered: " + whiteFlag + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>You play more?!</a></p>";
	$(".injection").html(parse);
}

function reset() {
	questionCounter = 0;
	greyFlag = 0;
	blackFlag = 0;
	whiteFlag = 0;
	ticker = 30;
	fireZeeMissiles();
	time();
}

