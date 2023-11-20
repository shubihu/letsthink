// import React, { useState } from 'react';
// import axios from 'axios';
// import '../css/Chat.css';
// // 导入需要的图片或图标等资源

// function ChatApp() {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   const handleSendMessage = async () => {
//     if (inputValue.trim() !== '') {
//       const userMessage = {
//         id: messages.length + 1,
//         text: inputValue,
//         timestamp: new Date().toLocaleTimeString(),
//         avatar: 'path_to_avatar_image',
//         type: 'user', // 添加一个type属性，表示用户消息
//       };

//       const updatedMessages = [...messages, userMessage];
//       setMessages(updatedMessages);
//       setInputValue('');

//       try {
//         const response = await axios.post('http://183.232.150.130:1080/aichat', { text: inputValue });


//         const aiMessage = {
//           id: messages.length + 2,
//           text: response.data.message,
//           timestamp: new Date().toLocaleTimeString(),
//           avatar: 'path_to_avatar_image',
//           type: 'ai', // 添加一个type属性，表示AI回答
//         };

//         const updatedMessagesWithAiMessage = [...updatedMessages, aiMessage];
//         setMessages(updatedMessagesWithAiMessage);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   const handleClearInput = () => {
//     setInputValue('');
//     setMessages([]);
//   };

//   return (
//     <div className="chat-app">
//       <p>Let's Think</p>
//       <div className="message-list">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`message ${message.type === 'user' ? 'user-message' : 'ai-message'}`}
//           >
//             <div className="username">{message.type === 'user' ? 'User:' : 'AI:'}</div>
//             <div className="message-text">{message.text}</div>
//             <div className="message-timestamp">{message.timestamp}</div>
//           </div>
//         ))}
//       </div>
//       <div className="message-input">
//         <button onClick={handleClearInput}>Clear</button>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Type your message..."
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default ChatApp;

import React, { useState, useEffect, useRef } from 'react';
import '../css/Chat.css';
import io from 'socket.io-client';
import logo from './logo.png';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const [showThinking, setShowThinking] = useState(false);

  useEffect(() => {
    // 创建 WebSocket 连接
    socketRef.current = io("http://letsthink.top", {path:'/ws/socket.io', autoConnect: true});
    // 监听 WebSocket 接收到的消息
    socketRef.current.on('response', (message) => {
      const newMessage = {
        id: messages.length + 1,
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
      <p>AI 聊天</p>
      {/* <img src={logo} alt="Logo" style={{ width: '200px', height: '50px' }} /> */}
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
        <button style={{ marginRight: '10px' }} onClick={handleSendMessage}>Send</button>
        <button onClick={handleClearInput}>Clear</button>
      </div>
    </div>
  );
}

export default ChatApp;
