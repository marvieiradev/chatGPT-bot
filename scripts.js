const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const buttonIcon = document.getElementById('button-icon');
const info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') {
        return;
    } else if (message === 'developer') {
        userInput.value = '';
        appendMessage('user', message);
        setTimeout(() => {
            appendMessage('bot', 'Teste')
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);
        return;
    }

    appendMessage('user', message);
    userInput.value = '';

    const url = 'https://openai37.p.rapidapi.com/chat-completion';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '614e5217c9msh6e1102ec18419f6p172d27jsnf7103c5bc929',
            'X-RapidAPI-Host': 'openai37.p.rapidapi.com'
        },
        body: `{
		messages: [
			{
				role: "user",
				content: "${message}"
			},
		],
        temperature: 1
	}`
    };

    fetch(url, options).then
        ((response) => response.json()).then((response) => {
            appendMessage('bot', response.choices[0].message.content);

            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }).catch((err) => {
            if (err.name === 'TypeError') {
                appendMessage('bot', 'Error: Check Api Key!');
                buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
                buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
            }
        });
}

function appendMessage(sender, message) {
    info.style.display = "none"
    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message

    if (sender === 'user') {
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;
}


/*try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
} catch (error) {
    console.error(error);
}*/