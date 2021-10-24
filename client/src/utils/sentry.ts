import * as Sentry from '@sentry/browser';
import { Extras } from '@sentry/types';
import { Integrations } from '@sentry/tracing';

import config from 'config';

import { PRODUCTION } from 'constants/env';

/**
 * initialize sentry
 */
export const init = () => {
  if (config.env === PRODUCTION) {
    Sentry.init({
      dsn: config.sentryDSN,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  }
};

/**
 * Catch global errors and send the caught error to Sentry.
 *
 * @param {Object} error
 * @param {Object} errorInfo
 */
export const catchErrorsWithScope = (error: any, errorInfo: Extras) => {
  if (config.env === PRODUCTION) {
    Sentry.withScope((scope: Sentry.Scope) => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });
  }
};
