import { Tag } from 'antd';
import * as React from 'react';
import { ImFacebook, ImLocation } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { Channels, User } from 'types';

type UserCardProps = {
  user: User;
};

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const renderSocialChannels = (socials: Channels) => {
    return (
      <>
        {socials.facebook ? (
          <a href={user.profile.channels.facebook} target="_blank" rel="noopener noreferrer" className="card__link">
            <ImFacebook size={'1.2em'} />
          </a>
        ) : null}
        {socials.linkedin ? (
          <a href={user.profile.channels.linkedin} target="_blank" rel="noopener noreferrer" className="card__link">
            <ImFacebook size={'1.2em'} />
          </a>
        ) : null}
        {socials.twitter ? (
          <a href={user.profile.channels.twitter} target="_blank" rel="noopener noreferrer" className="card__link">
            <ImFacebook size={'1.2em'} />
          </a>
        ) : null}
      </>
    );
  };

  const userTagsElement = user.profile.tags.map((tag) => (
    <Tag color="geekblue" key={tag}>
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
        <Link to={`/user/${user.id}`} className="text--primary">
          {user.name}
        </Link>
      </div>
      <div className="card__title">{user.profile.title}</div>
      <div className="card__detail">{user.profile.description}</div>
      <div className="card__tags">{userTagsElement}</div>
      <div className="card__links">{renderSocialChannels(user.profile.channels)}</div>
    </div>
  );
};
