document.addEventListener("DOMContentLoaded", function() {
    const chatHistory = document.getElementById("chat-history");
    const messageInput = document.getElementById("message-input");
    const sendMessageBtn = document.getElementById("send-message");

    sendMessageBtn.addEventListener("click", function() {
        const userMessage = messageInput.value.trim();
        if (userMessage !== "") {
            appendMessage("You", userMessage);
            const botResponse = generateBotResponse(userMessage.toLowerCase());
            appendMessage("Bot", botResponse.response);
            if (botResponse.resources) {
                appendMessage("Bot", "Here are some resources you might find helpful: <a href='" + botResponse.resources + "' target='_blank'>" + botResponse.resources + "</a>");
            }
            messageInput.value = "";
        }
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
    
    function generateBotResponse(Usermessage) {
        // Check for greetings
        if (isGreeting(Usermessage)) {
          return dataset.greetings.response;
        }
    }

    function generateBotResponse(userMessage) {
        let response = dataset.others.response;
        let resources = null;

        for (const category in dataset) {
            if (dataset.hasOwnProperty(category) && category !== "others") {
                for (const keyword in dataset[category]) {
                    if (dataset[category].hasOwnProperty(keyword) && userMessage.includes(keyword)) {
                        response = dataset[category][keyword].response;
                        resources = dataset[category][keyword].resources || null;
                        break;
                    }
                }
            }
        }

        return { response, resources };
    }
    
});

const dataset = {
  "greetings": {
    "hello":{
    "response": "Hello! I'm here to help you with your mental health. How are you feeling today?"
  },
  "mental health": {
    "feeling down": {
      "response": "I understand feeling down can be tough. Would you like to talk about what's bringing you down, or would you prefer some resources for coping with low mood?",
      "resources": "https://www.mind.org.uk/"
    },
    "stressed": {
      "response": "Feeling stressed is very common. Are you looking for some relaxation techniques, or perhaps resources for managing stress?",
      "resources": "https://www.helpguide.org/home-pages/stress-management.htm"
    },
    "anxious": {
      "response": "Anxiety can be overwhelming. Would you like to chat about what's making you anxious, or are you interested in learning some coping mechanisms?",
      "resources": "https://adaa.org/"
    },
    "angry": {
      "response": "Anger is a normal emotion, but it's important to express it in a healthy way. Would you like to talk about what's making you angry, or are you looking for tips on managing anger?",
      "resources": "https://www.healthshots.com/mind/emotional-health/a-top-psychiatrist-reveals-9-healthy-ways-of-expressing-anger-without-being-hurtful/"
    },
    "help": {
      "response": "I'm here to help in any way I can. Can you tell me a bit more about what kind of help you're looking for?",
      "resources": "https://youth.gov/federal-links/mentalhealthgov"
    }
  },
},
  "others": {
    "response": "I'm sorry, I didn't understand. Can you rephrase your question, or would you like me to provide some general mental health resources?"
  }
};
function isGreeting(Usermessage) {
    const greetings = ['hi', 'hello', 'hey'];
    return greetings.includes(Usermessage);
  }
