import { useParams } from 'react-router-dom';

export const TransactionDetails = () => {
    const { id } = useParams();
    console.log(id);
    return <>
        {id}
    </>
}
