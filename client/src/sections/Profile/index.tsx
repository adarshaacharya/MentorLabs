import { useParams } from 'react-router-dom';

export const Profile = () => {
  const { id } = useParams();

  return (
    <section className="profile">
      <div className="container">
        <h1>Profile</h1>
        <p>{id}</p>
      </div>
    </section>
  );
};
