import normalizeUrl from 'normalize-url';
import gravatar from 'gravatar';

/**
 * Generates the url of gravatar email for avatar
 *
 * @param {string} email
 * @returns {string} url
 */
export const Gravatar = {
  generateUrl: (email: string): string => {
    return normalizeUrl(
      gravatar.url(
        email,
        {
          protocol: 'https',
          s: '200',
          r: 'pg',
          d: 'mm',
        },
        true,
      ),
    );
  },
};
