import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import PaginaCadastro from './pages/PaginaCadastro';
import PaginaConsulta from './pages/PaginaConsulta';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/cadastro" element={<PaginaCadastro />}></Route>
        <Route path="/" element={<PaginaConsulta />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
