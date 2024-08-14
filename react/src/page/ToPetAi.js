import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TopBar from '../component/TopBar';
import styles from '../css/toPetAi.module.css';

const ToPetAi = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
      scrollToBottom();
  }, [messages]);

  const addMessage = (sender, message) => {
      setMessages((prevMessages) => [
          ...prevMessages,
          { sender, message },
      ]);
  };

  const fetchAIResponse = async (prompt) => {
      try {
          const response = await axios.post('http://localhost:8081/api/chatgpt/ask', 
              { prompt },
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true,
              }
          );
          return response.data.response;
      } catch (error) {
          console.error('백엔드 API 호출 중 오류 발생:', error);
          return '백엔드 API 호출 중 오류 발생';
      }
  };

  const handleSend = async () => {
      if (input.trim() === '') return;

      // 사용자 질문을 화면에 추가하고 입력 박스를 초기화
      addMessage('나', input);
      setInput('');

      // AI 응답을 가져와서 화면에 추가
      const aiResponse = await fetchAIResponse(input);
      addMessage('투펫AI', aiResponse);
  };

  return (
      <div>
        <TopBar />
          <div className={styles.chatMessages}>
              {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`${styles.message} ${msg.sender === '나' ? styles.myMessage : styles.aiMessage}`}
                  >
                      {msg.sender}: {msg.message}
                  </div>
              ))}
              <div ref={messagesEndRef} />
          </div>
          <div className={styles.userInput}>
              <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className={styles.input}
              />
              <button onClick={handleSend} className={styles.sendButton}>전송</button>
          </div>
      </div>
  );
}

export default ToPetAi;
