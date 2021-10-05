import * as React from 'react';
import Peer from 'simple-peer';

type PeerVideoProps = {
  peer: Peer.Instance;
};

export const PeerVideo: React.FC<PeerVideoProps> = ({ peer }) => {
  const ref = React.useRef<HTMLVideoElement>();

  React.useEffect(() => {
    peer?.on('stream', (stream: MediaStream) => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, []);

  return (
    <>
      {' '}
      <video playsInline autoPlay ref={ref} height="50" width="50" /> <p>Peer</p>
    </>
  );
};
