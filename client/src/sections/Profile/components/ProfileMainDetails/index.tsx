import { Button, Divider, Typography } from 'antd';
import * as React from 'react';
import { User } from 'types';

type UserProfileProps = {
  user: User;
  viewerIsUser: boolean;
};

const { Paragraph, Title } = Typography;
export const ProfileDetails: React.FC<UserProfileProps> = ({ user, viewerIsUser }) => {
  const checkUserProfile =
    !user.profile && !viewerIsUser ? (
      <Paragraph>
        This user hasn't yet created his profile.
        <br />
        So, our algorithm won't recommend this profile to the public feed. 🙏
      </Paragraph>
    ) : !user.profile && viewerIsUser ? (
      <>
        <Paragraph>
          For additional details you have to create your profile first. Our algorithm recommends your profile based on
          the data you've fed on profile. So, create profile asap. 🙏
        </Paragraph>
        <div className="text--center">
          <Button type="primary">Create Profile</Button>
        </div>
      </>
    ) : null;

  return (
    <div className="profile-details">
      <Divider orientation="left">
        <Title level={4} className="profile-details__title">
          Additional Details
        </Title>
      </Divider>
      {checkUserProfile}
    </div>
  );
};
