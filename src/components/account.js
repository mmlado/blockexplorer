import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBalance } from "../util/interact";
import { Utils } from 'alchemy-sdk'
import { Detail } from "./common";


export const Account = () => {
    const { id } = useParams();

    const [balance, setBalance] = useState();

    useEffect(() => {
        async function checkBalance() {
            setBalance(await getBalance(id));
        }
        checkBalance()
    }, [id]);

    return <>
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 24,
            fontSize: 24,
        }}>
            <b>Account Details</b>
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 24,
            fontSize: 24,
        }}>
            <div>{id}</div>
        </div>
        <Detail name={"Address"} value={id} />
        <Detail name={"Balance"} value={balance ? Utils.formatEther(balance).toString() + " Ether" : 0} />
    </>;
}