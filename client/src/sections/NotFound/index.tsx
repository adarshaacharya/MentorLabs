import { Button, Result } from 'antd';
import { useScrollToTop } from 'hooks';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  useScrollToTop();

  return (
    <section className="not-found">
      <Helmet>
        <title>Not Found | Mentor Labs</title>
      </Helmet>
      <div className="container">
        <div className="not-found__wrapper">
          <Result
            status="404"
            title="404"
            subTitle="The page you're looking for can't be found."
            extra={
              <Button type="primary">
                <Link to="/">Back Home</Link>
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
};
