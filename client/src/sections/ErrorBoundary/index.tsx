import React from 'react';
import { Helmet } from 'react-helmet-async';
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
          <p>We're sorry — something went wrong.</p>
          <p>Our team has been notified.</p>
          <p>You can directly report this issue by contacting via : adarshaofficial@gmail.com</p>
        </div>
      );
    }

    return this.props.children;
  }
}
