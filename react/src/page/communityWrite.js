import React from 'react'
import TopBar from '../component/TopBar'
import Title from '../component/Title'
import Content from '../component/Content'
import AnimalSelect from '../component/AnimalSelect'
import AnimalProfile from '../component/AnimalProfile'

const CommunityWrite = () => {
  return (
    <div>
      <TopBar />
      <AnimalSelect />
      <div style={{ height: '10px' }}></div>
      <Title />
      <div style={{ height: '20px' }}></div>
      <Content />
    </div>
  )
}

export default CommunityWrite
