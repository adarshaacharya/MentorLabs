import { Card, Tag } from 'antd';
import { ImFacebook, ImLinkedin2, ImLocation, ImTwitter } from 'react-icons/im';

const { Meta } = Card;

export const UserCard = () => {
  return (
    <div className="card">
      <img
        src="https://pbs.twimg.com/profile_images/1419164889478701058/MhTyfZPO_400x400.jpg"
        alt="profile img"
        className="card__img"
      />
      <div className="card__location">
        <ImLocation /> NP
      </div>
      <div className="card__name">Addy Osmani</div>
      <div className="card__title">Engineer Manager</div>
      <div className="card__detail">
        Passionate software developer. Addicted to the Linux operating system, I love learning new things and working
        with all the open source tech.
      </div>
      <div className="card__tags">
        <Tag color="geekblue">docker</Tag>
        <Tag color="purple">php</Tag>
        <Tag color="magenta">linux</Tag>
      </div>
      <div className="card__links">
        <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer" className="card__link">
          <ImFacebook size={'1.2em'} />
        </a>
        <a href="http://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="card__link">
          <ImLinkedin2 size={'1.2em'} />
        </a>
        <a href="http://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="card__link">
          <ImTwitter size={'1.2em'} />
        </a>
      </div>
    </div>
  );
};
