let chatToggleBtn = document.querySelector(
    ".toolbar-button-with-badge > .toolbox-button > div > .toolbox-icon"
);

// If the chat window is closed, open it to access the chats;
if (!chatToggleBtn.classList.contains("toggled")) {
    chatToggleBtn.click();
}

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
        
        let stringEntry = user + ": " + userMessage;
        jitsiChat.push(stringEntry);
    }
}

let meetName = document.querySelector(
    "#videoconference_page > div.subject.visible > div > div.subject-info > span.subject-text"
).innerText;

let finalFileName = meetName + ".txt";

let finalChat = jitsiChat.join("\r\n");

/* *
 * Downloads the final data in a .txt format.
 *
 * @param {string} filename - The string to be saved as file name.
 * @param {string} text - The data in a single string.
 * @returns {void}
 */
((filename, text) => {
    var element = document.createElement("a");
	element.setAttribute(
		"href",
		"data:text/plain;charset=utf-8," + encodeURIComponent(text)
	);
	element.setAttribute("download", filename);
	element.click();
})(finalFileName, finalChat)
