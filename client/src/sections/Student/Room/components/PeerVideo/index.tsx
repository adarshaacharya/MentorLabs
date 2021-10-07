import * as React from 'react';
import Peer from 'simple-peer';

type PeerVideoProps = {
  peer: Peer.Instance;
};

export const PeerVideo: React.FC<PeerVideoProps> = () => {
  return <>Peer</>;
};
