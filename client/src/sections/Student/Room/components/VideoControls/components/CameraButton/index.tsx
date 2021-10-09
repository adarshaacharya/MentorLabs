import * as React from 'react';
import { FaVideo, FaVideoSlash } from 'react-icons/fa';
import * as webRTCHandler from 'services/webrtc';

export const CameraButton = () => {
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = React.useState(false);

  const handleCameraButtonPressed = () => {
    webRTCHandler.toggleCamera(!isLocalVideoDisabled);
    setIsLocalVideoDisabled(!isLocalVideoDisabled);
  };

  return (
    <div onClick={handleCameraButtonPressed} className={`meeting-icons ${isLocalVideoDisabled ? 'bg--danger' : ''}`}>
      {isLocalVideoDisabled ? (
        <FaVideoSlash size={'1.3em'} title="video disallowed" />
      ) : (
        <FaVideo size={'1.3em'} title="video" />
      )}
    </div>
  );
};
