import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import axios from 'axios';
import { Package, CheckCircle, Clock } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ total: 0, published: 0, unpublished: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/products');
        const products = res.data;
        
        const published = products.filter(p => p.status === 'published').length;
        const unpublished = products.filter(p => p.status === 'unpublished').length;
        
        setStats({
          total: products.length,
          published,
          unpublished
        });
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-container">
          <div className="dashboard-header">
            <h1>Welcome, {user?.name || 'User'}!</h1>
            <p>Here is what's happening with your store today.</p>
          </div>
          
          <div className="store-status-banner">
            <div className="status-content">
              <h3>Your store is live here: <a href="https://store.productr.com/my-store" target="_blank" rel="noreferrer">store.productr.com/my-store</a></h3>
              <p>Connecting store anytime anywhere.</p>
            </div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper blue">
                <Package size={24} />
              </div>
              <div className="stat-info">
                <h3>Total Products</h3>
                {loading ? <div className="skeleton-text"></div> : <h2>{stats.total}</h2>}
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-wrapper green">
                <CheckCircle size={24} />
              </div>
              <div className="stat-info">
                <h3>Published</h3>
                {loading ? <div className="skeleton-text"></div> : <h2>{stats.published}</h2>}
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-wrapper orange">
                <Clock size={24} />
              </div>
              <div className="stat-info">
                <h3>Unpublished</h3>
                {loading ? <div className="skeleton-text"></div> : <h2>{stats.unpublished}</h2>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
