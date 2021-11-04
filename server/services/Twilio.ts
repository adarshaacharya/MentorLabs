import twilio from 'twilio';

export const Twilio = {
  getToken: async () => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = twilio(accountSid, authToken);

    const token = await client.tokens.create();
    return token;
  },
};
