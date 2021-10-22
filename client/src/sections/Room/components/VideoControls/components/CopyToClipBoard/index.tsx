import React from 'react';
import { FaCopy } from 'react-icons/fa';
import { displaySuccessNotification } from 'utils/notifications';

export const CopyToClipboard = ({ roomId }: { roomId: string }) => {
  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(roomId);
    displaySuccessNotification('Room Id copied to clipboard', roomId);
  };

  return (
    <div className="meeting-icons">
      <FaCopy size={'1.3em'} title="copy meeting id" onClick={copyToClipBoard} />
    </div>
  );
};
