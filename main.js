const log = document.getElementById("submited");
const myUL = document.getElementById("myUL");

function inputOnChange() {
    document.getElementById("butAddOption").disabled = document.getElementById("myInput").value.length == 0;
}

function butOnKeyPress(event) {
    document.getElementById("butAddOption").disabled = document.getElementById("myInput").value.length == 0;

    if (event.key === 'Enter')
        document.getElementById("butAddOption").click();

}

function addOption() {
    var li = document.createElement("li");

    li.innerHTML = document.getElementById("myInput").value

    var span = document.createElement("span");
    span.textContent = 'x';
    span.className = "close";
    span.addEventListener("click", delete_item, li);
    li.appendChild(span);

    document.getElementById("myUL").appendChild(li);

    document.getElementById("myInput").value = "";
    document.getElementById("butAddOption").disabled = true;
    document.getElementById('myInput').focus();

    ValiditeState();
}

function delete_item(item) {
    item.path[1].remove();

    ValiditeState();
}

function getOptions() {
    var options = [];

    const myUL = document.getElementById("myUL");

    for (var i = 0; i < myUL.children.length; i++) {
        options.push(myUL.children[i].childNodes[0].data)
    }
    return options;
}


function isDuplicated(input) {
    const myUL = document.getElementById("myUL");

    for (var i = 0; i < myUL.children.length; i++) {
        options.push(myUL.children[i].childNodes[0].data)
    }
}

function ValiditeState() {
    const myUL = document.getElementById("myUL");

    document.getElementById("butDecide").style.visibility = myUL.children.length > 0 ? "visible" : "hidden";
}

async function decide(options) {
    sessionStorage.setItem('options', JSON.stringify(getOptions()));

    window.location.href = "result.html";
}


async function getBlockChainData() {
    const response = await fetch('https://api.blockcypher.com/v1/eth/main');
    const myJson = await response.json(); //extract JSON from the http response

    return myJson;
}