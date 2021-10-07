import { Tag, Typography } from 'antd';
import { SocialChannels } from 'core-ui';
import * as React from 'react';
import { ImLocation } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { User } from 'types';

type UserCardProps = {
  user: User;
};

const { Paragraph } = Typography;

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  if (!user.profile) {
    return <p>Loading user..</p>;
  }

  const userTagsElement = user.profile.tags.map((tag) => (
    <Tag color="processing" key={tag}>
      {tag}
    </Tag>
  ));

  return (
    <div className="card">
      <img src={user.avatar} loading="lazy" alt={user.name} className="card__img" />
      <div className="card__location">
        <ImLocation /> {user.profile.country}
      </div>
      <div className="card__name">
        <Link to={`/users/${user.id}`} className="text--primary">
          {user.name}
        </Link>
      </div>
      <div className="card__title">{user.profile.title}</div>
      <Paragraph className="card__detail" ellipsis={{ rows: 2 }}>
        {user.profile.description}
      </Paragraph>
      <div className="card__tags">{userTagsElement}</div>
      <div className="card__links">
        <SocialChannels channels={user.profile.channels} isUserCard={true} />
      </div>
    </div>
  );
};
