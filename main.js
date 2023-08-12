//
// Smart-Contract Link
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

async function applyForLoan(loanAmount, dueDate, repaymentMethod, loanType, numGuarantors) {
    const accounts = await web3.eth.getAccounts();
    const borrowerAddress = accounts[0];

    await microEtherContract.methods.applyForLoan(loanAmount, dueDate, repaymentMethod, loanType, numGuarantors)
    .send({ from: borrowerAddress })
    .on("receipt", (receipt) => {
        console.log("Loan applied successfully!", receipt);
    })
    .on("error", (error) => {
        console.error("There was an error applying for the loan:", error);
    });
}

async function repayLoan(loanId, amount) {
    const accounts = await web3.eth.getAccounts();
    const borrowerAddress = accounts[0];

    await microEtherContract.methods.repayLoan(loanId)
    .send({ from: borrowerAddress, value: web3.utils.toWei(amount, 'ether') })
    .on("receipt", (receipt) => {
        console.log("Loan repaid successfully!", receipt);
    })
    .on("error", (error) => {
        console.error("There was an error repaying the loan:", error);
    });
}

async function vouchForLoan(loanId) {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];

    await microEtherContract.methods.vouchForLoan(loanId)
    .send({ from: userAddress })
    .on("receipt", (receipt) => {
        console.log("Vouched for loan successfully!", receipt);
    })
    .on("error", (error) => {
        console.error("There was an error vouching for the loan:", error);
    });
}
