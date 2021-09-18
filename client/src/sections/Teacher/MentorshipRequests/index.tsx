import { Divider, Typography } from 'antd';
import { MentorshipRequestCard } from 'core-ui';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchMentorshipRequestsOfMentor } from 'store/mentorship/mentorship.action';

const { Title, Text } = Typography;
export const TeacherMentorshipRequests = () => {
  const dispatch = useAppDispatch();
  const { requests, status } = useAppSelector((state) => state.mentorship);

  React.useEffect(() => {
    dispatch(fetchMentorshipRequestsOfMentor());
  }, []);

  if (status === 'resolved' && requests.length < 1) {
    return (
      <div className="mentorship-requests h-90 text--center">
        <div className="container">
          <Title level={5} type="secondary">
            You haven't got any mentorship request. 🙏{' '}
          </Title>
        </div>
      </div>
    );
  }

  return (
    <div className="mentorship-requests">
      <Helmet>
        <title>Teacher Mentorship Requests | Mentor Labs</title>
      </Helmet>

      <div className="container">
        <Divider orientation="left">
          <Title level={4}>Incoming Requests.</Title>
        </Divider>
        <Text type="secondary">
          👉 View all the mentorship requests sent to you by the mentees/students. You can click on the below cards and
          view the details of requests status and the reply send by the mentees to you.
        </Text>

        <div className="py-2">
          {requests.map((request) => {
            return (
              <div className="py-2" key={request.id}>
                <MentorshipRequestCard request={request} loading={status === 'pending'} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
