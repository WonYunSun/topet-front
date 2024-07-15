import React from 'react'
import '../../css/hashtag.css'

const HashTag = ({ onClick, selectedTags, selectedCategory  }) => {
  return (
    <div className='hashtag-box'>
      <div className='hashtag-label'>태그 (1개 이상 선택해 주세요)</div>
      <div className='selected-tags'>
        {
        (selectedCategory != '' && selectedCategory != null)? 
            <span className='tag' >#{selectedCategory}</span> : 
            <></>
          }
        {selectedTags.map(tag => (
          <span className='tag' key={tag}>#{tag}</span>
        ))}
        <button className='hashtag-button' onClick={onClick}>+선택하기</button>
      </div>
      
    </div>
  )
}

export default HashTag
