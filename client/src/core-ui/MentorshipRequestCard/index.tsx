import { Avatar, Button, Card, Col, Row, Space, Typography } from 'antd';
import { StatusTag } from 'core-ui';
import moment from 'moment';
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

  if (!user) {
    return <p>Loading user...</p>;
  }

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
              <p>{moment(request.createdAt).startOf('hour').fromNow()}</p>
            </div>
          </Space>
        </Col>

        <Col>
          <StatusTag status={request.status} />
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
