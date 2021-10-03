import { SOCKETS_EVENT } from 'constants/socketEvents';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { useParams } from 'react-router';
import Peer, { SignalData } from 'simple-peer';
import { Socket } from 'socket.io-client';
import { leaveCurrentRoom } from 'store/room/room.slice';
import { socket } from 'utils/socketConfig';
import { v4 as uuid } from 'uuid';

type VideoProps = {
  peer: Peer.Instance;
};

const Video: React.FC<VideoProps> = ({ peer }) => {
  const ref = React.useRef<HTMLVideoElement>();

  React.useEffect(() => {
    peer.on('stream', (stream: MediaStream) => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, []);

  return <video playsInline autoPlay ref={ref} height="50" width="50" />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

export const Room = () => {
  const [peers, setPeers] = React.useState([]);
  const socketRef = React.useRef<Socket>();
  const userVideo = React.useRef<HTMLVideoElement>(); // my video
  const peersRef = React.useRef([]);

  const dispatch = useAppDispatch();

  const { roomId } = useParams();

  // 1..
  React.useEffect(() => {
    socketRef.current = socket; // current socket id

    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then((stream: MediaStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }

      // 2. prespective of when some person joins room, emit its roomId to server
      socketRef.current.emit(SOCKETS_EVENT.JOIN_ROOM, roomId);

      // 3. server emits back with give array of all other current users who are currently in the chat
      socketRef.current.on(SOCKETS_EVENT.ALL_USERS, (users: string[]) => {
        const peers = [];

        // 4. create peer for each user in  room
        users.forEach((userId) => {
          // 5. userId = id of each user in room, socketRef.current.id = current user socketId
          const peer = createPeer(userId, socketRef.current.id, stream);

          // push that users for the peerRef
          peersRef.current.push({
            peerId: userId,
            peer,
          });
          peers.push(peer);
        });
        setPeers(peers); // adding  peers to state
      });

      /**FLIP SIDE - for people who are already in room */
      // 8. when new user joined , from the prespective of all the other users in the room (get notified someone has joined)
      socketRef.current.on(SOCKETS_EVENT.USER_JOINED_ROOM, (payload) => {
        const { signal, callerId } = payload;

        const peer = addPeer(signal, callerId, stream); // create new peer (new user signal, new user callerID, and their own stream )

        // push that users for the peerRef
        peersRef.current.push({
          peerId: callerId,
          peer,
        });

        setPeers((users) => [...users, peer]); // state for peers in ui
      });

      // back to person who just joined the room
      // 11. receiving returned back signal from other uses
      socketRef.current.on(SOCKETS_EVENT.RECEIVING_RETURNED_SIGNAL, (payload) => {
        const item = peersRef.current.find((p) => p.peerId === payload.id); // dig to that array of peers so that correct id is listening to that returned signal from other users

        item.peer.signal(payload.signal);
      });
    });

    // cleanup sideffects
    return () => {
      dispatch(leaveCurrentRoom());
    };
  }, []);

  // 6. creates the new peer with initiator true
  const createPeer = (userToSignal: string, callerId: string, stream: MediaStream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    // 7. immediately emits the signal  & send back to other people / each individual person in the room
    peer.on('signal', (signal: SignalData) => {
      socketRef.current.emit(SOCKETS_EVENT.SENDING_SIGNAL, { userToSignal, callerId, signal });
    });

    return peer;
  };

  // 9. incoming signal = send by person who just joins the room to all the people in the room
  const addPeer = (incomingSignal: SignalData, callerId: string, stream: MediaStream) => {
    // initiator = false, we dont want to send the signal right away once signal is created
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    // 10. accept incoming signal
    // sending our own signal to that particular callerID, i.e send to that person person who just send us the signal i.e person who just join room
    peer.on('signal', (signal: SignalData) => {
      socketRef.current.emit(SOCKETS_EVENT.RETURNING_SIGNAL, { signal, callerId });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  return (
    <section className="room">
      <div className="container">
        <video muted ref={userVideo} autoPlay playsInline />
        {peers.map((peer) => (
          <Video key={uuid()} peer={peer} />
        ))}
      </div>
    </section>
  );
};
