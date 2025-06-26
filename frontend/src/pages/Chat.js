import React, { useState, useEffect, useRef } from 'react';
import '../css/Chat.css';
import io from 'socket.io-client';
import { useCustomTranslation } from '../assets/useCustomTranslation';
import WS_BACKEND_URL from './config';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const [showThinking, setShowThinking] = useState(false);

  const { t } = useCustomTranslation();

  useEffect(() => {
    // 创建 WebSocket 连接
    socketRef.current = io(WS_BACKEND_URL, {path:'/ws/socket.io', autoConnect: true});
    // 监听 WebSocket 接收到的消息
    socketRef.current.on('response', (message) => {
      const newMessage = {
        id: Date.now(),
        text: message,
        timestamp: new Date().toLocaleTimeString(),
        avatar: 'path_to_avatar_image',
        type: 'ai',
      };

      setShowThinking(false);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // 组件卸载时关闭 WebSocket 连接
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // 在 messages 更新时滚动到底部
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setShowThinking(true);
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        timestamp: new Date().toLocaleTimeString(),
        avatar: 'path_to_avatar_image',
        type: 'user',
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setInputValue('');

      // 发送消息到 WebSocket 服务器
      socketRef.current.emit('message', { 
        message: inputValue,
        messageLen: messages.length
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleClearInput = () => {
    setInputValue('');
    setMessages([]);
  };

  return (
    <div className="chat-app">
      <p>{t('chat-p')}<a href="https://chat1.geekgpt.org">{t('chat-a1')}</a> <a href='https://chat-shared3.zhile.io/shared.html?v=2'>{t('chat-a2')}</a></p>
      <div className="message-list">        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.type === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <div className="username">{message.type === 'user' ? 'User:' : 'AI:'}</div>
            <div className="message-text">{message.text}</div>
            {/* <div className="message-timestamp">{message.timestamp}</div> */}
          </div>
        ))}
        {showThinking && (
          <div className="message ai-message">
            <div className="username">AI:</div>
            <div className="message-text">Let's Think...</div>
            <div className="newtons-cradle">
              <div className="newtons-cradle__dot"></div>
              <div className="newtons-cradle__dot"></div>
              <div className="newtons-cradle__dot"></div>
              <div className="newtons-cradle__dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* 用于滚动到底部 */}
      </div>
      <div className="message-input">      
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        {/* <button style={{ marginRight: '10px' }} onClick={handleSendMessage}>Send</button> */}
        <button style={{ marginRight: '10px' }} onClick={handleSendMessage}>
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
              </svg>
            </div>
        </div>
        <span>Send</span>
        </button>
        <button onClick={handleClearInput}>Clear</button>
      </div>
    </div>
  );
}

export default ChatApp;
