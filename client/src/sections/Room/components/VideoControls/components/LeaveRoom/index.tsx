import { FaPhone } from 'react-icons/fa';

export const LeaveRoom = () => {
  const handleLeaveRoom = () => {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  return (
    <div className="meeting-icons bg--danger" onClick={handleLeaveRoom}>
      <FaPhone size={'1.3em'} title="leave room" />
    </div>
  );
};
