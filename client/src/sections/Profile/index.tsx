import { Col, Row, Spin } from 'antd';
import { useAppDispatch, useAppSelector, useScrollToTop } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { fetchProfile } from 'store/profile/profile.action';
import { ProfileDetails, ProfileMainCard } from './components';

export const Profile = () => {
  const { id } = useParams();
  const { status, user } = useAppSelector((state) => state.profile);
  const { user: viewer } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProfile(id));

    //eslint-disable-next-line
  }, [id]);

  useScrollToTop();

  if (status === 'pending' || !user) {
    return (
      <section className="body-center">
        <div className="container">
          <Spin size="large" tip="Loading profile.." />
        </div>
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
