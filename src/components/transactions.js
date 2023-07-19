import { Link } from 'react-router-dom';
import { Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import { currentBlockNumber, transactionList } from '../util/interact';

export const Transactions = () => {
    const [blockNumber, setBlockNumber] = useState();
    const [blockTransactions, setBlockTransactions] = useState([]);
  
    useEffect(() => {
      async function getBlockNumber() {
        if (!blockNumber) {
          setBlockNumber(await currentBlockNumber());
        }
      }
  
      getBlockNumber();
    });
  
    useEffect(() => {
      async function getTransactions() {
          if (blockNumber === undefined) {
            return;
          }
          const transactions = await transactionList(blockNumber);
          setBlockTransactions(transactions);
      }
      getTransactions();
    }, [blockNumber]);
  
    const previousBlock = () => {
      const actualBlocknumber = blockNumber - 1 < 0 ? 0 : blockNumber - 1 
      setBlockNumber(actualBlocknumber)
    }
  
    const nextBlock = async () => {
      const actualBlocknumber = blockNumber + 1 > await currentBlockNumber(blockNumber) ? blockNumber : blockNumber + 1; 
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
  
    const TransactionsLocal = () => {
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
                    <td ><Link to={`/transaction/${transaction.hash}`}>{substring(transaction.hash, 32)}</Link></td>
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
        <TransactionsLocal />
    </div>;
}
