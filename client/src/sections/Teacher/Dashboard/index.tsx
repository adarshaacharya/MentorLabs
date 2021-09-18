import { Col, Divider, Row, Typography } from 'antd';
import { FeatureCard } from 'core-ui';
import { useAppSelector } from 'hooks';
import { Helmet } from 'react-helmet-async';
import { FaMobileAlt } from 'react-icons/fa';
import { ImLab } from 'react-icons/im';
import { Link } from 'react-router-dom';
const { Title, Paragraph } = Typography;

export const teacherDashboardFeatues = [
  {
    title: 'Incoming Requests',
    description: 'View all the incoming requests send by students to you.',
    icon: <FaMobileAlt size={'5em'} />,
    link: '/teacher-requests',
  },
  {
    title: 'Explore labs',
    description: 'Explore our interactive video and audio chat labs.',
    icon: <ImLab size={'5em'} />,
    link: '/labs',
  },
];

export const TeacherDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="teacher-dashboard">
      <Helmet>
        <title>Teacher Dashboard | Mentor Labs</title>
      </Helmet>
      <div className="container">
        <div className="teacher-dashboard__title mb-5">
          <Divider orientation="left">
            <Title level={4}>Mentor Dashboard</Title>
          </Divider>
          <Paragraph type="secondary">
            View the different sections by clicking on the cards below. Make sure that you fill up your{' '}
            <Link to={`/users/${user.id}`}>profile details</Link> before using given features.
          </Paragraph>

          <div className="teacher-dashboard__features">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {teacherDashboardFeatues.map((feature) => (
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
