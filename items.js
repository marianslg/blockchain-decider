const url = new URL(location.href);
const title = url.searchParams.get("ti");
const options = url.searchParams.getAll("op");

document.getElementById("titleInput").textContent = title;

options.forEach(item => {
    var li = document.createElement("li");

    li.innerHTML = item;
    li.className = 'listItem';

    document.getElementById("myUL").appendChild(li);
});

function cont() {
    window.location.href = "result.html" + location.search;
}