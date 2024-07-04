import React from 'react'
import '../css/community_write_content.css'

const Content = ({value, handleContentTextChange }) => {
  return (
    <div className='contentwrite'>
      <textarea placeholder="게시글을 입력해주세요" value={value} onChange={handleContentTextChange}></textarea>
    </div>
  )
}

export default Content
