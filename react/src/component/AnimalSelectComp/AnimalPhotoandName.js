import React, { useState, useEffect } from 'react';
import PhotoSelectBox from './PhotoSelectBox';

const AnimalPhotoandName = () => {
    // const inputName = () => {
    //     return;
    // };

    return (
        <div>
            <PhotoSelectBox onPhotosSelected={handlePhotoSelected} selectedPhotoCount={selectedPhoto ? 1 : 0} cnt={1} />
        </div>
    );
};

export default AnimalPhotoandName;
