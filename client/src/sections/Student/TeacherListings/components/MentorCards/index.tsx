import { Col, Row, Typography } from 'antd';
import { UserCard } from 'core-ui';
import { useAppSelector } from 'hooks';

const { Paragraph } = Typography;

export const MentorCards = () => {
  const { mentors, status } = useAppSelector((state) => state.users);

  if (status === 'pending') {
    return (
      <section className="loading">
        <div className="container">
          <Paragraph type="secondary">Loading mentors..</Paragraph>
        </div>
      </section>
    );
  }

  return (
    <div className="card-lists">
      <Row>
        {mentors.map((mentor) => (
          <Col xs={12} xl={8} key={mentor.id}>
            <UserCard user={mentor} key={mentor.id} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
