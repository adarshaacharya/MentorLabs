import { store } from 'store';
import { setShowOverlay } from 'store/room/room.slice';
import * as wss from './wss';
import Peer, { SignalData } from 'simple-peer';
import { SignalingData } from 'types';

/*==========================================
  webRTC Types
*===========================================*/
type SimplePeer = {
  [key: string]: Peer.Instance;
};

type LocalPreview = { isRoomHost: boolean; identity: string; userId: string; roomId: string };

/*==========================================
  Global Variables
*===========================================*/
const constraints = {
  audio: true,
  video: {
    width: 520,
    height: 430,
  },
};

let localStream: MediaStream = null;
let peers: SimplePeer = {};
let streams = [];

export const getLocalPreviewAndInitRoomConnection = ({ isRoomHost, identity, userId, roomId }: LocalPreview) => {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log('sucessfully received local stream');
      localStream = stream;
      showLocalVideoPreview(localStream);

      store.dispatch(setShowOverlay(false));
      isRoomHost ? wss.createNewRoom(userId, identity, roomId) : wss.joinRoom(userId, identity, roomId);
    })
    .catch((err: MediaError) => {
      console.log('Error occured when trying to get access to local stream');
      console.log(err);
    });
};

// stun server config
const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };
};

// first step - prepare for webrtc conn
export const prepareNewPeerConnection = (connUserSocketId: string, isInitiator: boolean) => {
  const configuration = getConfiguration();

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[connUserSocketId].on('signal', (data: Peer.SignalData) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };
    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on('stream', (stream: Peer.SignalData) => {
    console.log('new stream came');

    addStream(stream, connUserSocketId);

    streams = [...streams, stream];
  });
};

export const handleSignalingData = (data: SignalingData) => {
  peers[data.connUserSocketId].signal(data.signal);
};

/*=================================================
Vanilla js ui logic
==================================================*/

// show local video preview
const showLocalVideoPreview = (stream: MediaStream) => {
  const videosContainer = document.getElementById('videos_portal');
  videosContainer.classList.add('videos_portal__styles');

  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video_track__container');

  const videoElement = document.createElement('video');

  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};

export const addStream = (stream: SignalData, connUserSocketId: string) => {
  const videosContainer = document.getElementById('videos_portal');
  const videoContainer = document.createElement('div');

  videoContainer.id = connUserSocketId;

  videoContainer.classList.add('video_track__container');

  const videoElement = document.createElement('video');
  videoElement.autoplay = true;
  videoElement.srcObject = stream as MediaProvider;
  videoElement.id = `${connUserSocketId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  // add fullstream or not
  videoElement.addEventListener('click', () => {
    if (videoElement.classList.contains('full_screen')) {
      videoElement.classList.remove('full_screen');
    } else {
      videoElement.classList.add('full_screen');
    }
  });

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};
