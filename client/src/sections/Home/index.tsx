import { Helmet } from 'react-helmet-async';
import { About } from './About';
import { Hero } from './Hero';

export const Home = () => {
  return (
    <section className="home">
      <Helmet>
        <title>Home | Mentor Labs</title>
      </Helmet>
      <Hero />
      <About />
    </section>
  );
};
