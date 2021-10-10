import { Col, Divider, Row, Typography } from 'antd';
import { FeatureCard } from 'core-ui';
import { useAppSelector } from 'hooks';
import { Helmet } from 'react-helmet-async';
import { FaChalkboardTeacher, FaFacebookMessenger } from 'react-icons/fa';
import { ImLab } from 'react-icons/im';
import { Link } from 'react-router-dom';
const { Title, Paragraph } = Typography;

export const studentDashboardFeatures = [
  {
    title: 'View Mentors',
    description: 'View all the mentors waiting for your requests.',
    icon: <FaChalkboardTeacher size={'5em'} />,
    link: '/teacher-listings',
  },
  {
    title: 'Outgoing Requests',
    description: 'View all the incoming requests send by you to mentors.',
    icon: <FaFacebookMessenger size={'5em'} />,
    link: '/student-requests',
  },
  {
    title: 'Explore labs',
    description: 'Explore our interactive video and audio chat labs.',
    icon: <ImLab size={'5em'} />,
    link: '/labs',
  },
];

export const StudentDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="student-dashboard">
      <Helmet>
        <title>Student Dashboard | Mentor Labs</title>
      </Helmet>
      <div className="container">
        <div className="student-dashboard__title mb-5">
          <Divider orientation="left">
            <Title level={4}>Student Dashboard</Title>
          </Divider>
          <Paragraph type="secondary">
            View the different sections by clicking on the cards below. Make sure that you fill up your{' '}
            <Link to={`/users/${user.id}`}>profile details</Link> before using given features.
          </Paragraph>

          <div className="student-dashboard__features">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {studentDashboardFeatures.map((feature) => (
                <Col span={8} key={feature.link} className="mb-2">
                  <FeatureCard {...feature} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
