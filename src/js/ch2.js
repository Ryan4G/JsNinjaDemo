function addMessage(element, message){
    var messageElement = document.createElement("li");
    messageElement.textContent = message;
    element.appendChild(messageElement);
}

var first = document.getElementById("first");
addMessage(first, "Page loading");

document.body.addEventListener("mousemove", function(){
    var second = document.getElementById("second");
    addMessage(second, "Evenet:mousemove");
});

document.body.addEventListener("click", function(){
    var second = document.getElementById("second");
    addMessage(second, "Evenet:click");
});