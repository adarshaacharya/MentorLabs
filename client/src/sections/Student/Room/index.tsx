import { Button, Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FaDesktop,
  FaFacebookMessenger,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPhone,
  FaVideo,
  FaVideoSlash,
} from 'react-icons/fa';
import { setLocalCameraEnabled, setLocalMicrophoneEnabled, setLocalStream } from 'store/room/room.slice';
import manOne from './assets/man-one.jpeg';
import manTwo from './assets/man-two.jpeg';
import { ChatDrawer } from './components';

export const Room = () => {
  const { localCameraEnabled, localMicrophoneEnabled, localStream } = useAppSelector((state) => state.room);
  const dispatch = useAppDispatch();
  const localVideoRef = React.useRef<HTMLVideoElement>();

  const [showChat, setShowChat] = React.useState(false);

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: localCameraEnabled, audio: localMicrophoneEnabled })
      .then((currentStream) => {
        dispatch(setLocalStream(currentStream));
        if (localVideoRef.current) localVideoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localCameraEnabled, localMicrophoneEnabled]);

  const onMicButtonPress = () => {
    dispatch(setLocalMicrophoneEnabled(!localMicrophoneEnabled));
  };

  const onCameraButtonPress = () => {
    dispatch(setLocalCameraEnabled(!localCameraEnabled));
  };

  const showChatBox = () => setShowChat(true);
  const closeChatBox = () => setShowChat(false);

  return (
    <section className="room">
      <Helmet>
        <title>Room - Mentor Labs</title>
      </Helmet>
      <div className="room__wrapper">
        <div className="room__main">
          <Row>
            <Col span={12}>
              <div className="room__local-stream">
                {!localStream || !localCameraEnabled ? (
                  <img src={manOne} alt="placeholder" />
                ) : (
                  <video playsInline muted ref={localVideoRef} autoPlay />
                )}
              </div>
            </Col>
            <Col span={12}>
              <img src={manTwo} alt="man-two" />
            </Col>
          </Row>
        </div>
        <div className="room__footer">
          <div className="room__link">
            <Button className="ml-2">Copy Joining Info</Button>
          </div>
          <div className="room__icons">
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
            <div className="meeting-icons bg--danger">
              <FaPhone size={'1.3em'} title="cancel call" />
            </div>
          </div>

          <div className="room__chat mr-2">
            <div className="meeting-icons" onClick={showChatBox}>
              <FaFacebookMessenger size={'1.5em'} className="text--primary" title="messages" />
            </div>
          </div>
        </div>
        <ChatDrawer visible={showChat} onClose={closeChatBox} />
      </div>
    </section>
  );
};
