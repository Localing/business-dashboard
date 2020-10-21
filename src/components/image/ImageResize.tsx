import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import * as styles from './styles/ImageResizeStyles';

interface ImageResizeProps {
  imageSrc: string|undefined,
  croppedAreaPixels: any,
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void
}


const ImageResize:FunctionComponent<ImageResizeProps> = ({ imageSrc, croppedAreaPixels, onCropComplete, ...rest}) => {

  // Image cropper
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (imageSrc === undefined) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  }, [imageSrc]);

  return (
    <>
      <styles.ImageCropperWrapper>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </styles.ImageCropperWrapper>
    </>
  )
}

export default ImageResize;
