import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, Search } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Productr</h2>
      </div>
      <div className="sidebar-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search Services, Products" />
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'} end>
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/products" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <ShoppingBag size={20} />
          <span>Products</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
