import auth0 from 'auth0-js';

class Auth0Service {
  private auth0 = new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN || '',
    clientID: process.env.AUTH0_CLIENT_ID || '',
    redirectUri: `${process.env.BASE_URL}/callback`,
    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  public login = () => {
    this.auth0.authorize();
  };

  public handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          console.log(err);
          reject(err);
        }
      });
    });
  };

  private setSession = (authResult: any) => {
    // Save tokens and expiry time in local storage
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('expires_at', expiresAt);
  };

  public logout = () => {
    // Clear tokens and expiry time from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  };

  public isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  };
}

export default new Auth0Service();
