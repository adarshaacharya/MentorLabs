import * as React from 'react';
import { AiOutlineFacebook, AiOutlineLinkedin, AiOutlineSlackSquare, AiOutlineTwitter } from 'react-icons/ai';
import { FaGithubSquare, FaGlobe } from 'react-icons/fa';
import { Channel } from 'types';

type SocialChannelsProp = {
  channels: Channel[];
  isUserCard?: boolean;
};

export const SocialChannels: React.FC<SocialChannelsProp> = ({ channels, isUserCard }) => {
  const filteredChannels = isUserCard ? channels.slice(0, 3) : channels;
  return (
    <div className="social-channels">
      {filteredChannels.map((channel) => {
        const { link, site } = channel;
        return (
          <span key={site}>
            {site === 'facebook' && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="card__link">
                <AiOutlineFacebook size={'2em'} title="Facebook" />
              </a>
            )}
            {site === 'linkedin' && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="card__link">
                <AiOutlineLinkedin size={'2em'} title="Linkedin" />
              </a>
            )}
            {site === 'twitter' && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="card__link">
                <AiOutlineTwitter size={'2em'} title="Twitter" />
              </a>
            )}
            {site === 'github' && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="card__link">
                <FaGithubSquare size={'2em'} title="GitHub" />
              </a>
            )}
            {site === 'slack' && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="card__link">
                <AiOutlineSlackSquare size={'2em'} title="Slack" />
              </a>
            )}
            {site === 'portfolio' && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="card__link">
                <FaGlobe size={'2em'} title="Website" />
              </a>
            )}
          </span>
        );
      })}
    </div>
  );
};
