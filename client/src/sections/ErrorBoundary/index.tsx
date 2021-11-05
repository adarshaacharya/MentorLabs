import { Button, Result } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import * as sentry from 'utils/sentry';

interface ErrorBoundaryState {
  hasError: boolean;
}
export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
    sentry.catchErrorsWithScope(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <Helmet>
            <title>Error | Mentor Labs</title>
          </Helmet>
          <Result
            status="500"
            title="500"
            subTitle={`We're sorry — something went wrong.
              Our team has been notified. This issue must be fixed soon.
             But, you can directly report this issue by contacting via : adarshaofficial@gmail.com
              `}
            extra={
              <Button type="primary">
                <Link to="/">Back Home</Link>
              </Button>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}
