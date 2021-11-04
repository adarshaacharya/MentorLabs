const RICK_ROLL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="flex">
          <div className="footer__copyright"> © {new Date().getFullYear()} All rights reserved. MentorLabs</div>
          <div className="footer__links">
            <a href={RICK_ROLL} target="_blank" rel="noreferrer">
              Privacy
            </a>
            <a href={RICK_ROLL} target="_blank" rel="noreferrer">
              Terms
            </a>
            <a href={RICK_ROLL} target="_blank" rel="noreferrer">
              Code Of Conduct
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
