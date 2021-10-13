import { Card, Divider, Typography } from 'antd';
import { MentorshipRequestStatus } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { fetchMentorshipRequestByStudent } from 'store/mentorship/mentorship.action';
import { StudentMentorshipRequestDetails, StudentMentorshipResponseDetails } from './components';

const { Title, Paragraph } = Typography;

export const StudentMentorshipRequest = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { request, status } = useAppSelector((state) => state.mentorship);

  React.useEffect(() => {
    dispatch(fetchMentorshipRequestByStudent(id));
  }, [id]);

  const loading = status === 'pending';

  const mentorshipResponseElement =
    request.status === MentorshipRequestStatus.APPROVED ? (
      request.response ? (
        <StudentMentorshipResponseDetails response={request.response} />
      ) : (
        <Paragraph type="secondary">
          Your mentorship request was accept but you haven't got any reply from mentor about event details. Wait for
          sometime or contact mentor via email about details.
        </Paragraph>
      )
    ) : request.status === MentorshipRequestStatus.REJECTED ? (
      <Paragraph type="secondary">
        Your mentorship request has been rejected. Don't worry other mentors are waiting for you !😊
      </Paragraph>
    ) : null;

  return (
    <div className="mentorship-request">
      <div className="container">
        <Helmet>
          <title>Outgoing Student Mentorship Request | Mentor Labs</title>
        </Helmet>
        <Divider orientation="left">
          <Title level={4}>Outgoing Mentorship Request Status.</Title>
        </Divider>

        <Card className="mentorship-request__card my-2 p-1" loading={loading}>
          <StudentMentorshipRequestDetails request={request} />
        </Card>

        <div>{mentorshipResponseElement}</div>
      </div>
    </div>
  );
};
