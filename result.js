var options_results = [];

async function decide() {
    var obj = JSON.parse(sessionStorage.options);


    myJson = await getBlockChainData();
    var start = new Date(myJson.time);
    var dif = 0;
    var myJson;

    do {

        myJson = await getBlockChainData();
        dif = start - new Date(myJson.time);
        await sleep(1000);
        console.log(dif);

    } while (dif >= 0);

    let eth_hash = myJson.hash;
    let eth_hash_value = parseInt(eth_hash, 16);

    for (var i = 0; i < obj.length; i++) {
        let option = {
            "option": obj[i],
            "hash_value": parseInt(sha3_256(obj[i] + eth_hash), 16),
            "dif": 0
        };

        option.dif = Math.abs(eth_hash_value - option.hash_value);

        options_results.push(option)
    }

    print_results(options_results);
}

function print_results(options_results) {
    options_results.sort((a, b) => {
        return a.dif - b.dif;
    });

    for (var i = 0; i < options_results.length; i++) {

        var li = document.createElement("li");

        li.innerHTML = options_results[i].option + ' ' + options_results[i].dif;

        document.getElementById("result").appendChild(li);
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