import { Helmet } from 'react-helmet-async';

export const Student = () => {
  return (
    <section className="dashboard">
      <Helmet>
        <title>Student Dashboard | Mentor Labs</title>
      </Helmet>
      <div className="container">Student Dashboard</div>
    </section>
  );
};
