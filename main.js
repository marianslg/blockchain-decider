const log = document.getElementById("submited");
const myUL = document.getElementById("myUL");

function butOnKeyPress(event) {
    if (event.key === 'Enter' && document.getElementById("myInput").value.length > 0)
        addOption();
}

function addOption() {
    var li = document.createElement("li");

    li.innerHTML = document.getElementById("myInput").value

    var span = document.createElement("span");
    span.textContent = '✖';
    span.className = "close";
    span.addEventListener("click", delete_item, li);

    li.className = 'listItem';

    li.appendChild(span);

    document.getElementById("myUL").appendChild(li);

    document.getElementById("myInput").value = "";
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

    document.getElementById("butDecide").disabled = myUL.children.length == 0;
}

async function decide(options) {
    sessionStorage.setItem('options', JSON.stringify(getOptions()));

    window.location.href = "result.html";
}

function cont() {
    var url = new URL("http:/www.google.com");

    url.searchParams.append('ti', document.getElementById("titleInput").value);

    var optionsArray = getOptions();

    optionsArray.forEach(item =>
        url.searchParams.append('op', item));

    window.location.href = "items.html" + url.search;
}


async function getBlockChainData() {
    const response = await fetch('https://api.blockcypher.com/v1/eth/main');
    const myJson = await response.json(); //extract JSON from the http response

    return myJson;
}


function titleFocus() {
    console.log("titleFocus")

    document.getElementById("titleInput").setAttribute('placeholder', '');
}

function titleBlur() {
    console.log("titleBlur")
    document.getElementById("titleInput").setAttribute('placeholder', 'title');
}