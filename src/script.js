let chatContainer = document.querySelector("#chatconversation");

// remote or local groups - to get direct children
let descendents = chatContainer.getElementsByClassName('chat-message-group');

// array of strings
let jitsiChat = [];

for (let i = 0; i < descendents.length; ++i) {

    let currentElement = descendents[i],
        totalChildren = currentElement.childElementCount;

    let user = document.querySelector("#chatconversation > div:nth-child(" + (i + 1) + ") > div:nth-child(1) > div > div > div > div.display-name").innerText;

    for (let j = 1; j <= totalChildren; ++j) {
        
        let query = "#chatconversation > div:nth-child(" + (i + 1) + ") > div:nth-child(" + j + ") > div > div > div > div.usermessage";
        
        let userMessage = document.querySelector(query).innerText;
        
        let stringEntry = user + ": " + JSON.stringify(userMessage);
        jitsiChat.push(stringEntry);
    }
}

let download = (filename, text) => {
    var element = document.createElement("a");
	element.setAttribute(
		"href",
		"data:text/plain;charset=utf-8," + encodeURIComponent(text)
	);
	element.setAttribute("download", filename);
	element.click();
};


let meetName = document.querySelector("#videoconference_page > div.subject.visible > div > div.subject-info > span.subject-text").innerText;

let filename = meetName + ".txt";

let text = jitsiChat.join("\r\n");

download(filename, text);
