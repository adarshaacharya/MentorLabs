import { Card, Divider, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';

const { Title, Paragraph } = Typography;
export const StudentMentorshipRequest = () => {
  return (
    <div className="mentorship-request">
      <div className="container">
        <Helmet>
          <title>Student Mentorship Request | Mentor Labs</title>
        </Helmet>
        <Divider orientation="left">
          <Title level={4}>Mentorship Request Status.</Title>
        </Divider>

        <Card className="mentorship-request__card my-2 p-1">
          <table>
            <tr>
              <th>Title</th>
              <td>About database design</td>
            </tr>

            <tr>
              <th>Background</th>
              <td>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In, unde velit! Recusandae obcaecati aperiam
                tempora nulla dolore cupiditate possimus in. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Qui, harum!
              </td>
            </tr>

            <tr>
              <th>Expectations</th>
              <td>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et tempore saepe vitae unde nisi magnam enim
                quos dolor ullam sunt.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, harum!
              </td>
            </tr>

            <tr>
              <th>Message</th>
              <td>
                {' '}
                Message Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, soluta tempora iure omnis
                veniam laboriosam. Vitae sequi hic architecto ut.Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Qui, harum!
              </td>
            </tr>

            <tr>
              <th>Status</th>
              <td>Pending</td>
            </tr>

            <tr>
              <th>Submision Date</th>
              <td>6th Dec, 2021</td>
            </tr>

            <tr>
              <th>Mentor</th>
              <td>Aadarsha Acharya</td>
            </tr>

            <tr>
              <th>Mentee</th>
              <td>Sanjay Singh</td>
            </tr>
          </table>
        </Card>
      </div>
    </div>
  );
};
