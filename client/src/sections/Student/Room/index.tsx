import { Col, Row } from 'antd';
import { SOCKETS_EVENT } from 'constants/socketEvents';
import { useAppDispatch, useAppSelector, useVideoControls } from 'hooks';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import Peer, { SignalData } from 'simple-peer';
import { Socket } from 'socket.io-client';
import { joinRoom } from 'store/room/room.action';
import { displayErrorMessage, displaySuccessNotification } from 'utils/notifications';
import { socket } from 'utils/socketConfig';
import { LocalVideo, PeerVideo, VideoControls } from './components';

export const Room = () => {
  const [peers, setPeers] = React.useState([]); // peer for state, display video on screen
  const [localStream, setLocalStream] = React.useState<MediaStream>(null);

  const socketRef = React.useRef<Socket>();
  const localVideoRef = React.useRef<HTMLVideoElement>(); // my video
  const peersRef = React.useRef<any>([]); // peer for refs
  const screenTrackRef = React.useRef();

  const { localCameraEnabled, localMicrophoneEnabled, error, id, status } = useAppSelector((state) => state.room);
  const dispatch = useAppDispatch();
  const { onCameraButtonPress, onMicButtonPress } = useVideoControls(localStream);

  const { roomId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(joinRoom(roomId));
  }, [roomId]);

  React.useEffect(() => {
    if (error && status === 'rejected') {
      displayErrorMessage(error);
      return navigate(`/student-labs`);
    }
  }, [error, status]);

  // 1..
  React.useEffect(() => {
    socketRef.current = socket; // current socket id

    navigator.mediaDevices
      .getUserMedia({ video: localCameraEnabled, audio: localMicrophoneEnabled })
      .then((stream: MediaStream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        socketRef.current.emit(SOCKETS_EVENT.JOIN_ROOM, roomId);

        socketRef.current.on(SOCKETS_EVENT.ALL_USERS, (users: string[]) => {
          const peers = [];

          users.forEach((userId) => {
            const peer = createPeer(userId, socketRef.current.id, stream);

            peersRef.current.push({
              peerId: userId,
              peer,
            });

            peers.push({
              peerId: userId,
              peer,
            });

            peers.push(peer);
          });
          setPeers(peers); // adding  peers to state
        });

        socketRef.current.on(SOCKETS_EVENT.USER_JOINED_ROOM, (payload) => {
          const { signal, callerId } = payload;

          const peer = addPeer(signal, callerId, stream);

          peersRef.current.push({
            peerId: callerId,
            peer,
          });
          // setPeers([...peersRef.current]);

          const peerObj = {
            peer,
            peerId: payload.callerId,
          };
          setPeers((users) => [...users, peerObj]); // state for peers in ui}
        });

        socketRef.current.on(SOCKETS_EVENT.RECEIVING_RETURNED_SIGNAL, (payload) => {
          const item = peersRef.current.find((p) => p.peerId === payload.id);

          item.peer.signal(payload.signal);
        });

        // user left
        socketRef.current.on(SOCKETS_EVENT.USER_LEFT, (id: string) => {
          const peerObj = peersRef.current.find((p) => p.peerId === id);

          if (peerObj) {
            peerObj.peer.destroy();
          }

          const peers = peersRef.current.filter((p) => p.peerId !== id);

          peersRef.current = peers;
          setPeers(peers); // set our new filtered peers
        });
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      socketRef.current.disconnect();
    };
  }, [localCameraEnabled, localCameraEnabled]);

  const createPeer = (userToSignal: string, callerId: string, stream: MediaStream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal: SignalData) => {
      socketRef.current.emit(SOCKETS_EVENT.SENDING_SIGNAL, { userToSignal, callerId, signal });
    });

    return peer;
  };

  const addPeer = (incomingSignal: SignalData, callerId: string, stream: MediaStream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal: SignalData) => {
      socketRef.current.emit(SOCKETS_EVENT.RETURNING_SIGNAL, { signal, callerId });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  const shareLocalScreen = () => {
    navigator.mediaDevices.getDisplayMedia({ audio: true, video: true }).then((stream) => {
      const screenTrack = stream.getTracks[0];

      peersRef.current.replaceTrack(
        peersRef.current.streams[0].getTracks().find((track: { kind: string }) => track.kind === 'video'),
        screenTrack,
        localStream,
      );
      // screenTrack.onended = () => {
      //   peersRef.current.find(sender => sender.track.kind === "video").replaceTrack(localVideoRef.current.getTracks()[1]);
      // }
    });
  };

  const handleLeaveRoom = () => {
    socketRef.current.disconnect();
    displaySuccessNotification('Successfully left room');
  };

  const span = peers.length ? 12 : 24;

  return (
    <section className="room">
      <Row>
        <Col span={span}>
          <LocalVideo localCameraEnabled={localCameraEnabled} localVideoRef={localVideoRef} />
        </Col>
        <Col span={12}>
          {/* @todo : hack to only show one peer */}
          {peers.slice(0, 1).map((peer) => (
            <PeerVideo key={peer.peerId} peer={peer.peer} />
          ))}
        </Col>
      </Row>
      <Row>
        <button onClick={shareLocalScreen}>Share screen</button>
      </Row>
      <Row>
        <VideoControls
          onMicButtonPress={onMicButtonPress}
          onCameraButtonPress={onCameraButtonPress}
          handleLeaveRoom={handleLeaveRoom}
        />
      </Row>
    </section>
  );
};
