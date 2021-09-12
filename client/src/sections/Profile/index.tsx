import { Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { fetchProfile } from 'store/profile/profile.action';
import { ProfileMainDetails } from './components';

export const Profile = () => {
  const { id } = useParams();
  const { user, status } = useAppSelector((state) => state.profile);
  const { user: viewer } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProfile(id));
  }, []);

  if (status === 'pending') {
    return (
      <section className="loading">
        <div className="container">Loading account...</div>
      </section>
    );
  }

  const viewerIsUser = viewer.id === user.id;

  const userProfileMainElement = <ProfileMainDetails viewerIsUser={viewerIsUser} user={user} />;

  return (
    <section className="profile">
      <Helmet>
        <title> Profile | Mentor Labs</title>
      </Helmet>
      <div className="container">
        <div className="profile__details">
          <Row>
            <Col span={24}>{userProfileMainElement}</Col>
          </Row>
        </div>
      </div>
    </section>
  );
};
