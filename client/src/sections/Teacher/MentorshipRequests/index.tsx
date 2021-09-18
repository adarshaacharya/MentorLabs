import { Divider, Typography } from 'antd';
import { Helmet } from 'react-helmet-async';

const { Title, Text } = Typography;
export const TeacherMentorshipRequests = () => {
  return (
    <div className="mentorship-requests">
      <Helmet>
        <title>Teacher Mentorship Requests | Mentor Labs</title>
      </Helmet>

      <div className="container">
        <Divider orientation="left">
          <Title level={4}>Outgoing Requests.</Title>
        </Divider>
        <Text type="secondary">
          👉 View all the mentorship requests sent to you by the mentees/students. You can click on the below cards and
          view the details of requests status and the reply send by the mentees to you.
        </Text>

        {/* <div className="py-2">
          {requests.map((request) => {
            return (
              <div className="py-2" key={request.id}>
                <MentorshipRequestCard request={request} loading={status === 'pending'} />
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};
