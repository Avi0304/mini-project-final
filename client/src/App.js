// import "antd/dist/antd.min.css";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ItemPage from './pages/ItemPage';
import Resigter from './pages/Resigter';
import Login from './pages/Login';
// import NavBar from './components/NavBar'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs';
import BookTable from './pages/BookTable';
import Menu from './pages/Menu'
import AdminBookTable from './pages/AdminBookTable';
import FeedBack from './pages/FeedBack';
import AdminOrder from './pages/AdminOrder';
import Payment from './pages/Payment';
import Success from './components/Success';
import Cancel from './components/Cancel';
import ShoppingCart from './pages/ShoppingCart';
import LoginModal from './components/LoginModal';
import RegistraterModal from './components/RegistraterModal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<ProtectedRoute><Homepage/></ProtectedRoute>} />
        <Route path="/admin/item" element={<ProtectedRoute><ItemPage/></ProtectedRoute>} />
        <Route path="/admin/table" element={<ProtectedRoute><AdminBookTable/></ProtectedRoute>} />
        <Route path="/admin/order" element={<ProtectedRoute><AdminOrder/></ProtectedRoute>} />
        <Route path="/admin/feedback" element={<ProtectedRoute><FeedBack/></ProtectedRoute>} />
        <Route path="/admin/login" element={<Login/>} />
        <Route path="/admin/register" element={<Resigter/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/book" element={<BookTable/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/cart" element={<ShoppingCart/>} />
        <Route path="/loginweb" element={<LoginModal/>} />
        <Route path="/registerweb" element={<RegistraterModal/>} />
        <Route path="/payment/page" element={<Payment/>}/>
        <Route path="/sucess" element={<Success/>}/>
        <Route path="/cancel" element={<Cancel/>}/>
      </Routes>
    </Router>
        
    
  );
}

export default App;

export function ProtectedRoute({children}){
  const token = localStorage.getItem('token');
  if(token){
    return children;
  }
  else{
    return <Navigate to="/admin/login" />;
  }
}
