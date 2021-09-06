import { Helmet } from 'react-helmet-async';
import { Typography } from 'antd';
import { UserCard } from 'core-ui';

const { Title } = Typography;
export const Teacher = () => {
  <Helmet>
    <title>Teacher Dashboard | Mentor Labs</title>
  </Helmet>;
  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard__title mb-5">
          <Title>Teacher Dashboard</Title>
        </div>
        <UserCard />
      </div>
    </div>
  );
};
