import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import * as routes from 'constants/routes';

export const AccessDenied = () => {
  return (
    <div className="access-denied">
      <div className="container">
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Link to={routes.HOME}>
              <Button type="primary">Back to Dashboard</Button>
            </Link>
          }
        />
      </div>
    </div>
  );
};
