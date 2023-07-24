import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { transactionReciept } from '../util/interact';
import { Detail } from './common';
import { Utils } from 'alchemy-sdk';

export const TransactionDetails = () => {
    const { id } = useParams();

    const [reciept, setReciept] = useState();

    useEffect(() => {
        async function getReciept() {
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
                display: "flex",
                justifyContent: "center",
                marginTop: 24,
                fontSize: 24,
            }}>
                <b>Transaction Details</b>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 24,
                fontSize: 24,
            }}>
                <div>{id}</div>
            </div>
            <Detail name={"Hash"} value={reciept.transactionHash} />
            <Detail name={"Block Number"} value={reciept.blockNumber} link={`/${reciept.blockNumber}`} />
            <Detail name={"From"} value={reciept.from} link={`/account/${reciept.from}`} />
            <Detail name={"To"} value={reciept.to} link={`/account/${reciept.to}`} />
            <Detail name={"Confirmations"} value={reciept.confirmations} />
            <Detail name={"Transaction fee"} value={Utils.formatEther(reciept.gasUsed).toString()} />
            <Detail name={"Status"} value={reciept.status ? 'success' : 'failed'} />
        </>
}
