import { Tag, Typography } from 'antd';
import * as React from 'react';
import { AiOutlineFacebook, AiOutlineLinkedin, AiOutlineSlackSquare, AiOutlineTwitter } from 'react-icons/ai';
import { FaGithubSquare, FaGlobe } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { Channel, User } from 'types';

type UserCardProps = {
  user: User;
};

const { Paragraph } = Typography;

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const renderSocialChannels = (channels: Channel[]) => {
    // show at most 3 channels
    const filteredChannels = channels.length > 3 ? channels.slice(0, 3) : channels;

    return (
      <>
        {filteredChannels.map((channel) => {
          const { link, site } = channel;
          return (
            <span key={site}>
              {site === 'facebook' && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="card__link">
                  <AiOutlineFacebook size={'1.8em'} title="Facebook" />
                </a>
              )}
              {site === 'linkedin' && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="card__link">
                  <AiOutlineLinkedin size={'1.8em'} title="Linkedin" />
                </a>
              )}
              {site === 'twitter' && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="card__link">
                  <AiOutlineTwitter size={'1.8em'} title="Twitter" />
                </a>
              )}
              {site === 'github' && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="card__link">
                  <FaGithubSquare size={'1.8em'} title="GitHub" />
                </a>
              )}
              {site === 'slack' && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="card__link">
                  <AiOutlineSlackSquare size={'1.8em'} title="Slack" />
                </a>
              )}
              {site === 'portfolio' && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="card__link">
                  <FaGlobe size={'1.8em'} title="Website" />
                </a>
              )}
            </span>
          );
        })}
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
        <Link to={`/users/${user.id}`} className="text--primary">
          {user.name}
        </Link>
      </div>
      <div className="card__title">{user.profile.title}</div>
      <Paragraph className="card__detail" ellipsis={{ rows: 2 }}>
        {user.profile.description}
      </Paragraph>
      <div className="card__tags">{userTagsElement}</div>
      <div className="card__links">{renderSocialChannels(user.profile.channels)}</div>
    </div>
  );
};
