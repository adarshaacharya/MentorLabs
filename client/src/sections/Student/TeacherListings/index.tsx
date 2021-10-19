import { Switch, Typography } from 'antd';
import { EmptyPageMessage } from 'core-ui';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchMentors, fetchRecommendedMentors } from 'store/users/users.action';
import { MentorCards } from './components';

const { Paragraph } = Typography;
export const TeacherListings = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(fetchMentors());
  }, [dispatch]);

  const onSwitchChange = (checked: boolean) => {
    if (checked) {
      return dispatch(fetchRecommendedMentors());
    }

    return dispatch(fetchMentors());
  };

  if (!user.profile) {
    return (
      <section className="teacher-listings">
        <Helmet>
          <title>Teacher Listings | Mentor Labs</title>
        </Helmet>
        <div className="container">
          <EmptyPageMessage message="Please create your profile to view the list of mentors and use recommendation feature." />
        </div>
      </section>
    );
  }

  return (
    <section className="teacher-listings">
      <Helmet>
        <title>Teacher Listings | Mentor Labs</title>
      </Helmet>
      <div className="container">
        <Paragraph type="secondary" className="text--center">
          Toggle the switch below to turn on or off the smart recommendation based on Jaccard algorithm. Our algorithm
          is trained on the basis of your profile skills, lanugaes, country and other data , so please update your
          profile with correct information.
        </Paragraph>
        <div className="recommendation__switch">
          <Switch onChange={onSwitchChange} />
        </div>

        <MentorCards />
      </div>
    </section>
  );
};
