import * as React from 'react';

export const LabsVideo = () => {
  const videoRef = React.useRef<HTMLVideoElement>();

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="labs-video">
      <div className="labs__video">
        <video playsInline muted ref={videoRef} autoPlay />
      </div>

      {/* <div className="labs__video-controls">
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
      </div> */}
    </div>
  );
};
