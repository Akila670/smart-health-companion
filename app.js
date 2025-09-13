const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  addMessage("You", input);
  saveToFirebase("user", input);

  const botReply = generateHealthResponse(input);
  addMessage("Bot", botReply);
  saveToFirebase("bot", botReply);

  userInput.value = "";
}

function addMessage(sender, message) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function saveToFirebase(sender, message) {
  db.collection("chat").add({
    sender,
    message,
    timestamp: new Date()
  });
}

function generateHealthResponse(input) {
  input = input.toLowerCase();
  if (input.includes("headache")) {
    return "Try staying hydrated and resting. Could be due to stress or dehydration.";
  } else if (input.includes("tired") || input.includes("fatigue")) {
    return "You might need better sleep or a more balanced diet. Try exercising lightly.";
  } else if (input.includes("anxious") || input.includes("stress")) {
    return "Consider journaling, deep breathing, or speaking with a mental health professional.";
  } else if (input.includes("diet")) {
    return "Try a diet rich in vegetables, lean protein, and whole grains. Avoid excessive sugar.";
  } else if (input.includes("exercise")) {
    return "Start with 15–30 mins of walking daily. Gradually increase intensity.";
  }
  return "Thank you! I'll note that. Try to maintain a balanced lifestyle.";
}

// 🎤 Voice input using Web Speech API
function startVoiceInput() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    const voiceText = event.results[0][0].transcript;
    userInput.value = voiceText;
    sendMessage();
  };

  recognition.onerror = function(event) {
    alert("Voice recognition error: " + event.error);
  };
}
function generateHealthResponse(input) {
  input = input.toLowerCase();

  if (input.includes("fever")) {
    return `
      It sounds like you have a fever. Here's what might help:
      • Medicine: Paracetamol (500mg every 6 hours if needed)
      • Tips: Stay hydrated, rest, monitor your temperature.
      • Please see a doctor if fever persists over 2 days.`;
  }

  if (input.includes("cold") || input.includes("cough")) {
    return `
      It looks like you're dealing with a cold or cough:
      • Medicine: Cetirizine for cold; Cough syrup like Benadryl for dry cough.
      • Tips: Drink warm fluids, avoid cold food, rest well.`;
  }

  if (input.includes("headache")) {
    return `
      For headache:
      • Medicine: Ibuprofen or Paracetamol can help.
      • Tips: Avoid screen time, drink water, rest in a dark quiet room.`;
  }

  if (input.includes("diarrhea")) {
    return `
      For diarrhea:
      • Medicine: ORS solution, Loperamide (Imodium) if necessary.
      • Tips: Stay hydrated, avoid dairy and spicy food.`;
  }

  if (input.includes("vomiting")) {
    return `
      For vomiting:
      • Medicine: Domperidone or Ondansetron (only if prescribed).
      • Tips: Eat bland food, avoid strong smells, rest well.`;
  }

  if (input.includes("stomach") || input.includes("pain")) {
    return `
      Stomach pain can be due to many causes:
      • Medicine: Antacids (like Gelusil), Buscopan for cramps.
      • Tips: Avoid spicy food, eat light meals, consult a doctor if pain is severe.`;
  }

  // Default fallback
  return `
    I'm not sure about that symptom. Please describe how you feel or consult a doctor for proper diagnosis.`;
}
