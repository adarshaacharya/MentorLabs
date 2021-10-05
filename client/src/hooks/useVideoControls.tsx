import { useAppDispatch, useAppSelector } from 'hooks';
import { setLocalCameraEnabled, setLocalMicrophoneEnabled } from 'store/room/room.slice';

export const useVideoControls = (localStream: MediaStream) => {
  const dispatch = useAppDispatch();
  const { localCameraEnabled, localMicrophoneEnabled } = useAppSelector((state) => state.room);

  const onMicButtonPress = () => {
    console.log(localMicrophoneEnabled);
    dispatch(setLocalMicrophoneEnabled(!localMicrophoneEnabled));
    if (localStream?.getAudioTracks()[0]?.enabled) {
      localStream.getAudioTracks()[0].enabled = !localMicrophoneEnabled;
    }
  };

  const onCameraButtonPress = () => {
    dispatch(setLocalCameraEnabled(!localCameraEnabled));

    if (localStream?.getVideoTracks()[0] && localCameraEnabled) {
      localStream?.getVideoTracks()[0]?.stop();
    }
  };

  return {
    onMicButtonPress,
    onCameraButtonPress,
  };
};
