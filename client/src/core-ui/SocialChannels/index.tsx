import * as React from 'react';
import {
  AiFillTwitterSquare,
  AiOutlineFacebook,
  AiOutlineLinkedin,
  AiOutlineSlackSquare,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { FaGithubSquare, FaGlobe, FaUniversalAccess } from 'react-icons/fa';
import { Channels } from 'types';

type SocialChannelsProp = {
  channels: Channels;
};

export const SocialChannels: React.FC<SocialChannelsProp> = ({ channels }) => {
  const { facebook, linkedin, twitter, github, slack, website } = channels;
  return (
    <div className="social-channels">
      {facebook && (
        <a href={facebook} target="_blank" rel="noopener noreferrer" className="card__link">
          <AiOutlineFacebook size={'2em'} title="Facebook" />
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="card__link">
          <AiOutlineLinkedin size={'2em'} title="Linkedin" />
        </a>
      )}
      {twitter && (
        <a href={twitter} target="_blank" rel="noopener noreferrer" className="card__link">
          <AiOutlineTwitter size={'2em'} title="Twitter" />
        </a>
      )}
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className="card__link">
          <FaGithubSquare size={'2em'} title="GitHub" />
        </a>
      )}
      {slack && (
        <a href={slack} target="_blank" rel="noopener noreferrer" className="card__link">
          <AiOutlineSlackSquare size={'2em'} title="Slack" />
        </a>
      )}
      {twitter && (
        <a href={twitter} target="_blank" rel="noopener noreferrer" className="card__link">
          <AiFillTwitterSquare size={'2em'} title="Twitter" />
        </a>
      )}
      {website && (
        <a href={website} target="_blank" rel="noopener noreferrer" className="card__link">
          <FaGlobe size={'2em'} title="Website" />
        </a>
      )}
    </div>
  );
};
