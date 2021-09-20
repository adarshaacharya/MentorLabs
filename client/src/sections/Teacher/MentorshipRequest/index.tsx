import { Card, Divider, Typography } from 'antd';
import { StatusTag } from 'core-ui';
import { MentorshipRequestStatus } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { fetchMentorshipRequestOfMentor } from 'store/mentorship/mentorship.action';
import { MentorshipResponse } from './components';
import { MentorshipStatusUpdate } from './components/MentorshipStatusUpdate';

const { Title, Paragraph } = Typography;
export const TeacherMentorshipRequest = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { request, status } = useAppSelector((state) => state.mentorship);

  React.useEffect(() => {
    dispatch(fetchMentorshipRequestOfMentor(id));
  }, []);

  const loading = status === 'pending' && !request;

  const updateStatusElement = request.status === MentorshipRequestStatus.PENDING ? <MentorshipStatusUpdate /> : null;

  const mentorshipResponseElement =
    request.status === MentorshipRequestStatus.APPROVED ? (
      <MentorshipResponse />
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

        <Card className="mentorship-request__card my-2 p-1" loading={loading}>
          <table>
            <tbody>
              <tr>
                <th>Title</th>
                <td>{request.title}</td>
              </tr>
              <tr>
                <th>Background</th>
                <td>{request.background}</td>
              </tr>
              <tr>
                <th>Expectations</th>
                <td>{request.expectation}</td>
              </tr>
              <tr>
                <th>Message</th>
                <td>{request.message}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>
                  <StatusTag status={request.status} />
                </td>
              </tr>
              <tr>
                <th>Submision Date</th>
                <td>{request.createdAt}</td>
              </tr>
              <tr>
                <th>Mentor</th>
                <td>{request.mentorId}</td>
              </tr>
              <tr>
                <th>Mentee</th>
                <td>{request.menteeId}</td>
              </tr>
            </tbody>
          </table>

          <div>{updateStatusElement}</div>
        </Card>
        <div>{mentorshipResponseElement}</div>
      </div>
    </div>
  );
};
