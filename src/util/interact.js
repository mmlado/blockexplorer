import { Alchemy, Network, Utils } from 'alchemy-sdk';
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export const transactionList = async (blockNumber) => {
    const { transactions } = await alchemy.core.getBlockWithTransactions(blockNumber);
    return transactions;
}

export const currentBlockNumber = async () => {
    const blockNumber = await alchemy.core.getBlockNumber();
    return blockNumber
}

export const transactionReciept = async (hash) => {
    const reciept = await alchemy.core.getTransactionReceipt(hash);
    return reciept;
}

export const calculateFee = (limit, price, toFixed) => {
    const gasFee = limit * price;

    if (gasFee.toString() === "NaN") {
        return "0";
    }

    return parseFloat(Utils.formatEther(gasFee.toString())).toFixed(toFixed);
}

export const getBalance = async (address) => {
    const balance = await alchemy.core.getBalance(address);
    return balance;
}
