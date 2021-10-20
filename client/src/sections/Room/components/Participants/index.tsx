import { Typography } from 'antd';
import { useAppSelector } from 'hooks';
import React from 'react';
import { AiOutlineLine } from 'react-icons/ai';
import { GiTrafficLightsGreen } from 'react-icons/gi';

const { Title } = Typography;
export const Participants = () => {
  const { participants } = useAppSelector((state) => state.room);

  return (
    <div className="participants">
      {participants.map((participant) => (
        <div key={participant.id} className="mb-1">
          <div>
            <span className="active-dot"></span>
            {participant.identity}
          </div>
        </div>
      ))}
    </div>
  );
};
