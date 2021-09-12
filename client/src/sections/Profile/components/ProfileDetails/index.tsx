import { Button, Card, Divider, Tag, Typography } from 'antd';
import { SocialChannels } from 'core-ui';
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

  const profileDetailsElement = user.profile ? (
    <Card className="profile-details__wrapper">
      <div className="profile-details__position">
        <Title level={5}>Position</Title>
        <Paragraph>{user.profile.title}</Paragraph>
      </div>
      <Divider />
      <div className="profile-details__about">
        <Title level={5}>About</Title>
        <Paragraph>{user.profile.description}</Paragraph>
      </div>
      <Divider />
      <div className="profile-details__location ">
        <Title level={5}>Location</Title>
        {user.profile.country}
      </div>
      <Divider />
      <div className="profile-details__skills ">
        <Title level={5}>Skills</Title>
        {user.profile.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <Divider />
      <div className="profile-details__languages ">
        <Title level={5}>Languages</Title>
        {user.profile.languages.map((lang) => (
          <span className="pr-2" key={lang}>
            {' '}
            • {lang}
          </span>
        ))}
      </div>
      <Divider />
      <div className="profile-details__channels">
        <Title level={5}>Links</Title>
        <SocialChannels channels={user.profile.channels} />
      </div>
    </Card>
  ) : null;

  return (
    <div className="profile-details">
      <Divider orientation="left">
        <Title level={3} className="profile-details__title">
          <span className="text--primary">Additional Details.</span>
        </Title>
      </Divider>
      {checkUserProfile}
      {profileDetailsElement}
    </div>
  );
};
