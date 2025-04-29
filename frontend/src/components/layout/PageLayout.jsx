import React from 'react';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import '../../assets/styles/base/_globals.css';

function PageLayout({ children, pageTitle }) {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-main">
        <div className="layout-page">
          <Header pageTitle={pageTitle} />
          <div className="layout-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageLayout;