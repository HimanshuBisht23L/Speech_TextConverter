let text2speech = document.querySelector("#main-container")

// To Select Sections
function showSection(classID) {
    const id = classID
    text2speech.style.display = "none"
    document.getElementById(classID).style.display = "flex"
}

////////////////////////////////////////////////////// TEXT TO SPEECH //////////////////////////////////////////////
let speech = new SpeechSynthesisUtterance();
let selectVoice = document.querySelector(".languages  select")
let voicelist = []

// Adding Voices To App
// We can use multiple listeners by this
window.speechSynthesis.addEventListener("voiceschanged", () => {
    voicelist = window.speechSynthesis.getVoices();
    selectVoice.innerHTML = '';
    voicelist.forEach((voice) => {
        selectVoice.innerHTML += `<option>${voice.name}</option>`;
    });
});


// Selecting voice from select bar)
selectVoice.addEventListener("change", () => {
    const selectname = selectVoice.value
    for (let i = 0; i < voicelist.length; i++) {
        if (voicelist[i].name === selectname) {
            speech.voice = voicelist[i];
            break;
        }
    }
})

// Speak Voice 
document.querySelector(".languages button").addEventListener("click", () => {
    speech.text = document.querySelector(".search-text textarea").value
    window.speechSynthesis.speak(speech)
})


////////////////////////////////////////////// SPEECH TO TEXT//////////////////////////////////////
let selectedlanguage = document.querySelector(".Texts select")
function populateSpeechLanguages() {
    const lang = [
        { code: "en-US", name: "English (United States)" },
        { code: "ml-IN", name: "Malayalam" },
        { code: "ur-IN", name: "Urdu" },
        { code: "gu-IN", name: "Gujarati" },
        { code: "mr-IN", name: "Marathi" },
        { code: "hi-IN", name: "Hindi" },
        { code: "bn-IN", name: "Bengali" },
        { code: "kn-IN", name: "Kannada" },
        { code: "te-IN", name: "Telugu" },
        // Add more languages as needed
    ]

    lang.forEach((lang) => {
        const option = document.createElement("option")
        option.value = lang.code
        option.innerText = lang.name
        selectedlanguage.appendChild(option)
    })

}

let recordbutton = document.querySelector(".Texts button")
let recordText = document.querySelector(".search-speech textarea")
recordbutton.addEventListener("click", () => {
    const listen = window.SpeechRecognition || webkitSpeechRecognition
    let interval;
    if (!listen) {
        alert("Speech Recognition Not Supported in This Browser!!!")
        return
    }

    const recognition = new listen()

    recognition.lang = selectedlanguage.value
    recognition.interimResults = false;

    recognition.onstart = () => {
        recordText.value = "Listining"
        interval = setInterval(() => {
            if(recordText.value === `Listining....`){
                recordText.value = `Listining`
            }
            recordText.value += `.` 
        }, 500);
    }

    recognition.onspeechend = () => {
        clearInterval(interval)
        recognition.stop()
    }

    recognition.onresult = (event) => {
        clearInterval(interval)
        const textval = event.results[0][0].transcript
        recordText.value = textval;
    }

    recognition.onerror = (event) => {
        clearInterval(interval)
        console.log("Error : " + event.error + ".")
    };

    recognition.start()
})

populateSpeechLanguages()


// Back Button Functionality
let text = document.querySelector(".search-text textarea")
let back = document.querySelectorAll(".back")
let t2s = document.querySelector("#text-to-speech")
let s2t = document.querySelector("#speech-to-text")

back.forEach((button) => {
    button.addEventListener("click", () => {
        // Show the main container and hide both sections
        text2speech.style.display = "flex";
        t2s.style.display = "none";
        s2t.style.display = "none";

        // Reset textarea contents when going back
        if (t2s.style.display === "none") {
            text.value = ''; // clear text in Text to Speech textarea
        } 
        if (s2t.style.display === "none") {
            recordText.value = ''; // clear text in Speech to Text textarea
        }
    });
});







/*
let text2speech = document.querySelector("#main-container")

// To Select Sections
function showSection(classID) {
    text2speech.style.display = "none"
    document.getElementById(classID).style.display = "flex"
}

// Text To Speech
let speech = new SpeechSynthesisUtterance();
let selectVoice = document.querySelector(".languages  select")
let voicelist = []


// Adding Voices To App
// We can use only one time by this if uses later same fucntion then that will run not this
window.speechSynthesis.onvoiceschanged = () =>{
    voicelist = window.speechSynthesis.getVoices();
    selectVoice.innerHTML = ''
    voicelist.forEach((voice) => {
        selectVoice.innerHTML += `<option>${voice.name}</option>`
    })
// }

// Selecting voice from select bar)
selectVoice.addEventListener("change", ()=>{
    const selectname =  selectVoice.value
    for(let i = 0; i < voicelist.length; i++){
        if(voicelist[i].name === selectname) {
            speech.voice = voicelist[i];
            break;
        }
    }    
})

// Speak Voice 
document.querySelector(".languages button").addEventListener("click", ()=>{
    speech.text = document.querySelector(".search-text textarea").value
    window.speechSynthesis.speak(speech)
})



async function getvoices() {
    return new Promise((resolve) => {
        if (window.speechSynthesis.getVoices().length !== 0) {
            resolve(window.speechSynthesis.getVoices())
        }
        else {
            window.speechSynthesis.onvoiceschanged = () => {
                resolve(window.speechSynthesis.getVoices())
            };
        }
    })
}

async function voiceload() {
    voicelist = await getvoices();
    voicelist.forEach((voice) => {
        selectVoice.innerHTML = '';
        voicelist.forEach((voice) => {
            selectVoice.innerHTML += `<option>${voice.name}</option>`;
        })
    })
}

voiceload()
*/