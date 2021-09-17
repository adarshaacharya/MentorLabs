import { Avatar, Button, Card, Col, Divider, Row, Space, Tag, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMentorshipRequestsByStudent } from 'store/mentorship/mentorship.action';
import { MentorshipRequest } from 'types';

const { Title, Text, Paragraph } = Typography;

type MentorshipRequestCardProps = {
  request: MentorshipRequest;
  loading: boolean;
};

const MentorshipRequestCard: React.FC<MentorshipRequestCardProps> = ({ request, loading }) => {
  const navigate = useNavigate();
  return (
    <Card className="mentorship-request-card" loading={loading}>
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
      <Link to={`/student-requests/${request.id}`}>
        <Title level={5} className="mt-1">
          {request.title}
        </Title>
      </Link>
      <div className="mentorship-request-card__message">
        <Paragraph ellipsis={{ rows: 3 }}>{request.message}</Paragraph>
      </div>
      <Button type="primary" onClick={() => navigate(`/student-requests/${request.id}`)}>
        View full details
      </Button>
    </Card>
  );
};

export const StudentMentorships = () => {
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
