import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Community from './page/community';
import CommunityWrite from './page/communityWrite';

function App() {
    const [test, setTest] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [form, setForm] = useState("");

    useEffect(() => {
        axios.get('/api/temp')
            .then(res => { 
                setTest(res.data);
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    const titleChange = (e) => {
        setTitle(e.target.value);
        console.log(e.target.value)
    }
    const contentChange = (e) => setContent(e.target.value);

    const fnpostName = () => {
        const formData = {
            postTitle: title,
            postContent: content
        };

        axios.post('/api/postTemp', formData)
            .then(res => {
                setForm(res.data);
            })
            .catch(error => console.log(error));
    }

    return (
       <div className="App">
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div>
                        complete? {test}    
                    </div>
                    <input onChange={titleChange} placeholder='이름을 입력하세요'/>
                    <input onChange={contentChange} placeholder='학년을 입력하세요'/>
                    <button type='button' onClick={fnpostName}>전송</button>
                    <div>{form}</div>
                </header>
            </div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/community/community' element={<Community />} />
            <Route path='/community/communitywrite' element={<CommunityWrite />} />
        </Routes>
        </div>
    );
}

export default App;
