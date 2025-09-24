document.addEventListener('DOMContentLoaded', function() {

    // HAMBURGER MENU TOOGLE
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    // TEXT SUMMARIZATION AND FILTERING
    document.getElementById('summarize-btn').addEventListener('click', async () => {
        const textInput = document.getElementById('text-input').value.trim();
        const outputBox = document.getElementById('output');
        const offensiveWords = ["tang ina mo","fuck you","putanginamo", "tangina mo", "shet", "motherfucker",
                                "tanginamo","putang ina mo", "putangina mo", "putang ina", "putangina", "tangina",
                                "Shit", "fuck", "damn", "Asshole", "bastard", "dickhead", "piss off", "nigga", "motherfucker", "nigger"];
        const lowertext = textInput.toLowerCase();

        if (textInput === "") {
            outputBox.innerText = "Please enter some text to summarize.";
            return;
        }
        if (offensiveWords.some(word => lowertext.includes(word))) {
            outputBox.innerText = "Offensive language detected. Please enter appropriate text.";
            return;
        }

        // BACKEND CONNECTION
        try {
            const response = await fetch("https://oralix-backend.onrender.com/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: textInput })
            });
            const data = await response.json();
            outputBox.innerText = data.summary;
        } catch (error) {
            outputBox.innerText = "Error summarizing text.";
        }
    });

// VOICE SELECTION
const voiceSelect = document.getElementById('voice-select');

function populateVoiceList() {
    const allowedLangs = ['en', 'fil', 'es', 'ja']; // English, Filipino, Spanish, Japanese
    const voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = ''; // Clear existing options

    voices
        .filter(voice => allowedLangs.some(lang => voice.lang.toLowerCase().startsWith(lang)))
        .forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})${voice.default ? ' [default]' : ''}`;
            voiceSelect.appendChild(option);
        });

    // Fallback if no voices match
    if (voiceSelect.options.length === 0) {
        const option = document.createElement('option');
        option.textContent = 'No supported voices available';
        voiceSelect.appendChild(option);
    }
}

// Ensure voices are loaded
speechSynthesis.onvoiceschanged = populateVoiceList;
populateVoiceList();

// GENERATE SPEECH
document.getElementById('generate-btn').addEventListener('click', () => {
    const text = document.getElementById('output').textContent;
    if (text !== "") {
        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoice = speechSynthesis.getVoices()[voiceSelect.value];
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.lang = selectedVoice?.lang || 'en-US';
        speechSynthesis.cancel(); // Stop any ongoing speech
        speechSynthesis.speak(utterance);
    }
});

});









