var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var phrases = [
  'left',
  'right',
  'front',
  'back'
//   'she enjoys reading books and playing games',
//   'where are you going',
//   'have a great day',
//   'she sells seashells on the seashore'
];
var audio1=new Audio("punch.mp3");
var audio2=new Audio("game_over.mp3");
var audio3=new Audio("fail.mp3");
var audio= [ new Audio("left_final.mp3"),
new Audio("right_final.mp3"),
new Audio("front_final.mp3"),
new Audio("back_final.mp3")]
var phrasePara = document.querySelector('.phrase');
var resultPara = document.querySelector('.result');
var diagnosticPara = document.querySelector('.output');
var k; // variable for storing the random variable
var testBtn = document.querySelector('.button_play');
var score_value=document.querySelector('.score_val');
var life_value=document.querySelector('.life_val');
var score_local_val=0;
var life_local_val=5;
var flag_life_speech=0;
var fin_score=document.querySelector('.final_score');

function randomPhrase() {
  var number = Math.floor(Math.random() * phrases.length);
  return number;
}

function testSpeech() {
	flag_life_speech=0; //changes
  testBtn.disabled = true;
  testBtn.textContent = 'Game in progress';
  k=randomPhrase();
  if(k==2){
    k=0;
  }
  audio[k].play();
audio[k].onended = function(){
	life_local_val=life_local_val-1;
            //console.log(life)
		//flag_life_speech=1;
            life_value.textContent="Lives-"+life_local_val;
            if(life_local_val==0){
              localStorage.setItem("myScore", score_local_val); 
			  audio2.play();
                 audio2.onended = function(){
                       speaks=[{"name":"Alex", "lang":"en-US"}]
					   const msg=new SpeechSynthesisUtterance();
					   msg.volume=1; // 0 to 1
					   msg.rate=0.9;   // 0.1 to 10
					   msg.pitch=1; // 0 to 2
					   msg.text="Your total score is"+score_local_val+"Press anywhere to restart the game";
					   const voice =speaks[0];
					   console.log("voice detected");
					   msg.voiceURI=voice.name;
					   msg.lang=voice.lang;
					   speechSynthesis.speak(msg);
   window.location.href = '/last';
                   }
     
        //window.location = 'game over.html';
        //fin_score.textContent=score_local_val
  }
else{
testSpeech();
}
}
  var phrase = phrases[k];
  // To ensure case consistency while checking with the returned output text
  phrase = phrase.toLowerCase();
  //amplify.store("myPhrase", phrase);
  localStorage.setItem("myPhrase", phrase); 
  phrasePara.textContent = phrase;
  resultPara.textContent = 'Right or wrong?';
  resultPara.style.background = 'rgba(0,0,0,0.2)';
  diagnosticPara.textContent = '...diagnostic messages';

  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object 
    var speechResult = event.results[0][0].transcript.toLowerCase();
    diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
    if(speechResult === phrase) {
      score_local_val=score_local_val+1;
	  flag_life_speech=1;
          //console.log(score)
          score_value.textContent = "Score-"+score_local_val;
		  localStorage.setItem("myScore", score_local_val); 
      resultPara.textContent = 'I heard the correct phrase!';
      resultPara.style.background = 'lime';
   audio[k].pause();
  audio[k].currentTime =0;
  audio1.play();
  audio1.onended = function(){
testSpeech();
}
    } else {
       life_local_val=life_local_val-1;
            //console.log(life)
		flag_life_speech=1;
            life_value.textContent="Lives-"+life_local_val;
			audio[k].pause();
			audio[k].currentTime =0;
            if(life_local_val==0){
              localStorage.setItem("myScore", score_local_val); 
			  console.log("Score is "+score_local_val);
			  audio2.play();
                 audio2.onended = function(){
              //testSpeech();
                       speaks=[{"name":"Alex", "lang":"en-US"}]
					   const msg=new SpeechSynthesisUtterance();
					   msg.volume=1; // 0 to 1
					   msg.rate=0.9;   // 0.1 to 10
					   msg.pitch=1; // 0 to 2
					   msg.text="Your total score is"+score_local_val+"Press anywhere to restart the game";
					   const voice =speaks[0];
					   console.log("voice detected");
					   msg.voiceURI=voice.name;
					   msg.lang=voice.lang;
					   speechSynthesis.speak(msg);
                   window.location = '/last';
                   }

 

              
              //window.location = 'game over.html';
              //fin_score.textContent=score_local_val
  }
else{
      resultPara.textContent = 'That didn\'t sound right.';
      resultPara.style.background = 'red';
    
  audio3.play();
  audio3.onended = function(){
testSpeech();
}
}
    }

    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.textContent = 'Start new game';
  }

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start new game';
    diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
  }
  
  recognition.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart');
  }
  
  recognition.onaudioend = function(event) {
      //Fired when the user agent has finished capturing audio.
      console.log('SpeechRecognition.onaudioend');
  }
  
  recognition.onend = function(event) {
      //Fired when the speech recognition service has disconnected.
      console.log('SpeechRecognition.onend');
  }
  
  recognition.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch');
  }
  
  recognition.onsoundstart = function(event) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log('SpeechRecognition.onsoundstart');
  }
  
  recognition.onsoundend = function(event) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log('SpeechRecognition.onsoundend');
  }
  
  recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');
  }
  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
  }
}
function stopaudio() {
	console.log("function entered stopaudio");
	audio[k].pause();
  audio[k].currentTime =0;
 testSpeech();
}
function stopaudio2() {
	console.log("function entered");
	audio[k].pause();
  audio[k].currentTime =0;
}
function correct(){  audio[k].pause();
 audio[k].currentTime=0;
  audio1.play();
  audio1.onended = function(){
testSpeech();
}
}
function fail(){  audio[k].pause();
 audio[k].currentTime=0;
  audio3.play();
  audio3.onended = function(){
testSpeech();
}
}
testBtn.addEventListener('click', testSpeech);
