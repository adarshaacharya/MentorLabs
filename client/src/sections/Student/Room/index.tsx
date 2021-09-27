import { Button, Col, Row } from 'antd';
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
import manOne from './assets/man-one.jpeg';
import manTwo from './assets/man-two.jpeg';
import { ChatDrawer } from './components';

const initialState = {
  mic: true,
  video: true,
  screen: false,
};

export const Room = () => {
  const [streamState, setStreamState] = React.useState(initialState);
  const [showChat, setShowChat] = React.useState(false);

  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };

  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      };
    });
  };

  const setScreenState = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        screen: !currentState.screen,
      };
    });
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
              <img src={manOne} alt="man-one" />
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
            <div onClick={micClick} className={`meeting-icons ${!streamState.mic ? 'bg--danger' : ''}`}>
              {!streamState.mic ? (
                <FaMicrophoneSlash size={'1.3em'} title="audio muted" />
              ) : (
                <FaMicrophone size={'1.3em'} title="audio" />
              )}
            </div>
            <div onClick={onVideoClick} className={`meeting-icons ${!streamState.video ? 'bg--danger' : ''}`}>
              {!streamState.video ? (
                <FaVideoSlash size={'1.3em'} title="video disallowed" />
              ) : (
                <FaVideo size={'1.3em'} title="video" />
              )}
            </div>
            <div onClick={setScreenState} className={`meeting-icons ${streamState.screen ? 'disabled' : ''}`}>
              <FaDesktop size={'1.3em'} title="screen share" />
            </div>
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
