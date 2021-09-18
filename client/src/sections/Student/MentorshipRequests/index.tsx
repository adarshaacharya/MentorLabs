import { Divider, Typography } from 'antd';
import { MentorshipRequestCard } from 'core-ui';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchMentorshipRequestsByStudent } from 'store/mentorship/mentorship.action';

const { Title, Text } = Typography;

export const StudentMentorshipRequests = () => {
  const dispatch = useAppDispatch();
  const { requests, status } = useAppSelector((state) => state.mentorship);

  React.useEffect(() => {
    dispatch(fetchMentorshipRequestsByStudent());
  }, []);

  if (status === 'resolved' && requests.length < 1) {
    return (
      <div className="mentorship-requests h-90 text--center">
        <div className="container">
          <Title level={5}>You haven't send any mentorship request. 😞 </Title>
        </div>
      </div>
    );
  }

  return (
    <div className="mentorship-requests">
      <Helmet>
        <title>Student Mentorship Requests | Mentor Labs</title>
      </Helmet>
      <div className="container">
        <Divider orientation="left">
          <Title level={4}>Outgoing Requests.</Title>
        </Divider>
        <Text type="secondary">
          👉 View all the mentorship requests send by you to the mentors. You can click on the below cards and view the
          details of requests status and the reply send by the mentor to you.
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
