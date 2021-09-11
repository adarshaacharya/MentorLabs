import * as React from 'react';
import { Col, Row, Typography } from 'antd';
import { UserCard } from 'core-ui';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch } from 'hooks';
import { fetchMentors } from 'store/users/users.action';

const { Title } = Typography;

export const Student = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchMentors());
  }, []);

  return (
    <section className="dashboard">
      <Helmet>
        <title>Student Dashboard | Mentor Labs</title>
      </Helmet>
      <div className="container">
        <div className="card-lists">
          <Row>
            <Col xs={12} xl={8}>
              <UserCard />
            </Col>
            <Col xs={12} xl={8}>
              <UserCard />
            </Col>
            <Col xs={12} xl={8}>
              <UserCard />
            </Col>
            <Col xs={12} xl={8}>
              <UserCard />
            </Col>
            <Col xs={12} xl={8}>
              <UserCard />
            </Col>
            <Col xs={12} xl={8}>
              <UserCard />
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};
