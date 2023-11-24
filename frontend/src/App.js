import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import './css/App.css';

import logo from './logo.png';
import wechat from './wechat.jpg'

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
          <div className="link-container">
            <a>
              <svg t="1700744641498" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7175"><path d="M554.666667 512a42.666667 42.666667 0 0 1 42.666666 42.666667v21.333333a42.666667 42.666667 0 1 1-85.333333 0V554.666667a42.666667 42.666667 0 0 1 42.666667-42.666667zM725.333333 512a42.666667 42.666667 0 0 1 42.666667 42.666667v21.333333a42.666667 42.666667 0 1 1-85.333333 0V554.666667a42.666667 42.666667 0 0 1 42.666666-42.666667z" fill="#75C82B" p-id="7176"></path><path d="M298.666667 597.333333a298.666667 298.666667 0 0 1 298.666666-298.666666h85.333334a298.666667 298.666667 0 0 1 243.242666 472.021333l12.416 98.645333a42.666667 42.666667 0 0 1-53.845333 46.421334l-115.541333-32.426667A298.581333 298.581333 0 0 1 682.666667 896h-85.333334a298.666667 298.666667 0 0 1-298.666666-298.666667z m298.666666-213.333333a213.333333 213.333333 0 0 0 0 426.666667h85.333334c25.002667 0 48.938667-4.266667 71.125333-12.117334a42.666667 42.666667 0 0 1 25.728-0.853333l66.133333 18.517333-6.570666-52.181333a42.666667 42.666667 0 0 1 9.216-32.213333A213.333333 213.333333 0 0 0 682.666667 384h-85.333334z" fill="#75C82B" p-id="7177"></path><path d="M42.666667 448A362.666667 362.666667 0 0 1 405.333333 85.333333h128a361.856 361.856 0 0 1 270.293334 120.874667 42.666667 42.666667 0 0 1-63.573334 56.917333A276.522667 276.522667 0 0 0 533.333333 170.666667h-128a277.333333 277.333333 0 0 0-184.874666 484.053333 42.666667 42.666667 0 0 1 13.610666 39.04l-9.301333 54.058667 39.168-12.970667a42.666667 42.666667 0 1 1 26.794667 81.066667l-106.666667 35.242666a42.666667 42.666667 0 0 1-55.466667-47.701333l17.493334-101.802667A361.6 361.6 0 0 1 42.666667 448z" fill="#75C82B" p-id="7178"></path></svg>
              <img src={wechat} class="hover-image" />
            </a>
            <a href="https://github.com/shubihu" target="_blank" rel="noopener noreferrer">
              <svg t="1700733463304" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7687" ><path d="M64 512c0 195.2 124.8 361.6 300.8 422.4 22.4 6.4 19.2-9.6 19.2-22.4v-76.8c-134.4 16-140.8-73.6-150.4-89.6-19.2-32-60.8-38.4-48-54.4 32-16 64 3.2 99.2 57.6 25.6 38.4 76.8 32 105.6 25.6 6.4-22.4 19.2-44.8 35.2-60.8-144-22.4-201.6-108.8-201.6-211.2 0-48 16-96 48-131.2-22.4-60.8 0-115.2 3.2-121.6 57.6-6.4 118.4 41.6 124.8 44.8 32-9.6 70.4-12.8 112-12.8 41.6 0 80 6.4 112 12.8 12.8-9.6 67.2-48 121.6-44.8 3.2 6.4 25.6 57.6 6.4 118.4 32 38.4 48 83.2 48 131.2 0 102.4-57.6 188.8-201.6 214.4 22.4 22.4 38.4 54.4 38.4 92.8v112c0 9.6 0 19.2 16 19.2C832 876.8 960 710.4 960 512c0-246.4-201.6-448-448-448S64 265.6 64 512z" fill="#040000" p-id="7688"></path></svg>
            </a>
            <a href="https://shubihu.github.io" target="_blank" rel="noopener noreferrer">
              <svg t="1700732954043" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4067"><path d="M708.778667 725.333333H358.229333C325.333333 725.333333 298.666667 696.149333 298.666667 661.333333c0-35.2 26.666667-64 59.562666-64h350.549334c32.554667 0 59.221333 28.8 59.221333 64 0 34.816-26.666667 64-59.221333 64M359.68 298.666667h176.64c33.706667 0 61.013333 28.714667 61.013333 63.829333S570.026667 426.666667 536.32 426.666667H359.68C325.973333 426.666667 298.666667 397.610667 298.666667 362.496S325.973333 298.666667 359.68 298.666667m639.274667 107.178666c-20.693333-8.490667-109.568 0.938667-134.229334-20.394666-17.450667-15.36-18.56-43.178667-25.344-80.298667-11.392-62.122667-16.128-76.202667-27.989333-100.693333C768.298667 117.333333 665.045333 42.666667 571.178667 42.666667H353.621333C182.528 42.666667 42.666667 176.298667 42.666667 339.328v345.941333C42.666667 848.042667 182.485333 981.333333 353.621333 981.333333h357.418667c171.093333 0 310.016-133.290667 310.997333-296.064L1024 445.696s0-29.653333-25.045333-39.850667" fill="#FF6500" p-id="4068"></path></svg>
            </a>
            
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


