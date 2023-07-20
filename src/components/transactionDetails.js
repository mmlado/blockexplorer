import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { transactionReciept } from '../util/interact';

export const TransactionDetails = () => {
    const { id } = useParams();

    const [reciept, setReciept] = useState();

    useEffect(() => {
        async function getReciept() {
            const result = await transactionReciept(id);
            console.log(result);
            setReciept(await transactionReciept(id));

        }
        getReciept(id)
    }, [id]);

    if (reciept === undefined)
        return <>
            Loading...
        </>
    else
    return <>
        <div style={{
            display:"flex", 
            justifyContent:"center", 
            marginTop: 24, 
            fontSize: 24,
        }}>
            <b>Transaction Details</b>
        </div>
        <div style={{
            display:"flex", 
            justifyContent:"center", 
            marginTop: 24, 
            fontSize: 24,
        }}>
            <div>{id}</div>
        </div>
        <table className="Reciept">
            <tbody>
                <tr>
                    <td>Hash</td>
                    <td>{reciept.transactionHash}</td>
                </tr>
                <tr>
                    <td>Block Number</td>
                    <td><Link to={`/${reciept.blockNumber}`}>{reciept.blockNumber}</Link></td>
                </tr>
                <tr>
                    <td>From</td>
                    <td>{reciept.from}</td>
                </tr>
                <tr>
                    <td>To</td>
                    <td>{reciept.to}</td>
                </tr>
                <tr>
                    <td>Confirmations</td>
                    <td>{reciept.confirmations}</td>
                </tr>
                <tr>
                    <td>Transaction fee</td>
                    <td>{reciept.gasUsed.number}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>{reciept.status ? 'success' : 'failed'}</td>
                </tr>
            </tbody>
        </table>
    </>
}
