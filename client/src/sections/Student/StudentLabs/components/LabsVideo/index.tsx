import * as React from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';

import placeholder from '../../assets/placeholder.jpg';

export const LabsVideo = () => {
  const [localStream, setSLocalStream] = React.useState<MediaStream>();
  const [localMicrophoneEnabled, setLocalMicrophoneEnabled] = React.useState(true);
  const [localCameraEnabled, setLocalCameraEnabled] = React.useState(true);

  const videoRef = React.useRef<HTMLVideoElement>();

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: localCameraEnabled, audio: localMicrophoneEnabled })
      .then((currentStream) => {
        setSLocalStream(currentStream);
        if (videoRef.current) videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localCameraEnabled, localMicrophoneEnabled]);

  const onMicButtonPress = () => {
    setLocalMicrophoneEnabled(!localMicrophoneEnabled);
  };

  const onCameraButtonPress = () => {
    setLocalCameraEnabled(!localCameraEnabled);
  };

  return (
    <div className="labs-video">
      <div className="labs__video">
        {localCameraEnabled ? (
          <video playsInline muted ref={videoRef} autoPlay />
        ) : (
          <img src={placeholder} alt="placeholder" className="labs__video--placeholder" />
        )}
      </div>

      <div className="labs__video-controls">
        <div onClick={onMicButtonPress} className={`meeting-icons ${!localMicrophoneEnabled ? 'bg--danger' : ''}`}>
          {!localMicrophoneEnabled ? (
            <FaMicrophoneSlash size={'1.3em'} title="audio muted" />
          ) : (
            <FaMicrophone size={'1.3em'} title="audio" />
          )}
        </div>
        <div onClick={onCameraButtonPress} className={`meeting-icons ${!localCameraEnabled ? 'bg--danger' : ''}`}>
          {!localCameraEnabled ? (
            <FaVideoSlash size={'1.3em'} title="video disallowed" />
          ) : (
            <FaVideo size={'1.3em'} title="video" />
          )}
        </div>
      </div>
    </div>
  );
};
