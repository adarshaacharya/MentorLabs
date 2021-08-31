import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/landing.svg';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="hero">
        <div className="hero__about">
          <h1>
            Mentor <span className="text--primary">Labs.</span>
          </h1>
          <p>
            We are building next generation collaborative learning platform for connecting students with mentors
            worldwide.
          </p>
          <button onClick={() => navigate('/create-account')} className="btn--primary hero__signup-btn">
            Get started now
          </button>
        </div>
        <div className="hero__img">
          <img src={heroImg} alt="hero" />
        </div>
      </div>
    </div>
  );
};
