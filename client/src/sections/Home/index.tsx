import { Helmet } from 'react-helmet-async';
import { About, Contact, Hero } from './components';

export const Home = () => {
  return (
    <section className="home">
      <Helmet>
        <title>Home | Mentor Labs</title>
      </Helmet>
      <Hero />
      <About />
      <Contact />
    </section>
  );
};
