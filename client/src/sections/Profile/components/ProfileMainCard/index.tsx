import { Avatar, Card, Divider, Tag, Typography } from 'antd';
import { Role } from 'enums';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { User } from 'types';
import { ProfileMentorshipRequest } from '..';

type UserProfileProps = {
  user: User;
  viewerIsUser: boolean;
};

const { Paragraph, Text, Title } = Typography;

export const ProfileMainCard: React.FC<UserProfileProps> = ({ user, viewerIsUser }) => {
  const mentorshipApplyElement = !viewerIsUser && user.role === Role.TEACHER ? <ProfileMentorshipRequest /> : null;

  return (
    <Card className="profile-main">
      <div className="profile-main__avatar">
        <Avatar size={150} src={user.avatar} className="mb-1" />
        <Title level={5} className="text--primary">
          {user.name}
        </Title>
        <Paragraph>
          <Tag icon={<AiOutlineCheckCircle />} color={`${user.role === 'Student' ? 'geekblue' : 'cyan'}`}>
            &nbsp; {user.role}
          </Tag>
        </Paragraph>
      </div>
      <Divider orientation="left">
        <Text strong>Details</Text>
      </Divider>
      <div className="profile-main__details">
        <Paragraph>
          👉 Full Name : <Text>{user.name} </Text>
        </Paragraph>
        <Paragraph>
          👉 Contact : <a href={`emailto: ${user.email}`}>{user.email}</a>
        </Paragraph>
      </div>
      <div className="profile-main__apply text--center">{mentorshipApplyElement}</div>
    </Card>
  );
};
