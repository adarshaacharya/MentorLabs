import * as React from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import * as webRTCHandler from 'services/webrtc';

export const MicButton = () => {
  const [isMicMuted, setIsMicMuted] = React.useState(false); // at first mic isn't muted

  const handleMicButtonPressed = () => {
    webRTCHandler.toggleMic(!isMicMuted);
    setIsMicMuted(!isMicMuted);
  };

  return (
    <div onClick={handleMicButtonPressed} className={`meeting-icons ${!isMicMuted ? 'bg--danger' : ''}`}>
      {!isMicMuted ? (
        <FaMicrophoneSlash size={'1.3em'} title="audio muted" />
      ) : (
        <FaMicrophone size={'1.3em'} title="audio" />
      )}
    </div>
  );
};
