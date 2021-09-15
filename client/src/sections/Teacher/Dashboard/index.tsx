import { Typography } from 'antd';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

const { Title } = Typography;

export const TeacherDashboard = () => {
  return (
    <div className="dashboard">
      <Helmet>
        <title>Teacher Dashboard | Mentor Labs</title>
      </Helmet>
      <div className="container">
        <div className="dashboard__title mb-5">
          <Title>Teacher Dashboard</Title>
        </div>
      </div>
    </div>
  );
};
