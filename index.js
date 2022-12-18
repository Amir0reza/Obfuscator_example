import { Contract, ethers } from "./ethers-5.2.esm.min.js"
import { abi, contractAddress } from "./ConstantsProtected.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const withdrawButton = document.getElementById("withdrawButton")
const getBalanceButton = document.getElementById("getBalanceButton")
const balanceLabel = document.getElementById("balanceLabel")

connectButton.onclick = connect
fundButton.onclick = fund
withdrawButton.onclick = withdraw
getBalanceButton.onclick = getBalance

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }

        const accounts = await ethereum.request({ method: "eth_accounts" })

        connectButton.innerHTML = `Connected with: ${accounts[0]}`
        getBalance()
    } else {
        connectButton.innerHTML = "Please install metamask"
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`Funding with ${ethAmount} ...`)
    if (typeof window.ethereum !== "undefined") {
        // provider / to the blockchain
        // signer of the transaction

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            await listenForTransactionMine(transactionResponse, provider)
            console.log("done!")
            getBalance()
        } catch (error) {
            console.log(error)
            getBalance()
        }
    }
}

async function withdraw() {
    console.log(`Withdawing from the contract ...`)
    if (typeof window.ethereum !== "undefined") {
        // provider / to the blockchain
        // signer of the transaction

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.withdraw()
            await listenForTransactionMine(transactionResponse, provider)
            console.log("done!")
            getBalance()
        } catch (error) {
            console.log(error)
            getBalance()
        }
    }
}

async function getBalance() {
    console.log(`get Balance ...`)
    if (typeof window.ethereum !== "undefined") {
        // provider / to the blockchain
        // signer of the transaction

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        balanceLabel.innerHTML = `Balance is: ${ethers.utils.formatEther(
            balance
        )} ethers`
        console.log(ethers.utils.formatEther(balance))
    }
}

function listenForTransactionMine(transactionResponce, provider) {
    console.log(`Mining ${transactionResponce.hash}`)
    return new Promise((resolve, reject) => {
        provider.once(transactionResponce.hash, (transactionreceipt) => {
            console.log(
                `Completed with ${transactionreceipt.confirmations} confirmations`
            )
            resolve()
        })
    })
    // a listener for blockchain
}
