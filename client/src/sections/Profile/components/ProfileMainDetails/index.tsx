import { Avatar, Button, Card, Col, Divider, Row, Tag, Typography } from 'antd';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { User } from 'types';

type UserProfileProps = {
  user: User;
  viewerIsUser: boolean;
};

const { Paragraph, Text } = Typography;

export const ProfileMainDetails: React.FC<UserProfileProps> = ({ user, viewerIsUser }) => {
  return (
    <Card className="profile-main">
      <div className="profile-main__avatar">
        <Avatar size={150} src={user.avatar} className="mb-1" />
        <Paragraph>
          <Tag icon={<AiOutlineCheckCircle />} color={`${user.role === 'Student' ? 'cyan' : 'magento'}`}>
            &nbsp; {user.role}
          </Tag>
        </Paragraph>
      </div>
      <Divider orientation="left">
        <Text strong>Details</Text>
      </Divider>
      <div className="profile-main__details">
        <Paragraph>
          👉 Name : <Text>{user.name} </Text>
        </Paragraph>
        <Paragraph>
          👉 Contact : <Text>{user.email}</Text>
        </Paragraph>
      </div>
    </Card>
  );
};
