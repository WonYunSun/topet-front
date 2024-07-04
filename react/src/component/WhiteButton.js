import React from 'react'
import '../css/button.css'

const WhiteButton = ({text, postServer}) => {

  const textVerification = () => {
    if(text === '작성 완료') { // text가 '작성 완료'일 때만 postServer하고 싶음
      postServer()
    }
  }
    return (
        <button className='white-button' onClick={textVerification}>{text}</button>
      );
    };

export default WhiteButton
