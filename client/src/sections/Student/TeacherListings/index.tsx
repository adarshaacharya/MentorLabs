import { Col, Row } from 'antd';
import { UserCard } from 'core-ui';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchMentors } from 'store/users/users.action';

export const TeacherListings = () => {
  const dispatch = useAppDispatch();
  const { mentors, status } = useAppSelector((state) => state.users);

  React.useEffect(() => {
    dispatch(fetchMentors());
  }, [dispatch]);

  if (status === 'pending') {
    return (
      <section className="loading">
        <div className="container">
          <p>Loading mentors..</p>
        </div>
      </section>
    );
  }

  const mentorListingsElement = (
    <Row>
      {mentors.map((mentor) => (
        <Col xs={12} xl={8} key={mentor.id}>
          <UserCard user={mentor} key={mentor.id} />
        </Col>
      ))}
    </Row>
  );

  return (
    <section className="teacher-listings">
      <Helmet>
        <title>Teacher Listings | Mentor Labs</title>
      </Helmet>
      <div className="container">
        <div className="card-lists">{mentorListingsElement}</div>
      </div>
    </section>
  );
};
