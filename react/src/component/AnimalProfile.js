import React from 'react'
import { useState, useEffect } from 'react'

const AnimalProfile = () => {

    const [animalProfileSrc, setAnimalProfileSrc] = useState('https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQC5qNvtQUdFvFdOVhurco8HcIQZzM7VzZ6aJZ9JoysBIlkcGeZ')
    const [animalName, setAnimalName] = useState('체리')

  return (
    <div className='animal-profile'>
      <img src={animalProfileSrc} className='animal-img'/>
      <p className='animal-name'>{animalName}</p>
    </div>
  )
}

export default AnimalProfile
