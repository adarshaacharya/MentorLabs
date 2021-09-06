import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ErrorBoundaryState {
  hasError: boolean;
}
export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  // componentDidCatch(error: any, errorInfo: any) {
  //   console.log(error, errorInfo);
  //   // send sentry error here
  // }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <Helmet>
            <title>Error | Mentor Labs</title>
          </Helmet>
          <p>We're sorry — something went wrong.</p>
          <p>Please contact : adarshaofficial@gmail.com</p>
        </div>
      );
    }

    return this.props.children;
  }
}
