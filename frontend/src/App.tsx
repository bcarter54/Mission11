import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BooksPage from './pages/BooksPage';
import BuyPage from './pages/BuyPage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
    <CartProvider>
      <Router>
      <Routes>
        <Route path='/' element={<BooksPage />} />
        <Route path='/books' element={<BooksPage />}/>
        <Route path="/buy/:title/:bookId/:price"
        element={<BuyPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
      </Router>
    </CartProvider>
    
    </>
  );
}

export default App;
