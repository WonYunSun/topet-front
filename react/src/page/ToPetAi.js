import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TopBar from '../component/TopBar';

const ToPetAi = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [qaPairs, setQaPairs] = useState([]); // 질문과 답변을 저장할 상태
  const [qaPairsString, setQaPairsString] = useState(''); // 변환된 문자열을 저장할 상태
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
      scrollToBottom();
  }, [messages]);

  useEffect(() => {
      // qaPairs가 변경될 때마다 문자열로 변환하여 qaPairsString 상태에 저장
      const stringRepresentation = qaPairs.map(pair => `{question: "${pair.question}", answer: "${pair.answer}"}`).join(' ');
      setQaPairsString(`참고용 이전 대화 내용 : ${stringRepresentation}`);
  }, [qaPairs]);

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
      const userMessage = input;
      addMessage('나', userMessage);
      setInput('');

      // 새로운 질문과 이전 대화 내용을 결합하여 전송
      const combinedMessage = `${qaPairsString} {새로운 질문: "${userMessage}"}`;
      console.log(combinedMessage)

      // AI 응답을 가져와서 화면에 추가
      const aiResponse = await fetchAIResponse(combinedMessage);
      addMessage('투펫AI', aiResponse);

      // 질문과 답변을 객체로 저장 (최대 5개)
      setQaPairs((prevQaPairs) => {
          const newQaPairs = [...prevQaPairs, { question: userMessage, answer: aiResponse }];
          if (newQaPairs.length > 5) {
              newQaPairs.shift(); // 배열의 첫 번째 요소 제거 (가장 오래된 항목)
          }
          return newQaPairs;
      });
  };

  return (
      <div>
        <TopBar />
          <div>
              {messages.map((msg, index) => (
                  <div 
                    key={index} 
                  >
                      {msg.sender}: {msg.message}
                  </div>
              ))}
              <div ref={messagesEndRef} />
          </div>
          <div>
              <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>전송</button>
          </div>
      </div>
  );
}

export default ToPetAi;
