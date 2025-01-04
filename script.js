// Function to show the appropriate section
function showSection(sectionId) {
  document.getElementById('main-container').style.display = 'none';
  document.getElementById(sectionId).style.display = 'flex';
}

// Speech To Text with Language Selection
function SpeechRecord() {
  const speech = window.SpeechRecognition || webkitSpeechRecognition
  if (!speech) {
    alert("Speech Recognition not supported in this browser.");
    return;
  }
  const speechrecord = new speech()

  const result = document.querySelector(".search-speech textarea")
  const chk = document.querySelector(".Texts select")

  speechrecord.interimResults = false
  speechrecord.lang = chk.value

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


// Populate language options for Speech to Text
function populateSpeechLanguages() {
  const languageSelector = document.querySelector(".speech-to-text select");
  const languages = [
    { code: "en-US", name: "English (United States)" },
    { code: "es-ES", name: "Spanish (Spain)" },
    { code: "fr-FR", name: "French (France)" },
    { code: "de-DE", name: "German (Germany)" },
    { code: "zh-CN", name: "Chinese (Mandarin)" },
    { code: "hi-IN", name: "Hindi (India)" },
    { code: "ja-JP", name: "Japanese" },
    // Add more languages as needed
  ];

  languages.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.code;
    option.textContent = lang.name;
    languageSelector.appendChild(option);
  });
}

// Text To Speech Functionality
let speech = new SpeechSynthesisUtterance();
const selectedVoice = document.querySelector(".languages select");
let voices = [];

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  selectedVoice.innerHTML = '';
  voices.forEach((voice) => {
    selectedVoice.innerHTML += `<option>${voice.name}</option>`;
  });
};

selectedVoice.addEventListener("change", () => {
  const selectedName = selectedVoice.value;
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

// Initialize language options on page load
populateSpeechLanguages();
