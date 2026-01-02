import { Routes, Route } from 'react-router-dom';
import './App.css';
import ProductList from './app/pages/ProductList';
import ProductDetail from './app/pages/ProductDetail';
import Favorites from './app/pages/Favorites';

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <main className="p-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
