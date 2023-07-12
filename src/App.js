import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';


import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockTransactions, setBlockTransactions] = useState([]);

  useEffect(() => {
    async function getBlockNumber() {
      if (!blockNumber) {
        setBlockNumber(await alchemy.core.getBlockNumber());
      }
    }

    getBlockNumber();
  });

  useEffect(() => {
    async function getTransactions() {
        const { transactions } = await alchemy.core.getBlockWithTransactions(blockNumber)
        setBlockTransactions(transactions);
    }
    getTransactions();
  }, [blockNumber]);

  const previousBlock = () => {
    const actualBlocknumber = blockNumber - 1 < 0 ? 0 : blockNumber - 1 
    setBlockNumber(actualBlocknumber)
  }

  const nextBlock = () => {
    const actualBlocknumber = blockNumber + 1 
    setBlockNumber(actualBlocknumber)
  }

  const substring = (value, index) => {
    if (value.lenght < index) {
      return value;
    }
    return value.substring(0, index) + '...';
  }

  const calculateFee = (limit, price, toFixed) => {
    const gasFee = limit * price;

    if(gasFee.toString() === "NaN") {
      return "0";
    }
    
    return parseFloat(Utils.formatEther(gasFee.toString())).toFixed(toFixed);
  }

  const Block = () => {
    return (
      <>
        <div style={{
            display:"flex", 
            justifyContent:"center", 
            marginTop: 24, 
            fontSize: 24,
          }}>
          <b>Block Details</b>
        </div>
        <div style={{display:"flex", justifyContent: "center", marginTop: 24}}>
          <button style={{marginRight: 24}} onClick={() => previousBlock()}>Previous Block</button>
          <p>{` Block Number: ${blockNumber} `}</p>
          <button style={{marginLeft: 24}}onClick={() => nextBlock()}>Next Block</button>
        </div>
      </>
    );
  }

  const Transactions = () => {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Transaction Hash</th>
              <th>Block</th>
              <th>From</th>
              <th>To</th>
              <th>Confirmations</th>
              <th>Value</th>
              <th>Transaction Fee</th>
            </tr>
          </thead>
          <tbody>
            {blockTransactions.map(transaction => {
              return (
                <tr key={transaction.hash}>
                  <td >{substring(transaction.hash, 32)}</td>
                  <td>{transaction.blockNumber}</td>
                  <td>{transaction.from}</td>
                  <td>{transaction.to}</td>
                  <td>{transaction.confirmations}</td>
                  <td>{Utils.formatEther(transaction.value.toString())}</td>
                  <td>{calculateFee(transaction.gasLimit, transaction.gasPrice, 6)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    );
  }


  return <div className="App">
    <Block />
    <Transactions />
  </div>;
}

export default App;
