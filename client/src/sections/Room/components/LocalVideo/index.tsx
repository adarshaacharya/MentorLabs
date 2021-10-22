import placeholder from '../../assets/placeholder.jpg';

type LocalVideoProps = {
  localVideoRef: React.MutableRefObject<HTMLVideoElement>;
  localCameraEnabled: boolean;
};

export const LocalVideo: React.FC<LocalVideoProps> = ({ localVideoRef, localCameraEnabled }) => {
  return (
    <div>
      {!localCameraEnabled ? (
        <img src={placeholder} alt="placeholder" className="w-100" />
      ) : (
        <video muted ref={localVideoRef} autoPlay playsInline />
      )}
      <p>Me</p>
    </div>
  );
};
