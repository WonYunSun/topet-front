import React from 'react'
import '../css/community_write_content.css'

const Content = ({value, handleContentTextChange }) => {
  return (
    <div className='contentwrite'>
      <textarea 
      placeholder="게시글을 입력해주세요" 
      value={value} 
      onChange={handleContentTextChange}
      maxLength="1499" // 1500자로 설정하면, 영어는 1500자까지만 쳐지는데, 한글은 1501자까지 쳐짐
      ></textarea>
      <div className='contentcount'>{value.length}/1500</div>
    </div>
  )
}

export default Content
