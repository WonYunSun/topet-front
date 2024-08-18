import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TopBar from '../component/TopBar';
import styles from '../css/toPetAi.module.css'; // Import the CSS Module

const ToPetAi = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
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
      addMessage('user', input);
      setInput('');

      // AI 응답을 가져오는 동안 로딩 표시
      setLoading(true);
      const aiResponse = await fetchAIResponse(input);
      setLoading(false);

      addMessage('ai', aiResponse);
  };

  return (
      <div className={styles.container}>
        <TopBar />
          <div className={styles.messagesContainer}>
              {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={msg.sender === 'user' ? styles.user : styles.ai}
                  >
                      <div className={styles.messageLabel}>
                          {msg.sender === 'user' ? '나' : '투펫AI'}
                      </div>
                      <div className={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}>
                          {msg.message}
                      </div>
                  </div>
              ))}
              {loading && (
                  <div className={styles.loadingIndicator}>
                      <span>...</span>
                  </div>
              )}
              <div ref={messagesEndRef} />
          </div>
          <div className={styles.inputContainer}>
              <input
                  type="text"
                  value={input}
                  placeholder='무엇이 궁긍하세요?'
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button  onClick={handleSend}>전송</button>
          </div>
      </div>
  );
}

export default ToPetAi;
