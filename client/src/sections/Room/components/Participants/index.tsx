import { useAppSelector } from 'hooks';

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
