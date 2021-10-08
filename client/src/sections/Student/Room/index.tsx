import { useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Overlay } from './components';
import * as webRTCHandler from 'services/webrtc';
export const Room = () => {
  const { showOverlay, isRoomHost, id: roomId } = useAppSelector((state) => state.room);
  const { user } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    webRTCHandler.getLocalPreviewAndInitRoomConnection({ isRoomHost, identity: user.name, userId: user.id, roomId });
  }, []);

  return (
    <section className="room">
      <Helmet>
        <title>Room - Mentor Labs</title>
      </Helmet>
      <div className="video-section"></div>

      <div className="participants-section"></div>

      {showOverlay && <Overlay />}
    </section>
  );
};
