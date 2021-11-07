var options_results = [];



async function decide() {
    const url = new URL(location.href);
    const title = url.searchParams.get("ti");
    const options = url.searchParams.getAll("op");

    document.getElementById("titleInput").textContent = title;

    /* options.forEach(item => {
         var li = document.createElement("li");

         li.innerHTML = item;
         //li.className = 'listItem';

         document.getElementById("myUL").appendChild(li);
     });*/

    document.getElementById("textResult").textContent = "Esperando por el próximo bloque...";


    myJson = await getBlockChainData();
    var startHash = myJson.hash;
    var myJson;

    console.log(myJson.hash);
    console.log(myJson.time);


    do {
        myJson = await getBlockChainData();
        await sleep(1000);
    } while (myJson.hash == startHash);

    console.log(myJson.hash);
    console.log(myJson.time);

    let eth_hash = myJson.hash;
    let eth_hash_value = parseInt(eth_hash, 16);

    for (var i = 0; i < options.length; i++) {
        let option = {
            "option": options[i],
            "hash_value": parseInt(sha3_256(options[i] + eth_hash), 16),
            "dif": 0
        };

        option.dif = Math.abs(eth_hash_value - option.hash_value);

        options_results.push(option);
    }

    document.getElementById("textResult").textContent = "Result:";


    print_results(options_results);
}

function print_results(options_results) {
    options_results.sort((a, b) => {
        return a.dif - b.dif;
    });

    for (var i = 0; i < options_results.length; i++) {

        var li = document.createElement("li");

        li.innerHTML = options_results[i].option;

        document.getElementById("myUL").appendChild(li);
    }
}

async function getBlockChainData() {
    const response = await fetch('https://api.blockcypher.com/v1/eth/main');
    const myJson = await response.json(); //extract JSON from the http response

    return myJson;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}