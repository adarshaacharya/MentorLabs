import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { setLocalCameraEnabled, setLocalMicrophoneEnabled, setLocalStream } from 'store/room/room.slice';
import placeholder from '../../assets/placeholder.jpg';

export const LabsVideo = () => {
  const { localCameraEnabled, localMicrophoneEnabled, localStream } = useAppSelector((state) => state.room);
  const dispatch = useAppDispatch();

  const videoRef = React.useRef<HTMLVideoElement>();

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: localCameraEnabled, audio: localMicrophoneEnabled })
      .then((currentStream) => {
        dispatch(setLocalStream(currentStream));
        if (videoRef.current) videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [localCameraEnabled, localMicrophoneEnabled]);

  const onMicButtonPress = () => {
    dispatch(setLocalMicrophoneEnabled(!localMicrophoneEnabled));
    if (localMicrophoneEnabled) localStream.getAudioTracks()[0].stop();
  };

  const onCameraButtonPress = () => {
    dispatch(setLocalCameraEnabled(!localCameraEnabled));
    if (localCameraEnabled) localStream.getVideoTracks()[0].stop();
  };

  return (
    <div className="labs-video">
      <div className="labs__video">
        {!localStream || !localCameraEnabled ? (
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
