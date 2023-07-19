import { Routes, Route } from 'react-router-dom';
import {Transactions} from './components/transactions';

import './App.css';

function App() {
  return <div className="App">
    <Routes>
    <Route path="/" element={<Transactions />} /> 
    </Routes>
  </div>;
}

export default App;
