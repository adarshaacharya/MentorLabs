import { useAppDispatch, useAppSelector, useVideoControls } from 'hooks';
import * as React from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import placeholder from '../../assets/placeholder.jpg';

export const LabsVideo = () => {
  const { localCameraEnabled, localMicrophoneEnabled } = useAppSelector((state) => state.room);
  const dispatch = useAppDispatch();

  const [localStream, setLocalStream] = React.useState<MediaStream>(null);
  const videoRef = React.useRef<HTMLVideoElement>();
  const { onCameraButtonPress, onMicButtonPress } = useVideoControls(localStream);

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: localCameraEnabled, audio: localMicrophoneEnabled })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setLocalStream(stream);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [localCameraEnabled, localMicrophoneEnabled]);

  return (
    <div className="labs-video">
      <div className="labs__video">
        {!localCameraEnabled ? (
          <img src={placeholder} alt="placeholder" className="labs__video--placeholder" />
        ) : (
          <video playsInline muted ref={videoRef} autoPlay />
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
