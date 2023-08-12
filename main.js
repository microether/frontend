//
// Place any custom JS here
//
if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
    const web3 = new Web3(window.ethereum || window.web3.currentProvider);
} else {
    console.log('You need an Ethereum wallet like MetaMask to interact with this site.');
}

async function requestAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
}

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [...];  // Your contract's ABI

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getPoolBalance() {
    const balance = await contract.methods.poolBalance().call();
    console.log("Pool Balance:", balance);
}

async function depositToPool(amount) {
    const senderAddress = await requestAccount();
    await contract.methods.deposit(amount).send({ from: senderAddress });
}
