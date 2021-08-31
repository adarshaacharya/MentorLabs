import { Col, Row } from 'antd';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="flex">
          <div className="footer__copyright"> © {new Date().getFullYear()} All rights reserved. MentorLabs</div>
          <div className="footer__links">
            <a href="https://github.com/adarshaacharya/MentorLabs" target="_blank" rel="noreferrer">
              Privacy
            </a>
            <a href="https://github.com/adarshaacharya/MentorLabs" target="_blank" rel="noreferrer">
              Terms
            </a>
            <a href="https://github.com/adarshaacharya/MentorLabs" target="_blank" rel="noreferrer">
              Code Of Conduct
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
