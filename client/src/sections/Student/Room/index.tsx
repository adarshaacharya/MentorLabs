import { useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Overlay, Sidebar, VideoControls } from './components';
import * as webRTCHandler from 'services/webrtc';
export const Room = () => {
  const { showOverlay, isRoomHost, id: roomId } = useAppSelector((state) => state.room);
  const { user } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    if (!roomId && !isRoomHost) {
      const siteUrl = window.location.origin;
      window.location.href = siteUrl;
    }

    webRTCHandler.getLocalPreviewAndInitRoomConnection({ isRoomHost, identity: user.name, userId: user.id, roomId });
  }, []);

  return (
    <section className="room">
      <Helmet>
        <title>Room - Mentor Labs</title>
      </Helmet>
      {showOverlay && <Overlay />}

      <div className="room__container">
        <div className="room__main">
          <div className="room__video">
            <div className="video-section"></div>
          </div>
          <div className="room__sidebar">
            <Sidebar />
          </div>
        </div>

        <div className="room__footer">
          <VideoControls />
        </div>
      </div>
    </section>
  );
};
