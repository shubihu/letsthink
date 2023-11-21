import React, { useEffect, useState } from 'react';

import '../css/welcome.css';

const WelcomePage = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.toLocaleString('en-US', { month: 'short' });
  const currentDay = now.getDate();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}:${seconds}`;

  return (
    <div className="welcome-page">
      <div className="card">
        <div className="date-time-container">
          <time className="date-time">
            <span>{currentYear}</span>
            <span className="separator"></span>
            <span>{currentMonth} {currentDay}</span>
          </time>
        </div>
        <div className="card-content">
          <div className="infos">
            <a href="#">
              <span className="title">
                欢迎来到 Let's think 小破站
              </span>
            </a>
            <p className="description">
              这是使用 React 和 Fastapi 开发的示例程序, 仅作为学习使用。
            </p>
            <p className="description">
            服务器是薅的微软家的(1核1G, 新用户第一年免费), 域名是薅的硅云家的(新用户第一年免费), Logo是使用的是企鹅家的AIDesign免费设计的, 
            ssl证书是腾讯云提供一年免费证书, cdn是使用cloudflare的免费计划。
            所以这个网站整体就是免费薅来的, 后续嘛, 来日方长就先不考虑了, 薅完当下再说。
            </p>
          </div>
          <a className="action" href="https://github.com/shubihu/letsthink.git">
            开源地址: https://github.com/shubihu/letsthink.git
          </a>
        </div>
      </div>
      
      <div className="face">
        <p className="v-index">II</p>
        <p className="h-index">II</p>
        <div className="hand">
            <div className="hour" style={{ '--initial-rotation': `${getRotation(currentTime, 'hours')}deg` }}></div>
            <div className="minute" style={{ '--initial-rotation': `${getRotation(currentTime, 'minutes')}deg` }}></div>
            <div className="second" style={{ '--initial-rotation': `${getRotation(currentTime, 'seconds')}deg` }}></div>
        </div>
      </div>
    </div>
  );
};

const getRotation = (time, unit) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  let rotation = 0;
  switch (unit) {
    case 'hours':
      rotation = (hours % 12) * 30 + minutes * 0.5;
      break;
    case 'minutes':
      rotation = minutes * 6 + seconds * 0.1;
      break;
    case 'seconds':
      rotation = seconds * 6;
      break;
    default:
      break;
  }
  return rotation;
};


export default WelcomePage;
