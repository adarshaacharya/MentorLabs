import { useNavigate } from 'react-router-dom';
import heroImg from './assets/landing.svg';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="home">
      <div className="container">
        <div className="hero">
          <div className="hero__about">
            <h1>Mentor Labs.</h1>
            <p>
              We are building next generation collaborative learning platform for connecting the mentors and students
              all around the globe.
            </p>

            <button onClick={() => navigate('/create-account')} className="hero__signup-btn">
              Get Started Now
            </button>
          </div>

          <div className="hero__img">
            <img src={heroImg} alt="hero" />
          </div>
        </div>
      </div>
    </section>
  );
};
