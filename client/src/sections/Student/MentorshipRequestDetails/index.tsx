import { Card, Divider, Typography } from 'antd';
import { StatusTag } from 'core-ui';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { fetchMentorshipRequestByStudent } from 'store/mentorship/mentorship.action';

const { Title } = Typography;
export const StudentMentorshipRequest = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { request, status } = useAppSelector((state) => state.mentorship);

  React.useEffect(() => {
    dispatch(fetchMentorshipRequestByStudent(id));
  }, []);

  const loading = status === 'pending';

  return (
    <div className="mentorship-request">
      <div className="container">
        <Helmet>
          <title>Student Mentorship Request | Mentor Labs</title>
        </Helmet>
        <Divider orientation="left">
          <Title level={4}>Outgoing Mentorship Request Status.</Title>
        </Divider>

        <Card className="mentorship-request__card my-2 p-1" loading={loading}>
          <table>
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
          </table>
        </Card>
      </div>
    </div>
  );
};
