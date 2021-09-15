import { Typography } from 'antd';
import { Helmet } from 'react-helmet-async';

const { Title, Text } = Typography;

export const StudentMentorships = () => {
  return (
    <div className="mentorship-requests">
      <Helmet>
        <title>Student Mentorship Requests | Mentor Labs</title>
      </Helmet>
      <div className="container">
        <Title level={3}>Mentorship Requests</Title>
        <Text type="secondary">
          👉 View all the mentorship requests send by you to the mentors. You can click on the below cards and view the
          details of requests status and the reply send by the mentor to you.
        </Text>
      </div>
    </div>
  );
};
