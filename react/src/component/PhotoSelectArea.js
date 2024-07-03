import React, { useState } from 'react';
import PhotoSelectBox from './PhotoSelectBox';
import '../css/photo_select.css';

const PhotoSelectArea = () => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handlePhotosSelected = (photos) => {
    const newPhotos = [...selectedPhotos, ...photos].slice(0, 10);
    setSelectedPhotos(newPhotos);
  };


  return (
    <div className='photo-select-area'>
      <div className='selected-photos'>
      {selectedPhotos.length < 10 && (
          <PhotoSelectBox onPhotosSelected={handlePhotosSelected} selectedPhotoCount={selectedPhotos.length} />
        )}
        {selectedPhotos.map((photo, index) => (
          <img key={index} src={URL.createObjectURL(photo)} alt={`selected ${index}`} className='photo'/>
          
        ))}
      </div>
    </div>
  );
};

export default PhotoSelectArea;
