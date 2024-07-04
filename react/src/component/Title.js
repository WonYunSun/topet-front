import React from 'react'
import '../css/community_write_title.css'

const Title = ({value, handleTitleTextChange}) => {
  return (
    <div className='titlewrite'>
      <textarea placeholder='제목을 입력해주세요' value={value} onChange={handleTitleTextChange}></textarea>
    </div>
  )
}

export default Title