import { Routes, Route } from 'react-router-dom';
import {Transactions} from './components/transactions';
import { TransactionDetails } from './components/transactionDetails';

import './App.css';

function App() {
  return <div className="App">
    <Routes>
    <Route path="/:id" element={<Transactions />} /> 
    <Route path="/transaction/:id" element={<TransactionDetails />} />
    </Routes>
  </div>;
}

export default App;
