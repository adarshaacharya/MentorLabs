import { Card, Typography } from 'antd';
import { useNavigate } from 'react-router';

const { Title, Paragraph } = Typography;

type FeatureCardProps = {
  title: string;
  icon: JSX.Element;
  description: string;
  link: string;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, description, link }) => {
  const navigate = useNavigate();
  return (
    <div className="feature-card" onClick={() => navigate(link)}>
      <Card className="text--center" hoverable>
        <div className="mb-1">{icon}</div>
        <Title level={5}>{title}</Title>
        <Paragraph type="secondary">{description}</Paragraph>
      </Card>
    </div>
  );
};
