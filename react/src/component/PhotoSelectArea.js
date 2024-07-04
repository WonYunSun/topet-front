import React, { useState } from 'react';
import PhotoSelectBox from './PhotoSelectBox';
import '../css/photo_select.css';

const PhotoSelectArea = ({selectedPhotos, onPhotosSelected, onRemovePhoto, cnt}) => {

  
  

  return (
    <div className='photo-select-area'>
      <div className='selected-photos'>
        {selectedPhotos.length < cnt && (
          <PhotoSelectBox onPhotosSelected={onPhotosSelected} selectedPhotoCount={selectedPhotos.length} cnt={cnt} />
        )}
        {selectedPhotos.map((photo, index) => (
          <div key={index} className='selected-photo-box'>
            <img src={URL.createObjectURL(photo)} alt={`selected ${index}`} className='photo' />
            <button className='remove-photo-button' onClick={() => onRemovePhoto(index)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoSelectArea;
