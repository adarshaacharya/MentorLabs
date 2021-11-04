import * as React from 'react';
import { FaDesktop } from 'react-icons/fa';
import * as webRTCHandler from 'services/webrtc';
import { LocalScreenShare } from '..';

const constraints = {
  audio: false,
  video: {
    width: 520,
    height: 430,
  },
};

export const SwitchToScreenSharingButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = React.useState(false);
  const [screenSharingStream, setScreenSharingStream] = React.useState<MediaStream>(null);

  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream: MediaStream = null;

      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (error) {
        console.log('Error when trying to get an access to scren share stream');
        console.log(error);
      }

      if (stream) {
        setScreenSharingStream(stream);
        webRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
        setIsScreenSharingActive(true);

        // execute function to switch the video track which we are sending to other user
      }
    } else {
      webRTCHandler.toggleScreenShare(isScreenSharingActive);
      setIsScreenSharingActive(false);

      // stop screen share stream
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }
  };

  return (
    <>
      <div onClick={handleScreenShareToggle} className={`meeting-icons ${isScreenSharingActive ? 'bg--danger' : ''}`}>
        <FaDesktop size={'1.3em'} title="screen share" />
      </div>
    </>
  );
};
