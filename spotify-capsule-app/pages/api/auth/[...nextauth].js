import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token) {
    try {
        // send access token and refresh token to spotify to refresh
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log("REFRESHED TOKEN IS ", refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, //  = 1 hour as 3600 returns from spotify API
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // replace if new one came back, else fallback onto refreshToken
        }

    } catch (error) {
        console.error(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

export const authOptions = {

  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/"
  },
  callbacks: {
    async jwt({ token, account, user }) {
        
        // initial sign in
        if (account && user){
            return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            username: account.provideAccountId,
            accessTokenExpires: account.expires_at * 1000, // we are handling expiry times in ms (hence * 1000)
            }
        }

        // Return previous token if the access token has not expired yet
        if (Date.now() < token.accessTokenExpires) {
            console.log("EXISTING ACCESS TOKEN IS VALID");
            return token;
        }

        // Access token expired so we need to refresh it...
        console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
        return await refreshAccessToken(token)

    },

    async session({ session, token }) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;

        return session;
    }
  }
}

export default NextAuth(authOptions)