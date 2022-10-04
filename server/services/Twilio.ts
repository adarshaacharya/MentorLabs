import twilio from 'twilio';
import { getEnv } from '../common/utils';

export const Twilio = {
  getToken: async () => {
    const accountSid = getEnv('TWILIO_ACCOUNT_SID');
    const authToken = getEnv('TWILIO_AUTH_TOKEN');

    const client = twilio(accountSid, authToken);

    const token = await client.tokens.create();
    return token;
  },
};
