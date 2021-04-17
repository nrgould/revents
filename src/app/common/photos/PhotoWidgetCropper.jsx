import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default function PhotoWidgetCropper({ setImage, imagePreview }) {
  const cropperRef = useRef(null);
  function cropImage() {
    if (typeof cropperRef.current.getCroppedCanvas() === 'undefined') {
      return;
    }

    cropperRef.current.getCroppedCanvas().toBlob((blob) => {
      setImage(blob);
    }, 'image/jpeg');
  }

  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
      // Cropper.js options
      initialAspectRatio={1}
      aspectRatio={1}
      guides={false}
      crop={cropImage}
      ref={cropperRef}
      preview=".img-preview"
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
    />
  );
}
