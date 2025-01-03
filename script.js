function showSection(sectionId) {
  document.getElementById('main-container').style.display = 'none';
  document.getElementById(sectionId).style.display = 'flex';
}


// Speech To Text
function SpeechRecord() {
  const speech = window.SpeechRecognition || webkitSpeechRecognition
  if (!speech) {
    alert("Speech Recognition not supported in this browser.");
    return;
  }
  const speechrecord = new speech()

  const result = document.querySelector(".search-speech textarea")
  speechrecord.interimResults = false
  speechrecord.lang = 'en-US'

  speechrecord.onstart = function () {
    result.value = "Listining...."
  }

  speechrecord.onspeechend = function () {
    speechrecord.stop()
  }

  speechrecord.onresult = function (event) {
    const text = event.results[0][0].transcript
    result.value = text
    console.log(result)
  }

  speechrecord.onerror = function (event) {
    console.log("Error : " + event.error + ".")
  };

  speechrecord.start()
}


// Text To Speech
let speech = new SpeechSynthesisUtterance();
const selectedvoice = document.querySelector(".languages select");
let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  selectedvoice.innerHTML = '';
  voices.forEach((voice) => {
    selectedvoice.innerHTML += `<option>${voice.name}</option>`;
  });
};

selectedvoice.addEventListener("change", () => {
  const selectedName = selectedvoice.value;
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedName) {
      speech.voice = voices[i];
      break;
    }
  }
});

document.querySelector(".languages button").addEventListener("click", () => {
  speech.text = document.querySelector(".search-text textarea").value;
  window.speechSynthesis.speak(speech);
});




