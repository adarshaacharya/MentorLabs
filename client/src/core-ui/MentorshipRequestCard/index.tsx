import { Avatar, Button, Card, Col, Row, Space, Tag, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { MentorshipRequest } from 'types';

type MentorshipRequestCardProps = {
  request: MentorshipRequest;
  loading: boolean;
};

const { Title, Paragraph } = Typography;

export const MentorshipRequestCard: React.FC<MentorshipRequestCardProps> = ({ request, loading }) => {
  const navigate = useNavigate();

  const user = request.mentor ?? request.mentee;

  const url = request.mentor ? `/student-requests/${request.id}` : `/teacher-requests/${request.id}`;

  return (
    <Card className="mentorship-request-card" loading={loading}>
      <Row justify="space-between">
        <Col>
          <Space size="middle" className="mentorship-request-card__user">
            <Avatar size={65} src={user.avatar} />
            <div>
              <Link to={`/users/${user.id}`}>
                <b>{user.name}</b>
              </Link>
              <p>{new Date(request.createdAt).toDateString()} </p>
            </div>
          </Space>
        </Col>

        <Col>
          <Tag color="processing">{request.status}</Tag>
        </Col>
      </Row>
      <Link to={url}>
        <Title level={5} className="mt-1">
          {request.title}
        </Title>
      </Link>
      <div className="mentorship-request-card__message">
        <Paragraph ellipsis={{ rows: 3 }}>{request.message}</Paragraph>
      </div>
      <Button type="primary" onClick={() => navigate(url)}>
        View full details
      </Button>
    </Card>
  );
};
