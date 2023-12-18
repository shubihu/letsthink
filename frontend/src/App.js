import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useCustomTranslation } from './assets/useCustomTranslation';
import './css/App.css';

import logo from './logo.png';
import wechat from './wechat.jpg'

import WelcomePage from './pages/Welcome';
import ChatApp from './pages/Chat';
import Monitor from './pages/Monitor';
import ThreedmolDemo from './pages/3dmolExample';
import KnowledgeGraph from './pages/KGGraph';
// import HousePrice from './pages/housePrice';

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
          <li key={child.id} className={selectedItem === child.id ? 'selected' : ''} >
            <NavLink to={`/${parent.title}/${child.title}`} activeclassname="selected" onClick={() => setSelectedItem(child.id)}>
              {child.content}
            </NavLink>
          </li>
        ))}
    </>
  );
}

function App() {
  const { t, toggleI18n } = useCustomTranslation();
  const [selectedItem, setSelectedItem] = useState(null);
  const sidebarData = [
    {
      id: 1,
      title: t('nav-example'),
      children: [
        { id: 1, title: 'monitor', content: t('monitor-content') },
        { id: 2, title: 'chat', content: t('chat-content') },
        { id: 3, title: 'kg', content: t('kg-content') },
        { id: 4, title: '3dmol', content: t('3dmol-content') },
        // { id: 5, title: 'house-price', content: '房价' },
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
              <svg t="1700744641498" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7175"><path d="M554.666667 512a42.666667 42.666667 0 0 1 42.666666 42.666667v21.333333a42.666667 42.666667 0 1 1-85.333333 0V554.666667a42.666667 42.666667 0 0 1 42.666667-42.666667zM725.333333 512a42.666667 42.666667 0 0 1 42.666667 42.666667v21.333333a42.666667 42.666667 0 1 1-85.333333 0V554.666667a42.666667 42.666667 0 0 1 42.666666-42.666667z" fill="#75C82B" p-id="7176"></path><path d="M298.666667 597.333333a298.666667 298.666667 0 0 1 298.666666-298.666666h85.333334a298.666667 298.666667 0 0 1 243.242666 472.021333l12.416 98.645333a42.666667 42.666667 0 0 1-53.845333 46.421334l-115.541333-32.426667A298.581333 298.581333 0 0 1 682.666667 896h-85.333334a298.666667 298.666667 0 0 1-298.666666-298.666667z m298.666666-213.333333a213.333333 213.333333 0 0 0 0 426.666667h85.333334c25.002667 0 48.938667-4.266667 71.125333-12.117334a42.666667 42.666667 0 0 1 25.728-0.853333l66.133333 18.517333-6.570666-52.181333a42.666667 42.666667 0 0 1 9.216-32.213333A213.333333 213.333333 0 0 0 682.666667 384h-85.333334z" fill="#75C82B" p-id="7177"></path><path d="M42.666667 448A362.666667 362.666667 0 0 1 405.333333 85.333333h128a361.856 361.856 0 0 1 270.293334 120.874667 42.666667 42.666667 0 0 1-63.573334 56.917333A276.522667 276.522667 0 0 0 533.333333 170.666667h-128a277.333333 277.333333 0 0 0-184.874666 484.053333 42.666667 42.666667 0 0 1 13.610666 39.04l-9.301333 54.058667 39.168-12.970667a42.666667 42.666667 0 1 1 26.794667 81.066667l-106.666667 35.242666a42.666667 42.666667 0 0 1-55.466667-47.701333l17.493334-101.802667A361.6 361.6 0 0 1 42.666667 448z" fill="#75C82B" p-id="7178"></path></svg>
              <img src={wechat} className="hover-image" />
              <span className="name">{t('wechat')}</span>
            </a>
            <a href="https://github.com/shubihu" target="_blank" rel="noopener noreferrer">
              <svg t="1700733463304" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7687" ><path d="M64 512c0 195.2 124.8 361.6 300.8 422.4 22.4 6.4 19.2-9.6 19.2-22.4v-76.8c-134.4 16-140.8-73.6-150.4-89.6-19.2-32-60.8-38.4-48-54.4 32-16 64 3.2 99.2 57.6 25.6 38.4 76.8 32 105.6 25.6 6.4-22.4 19.2-44.8 35.2-60.8-144-22.4-201.6-108.8-201.6-211.2 0-48 16-96 48-131.2-22.4-60.8 0-115.2 3.2-121.6 57.6-6.4 118.4 41.6 124.8 44.8 32-9.6 70.4-12.8 112-12.8 41.6 0 80 6.4 112 12.8 12.8-9.6 67.2-48 121.6-44.8 3.2 6.4 25.6 57.6 6.4 118.4 32 38.4 48 83.2 48 131.2 0 102.4-57.6 188.8-201.6 214.4 22.4 22.4 38.4 54.4 38.4 92.8v112c0 9.6 0 19.2 16 19.2C832 876.8 960 710.4 960 512c0-246.4-201.6-448-448-448S64 265.6 64 512z" fill="#040000" p-id="7688"></path></svg>
              <span className="name">Github</span>
            </a>
            <a href="https://shubihu.github.io" target="_blank" rel="noopener noreferrer">
              <svg t="1700732954043" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4067"><path d="M708.778667 725.333333H358.229333C325.333333 725.333333 298.666667 696.149333 298.666667 661.333333c0-35.2 26.666667-64 59.562666-64h350.549334c32.554667 0 59.221333 28.8 59.221333 64 0 34.816-26.666667 64-59.221333 64M359.68 298.666667h176.64c33.706667 0 61.013333 28.714667 61.013333 63.829333S570.026667 426.666667 536.32 426.666667H359.68C325.973333 426.666667 298.666667 397.610667 298.666667 362.496S325.973333 298.666667 359.68 298.666667m639.274667 107.178666c-20.693333-8.490667-109.568 0.938667-134.229334-20.394666-17.450667-15.36-18.56-43.178667-25.344-80.298667-11.392-62.122667-16.128-76.202667-27.989333-100.693333C768.298667 117.333333 665.045333 42.666667 571.178667 42.666667H353.621333C182.528 42.666667 42.666667 176.298667 42.666667 339.328v345.941333C42.666667 848.042667 182.485333 981.333333 353.621333 981.333333h357.418667c171.093333 0 310.016-133.290667 310.997333-296.064L1024 445.696s0-29.653333-25.045333-39.850667" fill="#FF6500" p-id="4068"></path></svg>
              <span className="name">Blog</span>
            </a> 
            <a href="https://search.letsthink.top" target="_blank" rel="noopener noreferrer">
              <svg t="1702701785504" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4241" width="200" height="200"><path d="M214.101333 512c0-32.512 5.546667-63.701333 15.36-92.928L57.173333 290.218667A491.861333 491.861333 0 0 0 4.693333 512c0 79.701333 18.858667 154.88 52.394667 221.610667l172.202667-129.066667A290.56 290.56 0 0 1 214.101333 512" fill="#FBBC05" p-id="4242"></path><path d="M516.693333 216.192c72.106667 0 137.258667 25.002667 188.458667 65.962667L854.101333 136.533333C763.349333 59.178667 646.997333 11.392 516.693333 11.392c-202.325333 0-376.234667 113.28-459.52 278.826667l172.373334 128.853333c39.68-118.016 152.832-202.88 287.146666-202.88" fill="#EA4335" p-id="4243"></path><path d="M516.693333 807.808c-134.357333 0-247.509333-84.864-287.232-202.88l-172.288 128.853333c83.242667 165.546667 257.152 278.826667 459.52 278.826667 124.842667 0 244.053333-43.392 333.568-124.757333l-163.584-123.818667c-46.122667 28.458667-104.234667 43.776-170.026666 43.776" fill="#34A853" p-id="4244"></path><path d="M1005.397333 512c0-29.568-4.693333-61.44-11.648-91.008H516.650667V614.4h274.602666c-13.696 65.962667-51.072 116.650667-104.533333 149.632l163.541333 123.818667c93.994667-85.418667 155.136-212.650667 155.136-375.850667" fill="#4285F4" p-id="4245"></path></svg>
              <span className="name">{t('google')}</span>
            </a>
            <a href="https://search.letsthink.top/scholar/?hl=zh-CN" target="_blank" rel="noopener noreferrer">
              <svg t="1702702853776" class="icon" viewBox="0 0 1081 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6139" width="200" height="200"><path d="M1080.888889 430.478222l-512-373.646222L56.888889 430.478222 145.92 495.502222l0 528.440889L234.951111 1023.943111 234.951111 560.526222 568.888889 804.181333 1080.888889 430.478222zM546.588444 848.099556l0 14.961778-261.063111-170.325333-6.030222 111.445333 267.093333 175.843556 44.544 0 0-122.993778 0-8.874667L546.588444 848.156444zM591.189333 856.974222l1.536 122.993778 265.557333-189.383111-6.030222-118.328889L591.189333 856.974222z" fill="#d42379" p-id="6140"></path></svg>
              <span className="name">{t('google-scholar')}</span>
            </a>           
          </div>
          <div className="toggle-button-cover">
            <div id="button-3" className="button r">
              <input className="checkbox" type="checkbox" onClick={toggleI18n}/>
              <div className="knobs"></div>
              <div className="layer"></div>
            </div>
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
              <Route path="/:parentTitle/kg" element={<KnowledgeGraph />} />
              {/* <Route path="/:parentTitle/house-price" element={<HousePrice ak="WgcPXt9NMPLbwUGNBaGGX0NhNHYXbhM8"/>} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;


