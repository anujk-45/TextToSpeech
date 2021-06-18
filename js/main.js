// Init Speech API
const synth = window.speechSynthesis

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  
  // Loop through voices and create an option for each one
  voices.forEach(voice => {
    //create option element
    const option = document.createElement('option');
    // fill option with voice and language
    option.textContent = voice.name + '('+voice.lang+')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  })
};

getVoices();
if(synth.onvoiceschanged !== undefined){
  synth.onvoiceschanged = getVoices;
}

const speak = () => {
  // Add background gif
  body.style.background = '#141414 url(img/wave.gif)';
  body.style.backgroundRepeat = 'repeat-x';
  body.style.backgroundSize = '100% 100%';
  // check if speaking
  if(synth.speaking) {
    console.error('Already speaking');
    return;
  }
  if(textInput.value !== ''){
    // get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    // speak end
    speakText.onend = e => {
      console.log('Done speaking');
      body.style.background = '#141414';
    }

    // Speak error
    speakText.onerror = e => {
      console.error('Something went wrong');
    }

    // selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    // Loop through voices
    voices.forEach(voice => {
      if(voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set Rate and pitch
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    
    // Speak
    synth.speak(speakText);
  }else{
    body.style.background = '#141414';
  }
}

// Event Listeners

// Text form submit
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change
rate.addEventListener('change' , e => rateValue.textContent = rate.value);

//  valPitchue change
pitch.addEventListener('change' , e => pitchValue.textContent = pitch.value);

// voice select change
voiceSelect.addEventListener('change' , e => speak());