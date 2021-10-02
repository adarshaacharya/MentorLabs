import { Button, Col, Row } from 'antd';
import { SOCKETS_EVENT } from 'constants/socketEvents';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaFacebookMessenger, FaMicrophone, FaMicrophoneSlash, FaPhone, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import Peer, { SignalData } from 'simple-peer';
import {
  leaveCurrentRoom,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
  setLocalStream,
  setRemoteStream,
  setRoomInformation,
} from 'store/room/room.slice';
import { JoinRoomResponse, SocketCallbackError } from 'types';
import { displaySuccessNotification } from 'utils/notifications';
import { socket } from 'utils/socketConfig';
import manOne from './assets/man-one.jpeg';
import { ChatDrawer } from './components';

export const Room = () => {
  const { localCameraEnabled, localMicrophoneEnabled, localStream, info, remoteStream } = useAppSelector(
    (state) => state.room,
  );

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const id = useParams();
  const navigate = useNavigate();

  const localVideoRef = React.useRef<HTMLVideoElement>();
  const remoteVideoRef = React.useRef<HTMLVideoElement>();

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

  React.useEffect(() => {
    const roomData = { participantId: id, roomId: id };

    socket.emit(SOCKETS_EVENT.JOIN_ROOM, roomData);

    socket.on(SOCKETS_EVENT.JOINED_ROOM, (room: JoinRoomResponse) => {
      dispatch(setRoomInformation(room));
    });
  }, [id]);

  React.useEffect(() => {
    const peer = new Peer({ initiator: true, trickle: false, stream: localStream });

    // call other user
    peer.on('signal', (data: SignalData) => {
      const signalData = { roomId: info.roomId, signal: data };

      socket.emit(SOCKETS_EVENT.SEND_SIGNAL, signalData, ({ error }: SocketCallbackError) => {
        if (error) {
          navigate('/student-labs');
        }
      });
    });

    peer.on('stream', (stream: MediaStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });

    socket.on(SOCKETS_EVENT.RECEIVE_SIGNAL, (signal: SignalData) => {
      dispatch(setRemoteStream(signal));
      signal && peer.signal(signal);
    });
  }, []);

  // clipboard
  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(info.roomId);
    displaySuccessNotification('Room Id copied to clipboard', info.roomId);
  };

  // mic
  const onMicButtonPress = () => {
    dispatch(setLocalMicrophoneEnabled(!localMicrophoneEnabled));
    if (localMicrophoneEnabled) localStream.getAudioTracks()[0].stop();
  };

  // camera
  const onCameraButtonPress = () => {
    dispatch(setLocalCameraEnabled(!localCameraEnabled));
    if (localCameraEnabled) localStream.getVideoTracks()[0].stop();
  };

  // chatbox
  const showChatBox = () => setShowChat(true);
  const closeChatBox = () => setShowChat(false);

  // leave room
  const leaveRoom = () => {
    const roomData = {
      userId: user.id,
      roomId: id,
    };
    socket.emit(SOCKETS_EVENT.LEAVE_ROOM, roomData);

    dispatch(leaveCurrentRoom());
    displaySuccessNotification('Room left succesfully');
    navigate('/student-labs');
  };

  const gridColumn = remoteStream ? 12 : 24;

  return (
    <section className="room">
      <Helmet>
        <title>Room - Mentor Labs</title>
      </Helmet>
      <div className="room__wrapper">
        <div className="room__main">
          <Row>
            {/* local stream */}
            <Col span={gridColumn}>
              <div className="room__local-stream">
                {!localStream || !localCameraEnabled ? (
                  <img src={manOne} alt="placeholder" />
                ) : (
                  <video playsInline muted ref={localVideoRef} autoPlay />
                )}
              </div>
            </Col>
            {/* remote stream */}
            {remoteStream && (
              <Col span={12}>
                <video playsInline muted ref={remoteVideoRef} autoPlay />
              </Col>
            )}
          </Row>
        </div>
        <div className="room__footer">
          <div className="room__link">
            <Button className="ml-2" onClick={copyToClipBoard}>
              Copy Room Id
            </Button>
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
              <FaPhone size={'1.3em'} title="leave room" onClick={leaveRoom} />
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
