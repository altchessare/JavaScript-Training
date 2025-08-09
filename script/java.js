const submitBtn = document.getElementById("submit");
const originalCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?/";
const key = document.getElementById("keyH3");
const keyViewer = document.getElementById("keyViewer");
const keyResult = document.getElementById("keyResult");
const keyCopyBtn = document.getElementById("keyCopyBtn");
const copyMessage = document.getElementById("copyMessage");
const messageInput = document.getElementById("messageToBeCoded");
let shuffledCharSet = "";
let result;
let originalMessage;
let encryptedMessageResult = document.getElementById("encryptedMessageResult");

messageInput.addEventListener("input", function () {
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.whiteSpace = "pre";
    span.style.font = getComputedStyle(this).font;
    span.textContent = this.value || " ";
    document.body.appendChild(span);

    this.style.width = span.offsetWidth + 30 + "px";
    document.body.removeChild(span);
});

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
    const isHidden = !key.classList.contains("visible");
    if(isHidden){
        key.classList.add("visible");
        keyResult.classList.add("visible");
        keyCopyBtn.classList.add("visible");
        keyViewer.textContent = "Hide your Key";
    } else {
        key.classList.remove("visible");
        keyResult.classList.remove("visible");
        keyCopyBtn.classList.remove("visible");
        keyViewer.textContent = "View your Key";
    }
}

keyCopyBtn.onclick = function(){
    navigator.clipboard.writeText(shuffledCharSet)
        .then(() => {
            copyMessage.classList.add("visible");
            copyMessage.style.opacity = "1";

            setTimeout(() => {
                copyMessage.style.transition = "opacity 0.5s";
                copyMessage.style.opacity = "0";
            }, 1000);

            setTimeout(() => {
                copyMessage.classList.remove("visible");
                copyMessage.style.transition = "none";
                copyMessage.style.opacity = "1";
            }, 1500);
        })
        .catch(err => {
            console.error("Copy failed: ", err);
        });
}