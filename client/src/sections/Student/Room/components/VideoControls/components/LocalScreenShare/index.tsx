import * as React from 'react';

type LocalScreenShareProps = {
  stream: MediaStream;
};

export const LocalScreenShare: React.FC<LocalScreenShareProps> = ({ stream }) => {
  const localPreviewRef = React.useRef<HTMLVideoElement>();

  React.useEffect(() => {
    const video = localPreviewRef.current;

    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <div>
      <video muted autoPlay ref={localPreviewRef}></video>
    </div>
  );
};
