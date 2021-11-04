import { useAppSelector } from 'hooks';
import { CameraButton, SwitchToScreenSharingButton } from './components';
import { CopyToClipboard } from './components/CopyToClipBoard';
import { LeaveRoom } from './components/LeaveRoom';
import { MicButton } from './components/MicButton';

export const VideoControls = () => {
  const { id } = useAppSelector((state) => state.room);

  return (
    <div className="video-controls">
      <div className="video-controls__icons">
        <CopyToClipboard roomId={id} />
        <MicButton />
        <CameraButton />
        <SwitchToScreenSharingButton />
        <LeaveRoom />
      </div>
    </div>
  );
};
