import { Card, Divider, Typography } from 'antd';
import { MentorshipRequestStatus } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { fetchMentorshipRequestOfMentor } from 'store/mentorship/mentorship.action';
import { displayErrorMessage } from 'utils/notifications';
import { MentorshipResponseForm, TeacherMentorshipRequestDetails } from './components';
import { TeacherMentorshipResponseDetails } from './components/MentorshipResponseDetails';
import { MentorshipStatusUpdate } from './components/MentorshipStatusUpdate';

const { Title, Paragraph } = Typography;
export const TeacherMentorshipRequest = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { request, status, error } = useAppSelector((state) => state.mentorship);

  React.useEffect(() => {
    if (error && status === 'rejected') {
      displayErrorMessage(error);
    }
  }, [error, status]);

  React.useEffect(() => {
    dispatch(fetchMentorshipRequestOfMentor(id));
  }, []);

  const loading = status === 'pending' && !request;

  const updateStatusElement = request.status === MentorshipRequestStatus.PENDING ? <MentorshipStatusUpdate /> : null;

  const mentorshipResponseElement =
    request.status === MentorshipRequestStatus.APPROVED ? (
      request.response ? (
        <TeacherMentorshipResponseDetails response={request.response} />
      ) : (
        <MentorshipResponseForm />
      )
    ) : request.status === MentorshipRequestStatus.REJECTED ? (
      <Paragraph type="secondary">
        You've rejected this person mentorship request. If you think that's by mistake contact to mentee via email. 😊
      </Paragraph>
    ) : null;

  return (
    <div className="mentorship-request">
      <div className="container">
        <Helmet>
          <title>Teacher Mentorship Request | Mentor Labs</title>
        </Helmet>
        <Divider orientation="left">
          <Title level={4}>Incoming Mentorship Request Status.</Title>
        </Divider>
        <Paragraph type="secondary">
          Be sure to read all the details before accepting the mentorship. We highly recommend you to check the mentee
          profile to make sure that there won't be any communication barrier.
        </Paragraph>

        <Card className="mentorship-request__card my-2 p-1" loading={loading}>
          <div>
            <TeacherMentorshipRequestDetails request={request} />
          </div>

          <div>{updateStatusElement}</div>
        </Card>
        <div>{mentorshipResponseElement}</div>
      </div>
    </div>
  );
};
