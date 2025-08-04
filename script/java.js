const submitBtn = document.getElementById("submit");
const originalCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?/";
const key = document.getElementById("keyH3");
const keyViewer = document.getElementById("keyViewer");
const keyResult = document.getElementById("keyResult");
const keyCopyBtn = document.getElementById("keyCopyBtn");
let shuffledCharSet = "";
let result;
let originalMessage;
let encryptedMessageResult = document.getElementById("encryptedMessageResult");

function shuffleCharSet(originalCharset){
    let array = originalCharset.split("");
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array.join("");
}

submitBtn.onclick = function(){
    result = "";
    originalMessage = document.getElementById("messageToBeCoded").value

    shuffledCharSet = shuffleCharSet(originalCharset);

    for(let char of originalMessage){
        let index = originalCharset.indexOf(char);
        if (index !== -1){
            result += shuffledCharSet[index];
        } else {
            result += char;
        }
    }
     encryptedMessageResult.textContent = result;
     keyResult.textContent = shuffledCharSet;
}

keyViewer.onclick = function(){
    if(key.style.display === "none"){
        key.style.display = "block";
        keyResult.style.display = "block";
        keyCopyBtn.style.display = "block";
        keyViewer.textContent = "Hide your Key";
    } else {
        key.style.display = "none"
        keyResult.style.display = "none";
        keyCopyBtn.style.display = "none";
        keyViewer.textContent = "View your Key"
    }
}

keyCopyBtn.onclick = function(){
    navigator.clipboard.writeText(shuffledCharSet)
        .then(() => {
            copyMessage.style.display = "inline"; // show it
            copyMessage.style.opacity = "1";

            setTimeout(() => {
                copyMessage.style.transition = "opacity 0.5s";
                copyMessage.style.opacity = "0";
            }, 1000);

            setTimeout(() => {
                copyMessage.style.display = "none";
                copyMessage.style.transition = "none";
            }, 1500);
        })
        .catch(err => {
            console.error("Copy failed: ", err);
        });
}