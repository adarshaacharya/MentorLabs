import { Card, Divider, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { MentorshipResponseData } from 'types';

type TeacherMentorshipResponseDetailsProps = {
  response: MentorshipResponseData;
};
const { Title, Paragraph } = Typography;

export const TeacherMentorshipResponseDetails: React.FC<TeacherMentorshipResponseDetailsProps> = ({ response }) => {
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
            <th>Session Link </th>
            <td>
              <Link to={response.link}>{response.link}</Link>
            </td>
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
