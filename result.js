var options_results = [];



async function decide() {
    const url = new URL(location.href);
    const title = url.searchParams.get("ti");
    const options = url.searchParams.getAll("op");

    document.getElementById("titleInput").textContent = title;

    const myJson = await getLastestEthBlockV2();

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
    var audio = document.getElementById('audio');
    var source = document.getElementById('audioSource');
    source.src = "celebration.ogg";
    audio.load(); //call this to just preload the audio without playing
    audio.play(); //call this to play the song right away

    options_results.sort((a, b) => {
        return a.dif - b.dif;
    });

    for (var i = 0; i < options_results.length; i++) {

        var li = document.createElement("li");

        li.innerHTML = options_results[i].option;
        li.classList = "result";
        document.getElementById("myUL").appendChild(li);
    }
}

async function getBlockChainData() {
    const response = await fetch('https://api.blockcypher.com/v1/eth/main', {
        'mode': 'no-cors',
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    });
    const myJson = await response.json(); //extract JSON from the http response

    return myJson;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function getLastestEthBlock() {
    myJson = await getBlockChainData();
    var startHash = myJson.hash;
    var myJson;

    do {
        myJson = await getBlockChainData();
        await sleep(1000);
    } while (myJson.hash == startHash);
}

async function getLastestEthBlockV2() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const lastBockNUmber = await provider.getBlockNumber();

    let proxBlockNumber;
    let i = 0;

    do {
        document.getElementById("textResult").textContent = "Esperando por el próximo bloque " + (i % 2 == 0 ? "☺" : "☻");
        "(งツ)ว"
        "(วツ)ง"
        proxBlockNumber = await provider.getBlockNumber();
        await sleep(1000);
        i++;
    } while (proxBlockNumber == lastBockNUmber);

    const block = await provider.getBlock(proxBlockNumber);

    return block.hash;
}