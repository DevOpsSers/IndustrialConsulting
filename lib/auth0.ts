import { ManagementClient, AuthenticationClient } from 'auth0';

const auth0 = new AuthenticationClient({
  domain: process.env.AUTH0_BASE_URL!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
});

const auth0Management = new ManagementClient({
  domain: process.env.AUTH0_BASE_URL!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  scope: 'read:users update:users',
});

export { auth0, auth0Management };
