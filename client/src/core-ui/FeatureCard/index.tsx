import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

type FeatureCardProps = {
  title: string;
  icon: JSX.Element;
  description: string;
  link: string;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, description, link }) => {
  return (
    <Link to={link}>
      <Card className="feature-card text--center" hoverable>
        <div className="mb-1">{icon}</div>
        <Title level={5}>{title}</Title>
        <Paragraph type="secondary">{description}</Paragraph>
      </Card>
    </Link>
  );
};
