import { Col, Row } from 'antd';
import { useAppDispatch, useAppSelector, useScrollToTop } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { fetchProfile } from 'store/profile/profile.action';
import { ProfileMainCard, ProfileDetails, ProfileMentorshipRequest } from './components';

export const Profile = () => {
  const { id } = useParams();
  const { status, user } = useAppSelector((state) => state.profile);
  const { user: viewer } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProfile(id));
  }, [id]);

  useScrollToTop();

  if (status === 'pending' && !user) {
    return (
      <section className="loading">
        <div className="container">Loading account...</div>
      </section>
    );
  }

  const viewerIsUser = viewer.id === user.id;

  const userProfileMainElement = <ProfileMainCard viewerIsUser={viewerIsUser} user={user} />;

  const userProfileDetailsElement = <ProfileDetails viewerIsUser={viewerIsUser} user={user} />;

  return (
    <section className="profile">
      <Helmet>
        <title> Profile | Mentor Labs</title>
      </Helmet>
      <div className="container">
        <div className="profile__wrapper">
          <Row>
            <Col span={24}>{userProfileMainElement}</Col>
          </Row>
          <Row>
            <Col span={24}>{userProfileDetailsElement}</Col>
          </Row>
        </div>
      </div>
    </section>
  );
};
