import { useAppSelector } from 'hooks';
import { FaMicrophone, FaMicrophoneSlash, FaPhone, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { displaySuccessNotification } from 'utils/notifications';
import { CameraButton, LocalScreenShare, SwitchToScreenSharingButton } from './components';
import { MicButton } from './components/MicButton';
export const VideoControls = () => {
  const { id } = useAppSelector((state) => state.room);

  const localMicrophoneEnabled = false;

  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(id);
    displaySuccessNotification('Room Id copied to clipboard', id);
  };

  const onMicButtonPress = () => {};
  const onCameraButtonPress = () => {};

  const handleLeaveRoom = () => {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  return (
    <div className="video-controls">
      {/* <div className="video-controls__link">
        <Button className="ml-2" onClick={copyToClipBoard}>
          Copy Room Id
        </Button>
      </div> */}
      <div className="video-controls__icons">
        <MicButton />
        <CameraButton />
        <SwitchToScreenSharingButton />
        <div className="meeting-icons bg--danger" onClick={handleLeaveRoom}>
          <FaPhone size={'1.3em'} title="leave room" />
        </div>
      </div>
    </div>
  );
};
