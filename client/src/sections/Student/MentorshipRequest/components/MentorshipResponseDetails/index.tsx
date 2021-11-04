import { Card, Divider, Typography } from 'antd';
import { MentorshipResponseData } from 'types';
import { displaySuccessNotification } from 'utils/notifications';

type TeacherMentorshipResponseDetailsProps = {
  response: MentorshipResponseData;
};
const { Title, Paragraph } = Typography;

export const StudentMentorshipResponseDetails: React.FC<TeacherMentorshipResponseDetailsProps> = ({ response }) => {
  const copyRoomId = async (roomId: string) => {
    await navigator.clipboard.writeText(roomId);
    displaySuccessNotification('Room id copied successfully.');
  };

  return (
    <div className="mentorship-response">
      <div className="container">
        <Divider orientation="left">
          <Title level={4}>Mentorship Response Status.</Title>
        </Divider>
        <Paragraph type="secondary">
          Your mentorship request has been accepted succesfully. Click the session link to join the mentorship session
          on the particular date / time. If there you want to cancel the session contact the mentor in meial directly.
        </Paragraph>
      </div>

      <Card className="mentorship-response__card mb-1 p-1">
        <table>
          <tr>
            <th>Date </th>
            <td>{response.date}</td>
          </tr>
          <tr>
            <th>Start Time </th>
            <td>{response.startTime}</td>
          </tr>
          <tr>
            <th>End Time </th>
            <td>{response.endTime}</td>
          </tr>
          <tr>
            <th>RoomId </th>
            <span className="text--link cursor-pointer" onClick={() => copyRoomId(response.roomId)}>
              {response.roomId}
            </span>
          </tr>
          <tr>
            <th>Extra Message </th>
            <td>{response.message}</td>
          </tr>
        </table>
      </Card>
    </div>
  );
};
