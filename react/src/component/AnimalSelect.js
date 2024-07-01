import React from 'react'
import AnimalProfile from './AnimalProfile';
import { GoChevronDown } from "react-icons/go";


const AnimalSelect = () => {
  return (
    <div className='animal-select'>
      <AnimalProfile />
      <GoChevronDown  className='arrow-bottom'/>
     </div>
  )
}

export default AnimalSelect
