# blockchain-decider

Let the blockchain decide for you. 

## How does it work?

1. Wait for the ethereum blockchain to generate a new block.
2. The hash of the new block is concatenated with each option generating a "hash-option".
3. A new hash of each "hash-option" is generated with the sha3_256 algorithm.
4. Finally, these hashes are ordered in order of proximity to the block's hash.

## Used libs
* https://github.com/ethers-io/ethers.js
* https://github.com/emn178/js-sha3
