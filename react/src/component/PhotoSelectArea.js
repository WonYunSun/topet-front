import React, { useState } from 'react';
import PhotoSelectBox from './PhotoSelectBox';
import '../css/photo_select.css';

const PhotoSelectArea = () => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handlePhotosSelected = (photos) => {
    const newPhotos = photos.filter(
      (photo) => !selectedPhotos.some((selectedPhoto) => selectedPhoto.name === photo.name)
    );
    const updatedPhotos = [...selectedPhotos, ...newPhotos].slice(0, 10);
    setSelectedPhotos(updatedPhotos);
  };

  const handleRemovePhoto = (index) => {
    setSelectedPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <div className='photo-select-area'>
      <div className='selected-photos'>
        {selectedPhotos.length < 10 && (
          <PhotoSelectBox onPhotosSelected={handlePhotosSelected} selectedPhotoCount={selectedPhotos.length} />
        )}
        {selectedPhotos.map((photo, index) => (
          <div key={index} className='selected-photo-box'>
            <img src={URL.createObjectURL(photo)} alt={`selected ${index}`} className='photo' />
            <button className='remove-photo-button' onClick={() => handleRemovePhoto(index)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoSelectArea;
