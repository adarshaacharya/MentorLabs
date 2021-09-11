import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { fetchProfile } from 'store/profile/profile.action';

export const Profile = () => {
  const { id } = useParams();
  const { user, status } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProfile(id));
  }, []);

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  return (
    <section className="profile">
      <Helmet>
        <title> Profile | Mentor Labs</title>
      </Helmet>
      <div className="container">
        <h1>Profile</h1>
        <p>{id}</p>
        {JSON.stringify(user, null, 2)}
        THIS IS PROFILE PAGE
      </div>
    </section>
  );
};
