function assert(value, desc){
    var li = document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    document.getElementById("debug-ui").appendChild(li);
}

function report(desc){
    assert(true, desc);
}

function chapter(title){
    title = "------" + title + "------";
    var li = document.createElement("li");
    li.className = "chapter";
    li.appendChild(document.createTextNode(title));
    document.getElementById("debug-ui").appendChild(li);
}