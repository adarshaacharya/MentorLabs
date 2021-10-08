import { store } from 'store';
import { setShowOverlay } from 'store/room/room.slice';
import * as wss from './wss';

/*==========================================
  webRTC Types
*===========================================*/
type Peer = {
  [key: string]: string;
};

type LocalPreview = { isRoomHost: boolean; identity: string; userId: string; roomId: string };

/*==========================================
  Global Variables
*===========================================*/
const constraints = {
  audio: true,
  video: {
    width: 480,
    height: 360,
  },
};

let localStream: MediaStream = null;
let peers: Peer = {};
let streams = [];

export const getLocalPreviewAndInitRoomConnection = ({ isRoomHost, identity, userId, roomId }: LocalPreview) => {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log('sucessfully received local stream');
      localStream = stream;

      store.dispatch(setShowOverlay(false));
      isRoomHost ? wss.createNewRoom(userId, identity, roomId) : wss.joinRoom(userId, identity, roomId);
    })
    .catch((err: MediaError) => {
      console.log('Error occured when trying to get access to local stream');
      console.log(err);
    });
};
