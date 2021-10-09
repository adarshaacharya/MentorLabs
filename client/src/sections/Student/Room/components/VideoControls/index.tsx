import { Button } from 'antd';
import { useAppSelector } from 'hooks';
import * as React from 'react';
import { FaFacebookMessenger, FaMicrophone, FaMicrophoneSlash, FaPhone, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { displaySuccessNotification } from 'utils/notifications';

type VideoControlsProps = {
  onMicButtonPress: () => void;
  onCameraButtonPress: () => void;
  handleLeaveRoom: () => void;
};

export const VideoControls = () => {
  const { id } = useAppSelector((state) => state.room);

  const localCameraEnabled = false,
    localMicrophoneEnabled = false;

  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(id);
    displaySuccessNotification('Room Id copied to clipboard', id);
  };

  const onMicButtonPress = () => {};
  const onCameraButtonPress = () => {};
  const handleLeaveRoom = () => {};

  return (
    <div className="video-controls">
      {/* <div className="video-controls__link">
        <Button className="ml-2" onClick={copyToClipBoard}>
          Copy Room Id
        </Button>
      </div> */}
      <div className="video-controls__icons">
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

        {/* <div onClick={setScreenState} className={`meeting-icons ${streamState.screen ? 'disabled' : ''}`}>
              <FaDesktop size={'1.3em'} title="screen share" />
            </div> */}
        <div className="meeting-icons bg--danger" onClick={handleLeaveRoom}>
          <FaPhone size={'1.3em'} title="leave room" />
        </div>
      </div>

      {/* <div className="video-controls__chat mr-2">
        <div className="meeting-icons">
          <FaFacebookMessenger size={'1.5em'} className="text--primary" title="messages" />
        </div>
      </div> */}
    </div>
  );
};
