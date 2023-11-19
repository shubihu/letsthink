import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import './css/App.css';

import logo from './logo.png';

import WelcomePage from './pages/Welcome';
import ChatApp from './pages/Chat';
import Monitor from './pages/Monitor';
import ThreedmolDemo from './pages/3dmolExample';

function SidebarItem({ parent, selectedItem, setSelectedItem }) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <li onClick={handleClick}>
        <span>{parent.title}</span>
        <i className={`custom-arrow ${isOpen ? 'open' : ''}`}>
          {isOpen ? <UpOutlined /> : <DownOutlined />}
        </i>
      </li>
      {isOpen &&
        parent.children.map((child) => (
          <li key={child.id} className={selectedItem === child.id ? 'selected' : ''}>
            <NavLink to={`/${parent.title}/${child.title}`} activeclassname="selected" onClick={() => setSelectedItem(child.id)}>
              {child.content}
            </NavLink>
          </li>
        ))}
    </>
  );
}

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const sidebarData = [
    {
      id: 1,
      title: 'Examples',
      children: [
        { id: 1, title: 'monitor', content: 'Monitor System Usage' },
        { id: 2, title: 'chat', content: 'AI Chat' },
        { id: 3, title: '3dmol', content: '3dmol example' },
      ],
      isOpen: true,
    },
  ];

  return (
    <Router>
      <div>
        <header className="top-bar">
          <div className="logo">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" style={{ width: '170px' , height:'60px'}} />
          </Link>
          </div>
        </header>

        <div className="container">
          <div className="sidebar">
            {sidebarData.map((parent) => (
              <div key={parent.id} className="parent-element">
                <ul>
                  <SidebarItem parent={parent} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                </ul>
              </div>
            ))}
          </div>

          <div className="content">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/:parentTitle/3dmol" element={<ThreedmolDemo />} />
              <Route path="/:parentTitle/monitor" element={<Monitor />} />
              <Route path="/:parentTitle/chat" element={<ChatApp />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;


