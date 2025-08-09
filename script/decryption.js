const submitBtn = document.getElementById("submitBtn");
const generatedMsg = document.getElementById("generatedMessage");
const originalCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?/"
let message;
let key;
let result = "";

submitBtn.onclick = function(){
    key = document.getElementById("key").value;
    message = document.getElementById("message").value;

    for(let char of message){
        let index = key.indexOf(char);

        if (index !== -1){
            result += originalCharset[index];
        } else {
            result += char;
        }
    }
    generatedMsg.textContent = result;
}

document.querySelectorAll('.decryptionElement').forEach(function(input) {
    input.addEventListener("input", function () {
        const span = document.createElement("span");
        span.style.visibility = "hidden";
        span.style.whiteSpace = "pre";
        span.style.font = getComputedStyle(this).font;
        span.textContent = this.value || " ";
        document.body.appendChild(span);

        this.style.width = span.offsetWidth + 30 + "px";
        document.body.removeChild(span);
    });
});
