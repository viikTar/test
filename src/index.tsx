import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './components/UI/Layout';
import SearchPage from './components/SearchPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Layout>
    <SearchPage />
  </Layout>
);
