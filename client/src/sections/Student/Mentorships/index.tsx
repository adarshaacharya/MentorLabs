import { Avatar, Button, Card, Col, Row, Space, Tag, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { fetchMentorshipRequestsByStudent } from 'store/mentorship/mentorship.action';
import { MentorshipRequest } from 'types';

const { Title, Text, Paragraph } = Typography;

type MentorshipRequestCardProps = {
  request: MentorshipRequest;
};

const MentorshipRequestCard: React.FC<MentorshipRequestCardProps> = ({ request }) => {
  return (
    <Card className="mentorship-request-card">
      <Row justify="space-between">
        <Col>
          <Space size="middle" className="mentorship-request-card__user">
            <Avatar size={65} src={request.mentor.avatar} />
            <div>
              <Link to={`/users/${request.mentor.id}`}>
                <b>{request.mentor.name}</b>
              </Link>
              <p>{new Date(request.createdAt).toDateString()} </p>
            </div>
          </Space>
        </Col>

        <Col>
          <Tag color="processing">{request.status}</Tag>
        </Col>
      </Row>

      <Title level={5} className="mt-1" type="secondary">
        <Link to={`/student-requests/${request.id}`}>{request.title}</Link>
      </Title>
      <p className="mentorship-request-card__message">
        <Paragraph ellipsis={{ rows: 3 }}>{request.message}</Paragraph>
      </p>
      <Button type="primary">View full details</Button>
    </Card>
  );
};

export const StudentMentorships = () => {
  const dispatch = useAppDispatch();
  const { requests, status } = useAppSelector((state) => state.mentorship);

  React.useEffect(() => {
    dispatch(fetchMentorshipRequestsByStudent());
  }, []);

  if (status === 'pending') {
    return (
      <div className="loading">
        <div className="container">Loading mentorship requests...</div>
      </div>
    );
  }

  if (requests.length < 1) {
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
        <Title level={3}>Mentorship Requests.</Title>
        <Text type="secondary">
          👉 View all the mentorship requests send by you to the mentors. You can click on the below cards and view the
          details of requests status and the reply send by the mentor to you.
        </Text>

        <div className="py-2">
          {requests.map((request) => {
            return (
              <div className="py-2" key={request.id}>
                <MentorshipRequestCard request={request} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
