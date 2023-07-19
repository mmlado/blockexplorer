import { Alchemy, Network } from 'alchemy-sdk';
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
