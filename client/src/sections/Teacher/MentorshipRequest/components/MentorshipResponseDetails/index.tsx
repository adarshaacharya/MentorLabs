import { Button, Card, Divider, Typography } from 'antd';
import { MentorshipResponseData } from 'types';
import { displaySuccessNotification } from 'utils/notifications';

type TeacherMentorshipResponseDetailsProps = {
  response: MentorshipResponseData;
};
const { Title, Paragraph } = Typography;

export const TeacherMentorshipResponseDetails: React.FC<TeacherMentorshipResponseDetailsProps> = ({ response }) => {
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
          You have accepted the metroship request succesfully. Click the session link to join the mentorship session on
          the particular date / time. If there is change is schedule or want to cancel the session email the mentee
          directly.
        </Paragraph>
      </div>

      <Card className="mentorship-response__card mb-1 p-1">
        <table>
          <tbody>
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
              <th>Room Id </th>
              <td>
                <span className="text--link cursor-pointer" onClick={() => copyRoomId(response.roomId)}>
                  {response.roomId}
                </span>
              </td>
            </tr>
            <tr>
              <th>Extra Message </th>
              <td>{response.message}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};
