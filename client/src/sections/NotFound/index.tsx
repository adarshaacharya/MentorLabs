import { useScrollToTop } from 'hooks';
import { Link } from 'react-router-dom';
import { Empty, Layout, Typography } from 'antd';

const { Text } = Typography;

export const NotFound = () => {
  useScrollToTop();

  return (
    <section className="not-found">
      <div className="container">
        <div className="not-found__wrapper">
          <Empty
            description={
              <>
                <Text className="not-found__description-title">Uh oh! Something went wrong :( </Text>
                <Text className="not-found__description-subtitle">The page you're looking for can't be found.</Text>
              </>
            }
          />
          <Link to="/" className="btn--primary not-found__btn">
            Go to home
          </Link>
        </div>
      </div>
    </section>
  );
};
