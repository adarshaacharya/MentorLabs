import { Helmet } from 'react-helmet-async';

export const StudentLabs = () => {
  return (
    <div className="student-labs">
      <Helmet>
        <title>Student Labs </title>
      </Helmet>

      <div className="container">
        <h1>Welcome to student labs</h1>
      </div>
    </div>
  );
};
