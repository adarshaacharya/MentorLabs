export const AddStream: any = ({ stream, connUserSocketId }) => {
  return (
    <div className="video_track__container">
      <video src={stream} autoPlay id={`${connUserSocketId}-video`}></video>
    </div>
  );
};
