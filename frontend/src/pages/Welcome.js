import React, { useEffect, useState } from 'react';
import { useCustomTranslation } from '../assets/useCustomTranslation';

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

  const { t } = useCustomTranslation();

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
                {t('welcome-title')}
              </span>
            </a>
            <p className="description">
              {t('welcome-des1')}
            </p>
            <p className="description">
              {t('welcome-des2')}
            </p>
          </div>
          <a className="action" href="https://github.com/shubihu/letsthink.git">
              {t('openSource')}
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
