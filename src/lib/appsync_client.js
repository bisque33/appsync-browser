import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient from 'aws-appsync'; // apollo client
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link'
import gql from 'graphql-tag'

export default class AppSyncClient {
  constructor() {
    try {
      this.Amplify = Amplify
      this.Auth = Auth
      this.region = localStorage.getItem('region')
      this.url = localStorage.getItem('appSyncEndpoint')
      this.type = AUTH_TYPE.AWS_IAM
      this.Amplify.configure({
        Auth: {
          identityPoolId: localStorage.getItem('IdentityPoolId'),
          region: localStorage.getItem('region'),
          userPoolId: localStorage.getItem('userPoolId'),
          userPoolWebClientId: localStorage.getItem('userPoolWebClientId'),
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  async query (params) {
    console.log(params)

    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    const query = gql(params.query)
    const variables = params.variables

    try {
      // TODO: credentialをキャッシュから読み込む
      await this.Auth.signIn(username, password)
      const credentials = await this.Auth.currentUserCredentials()
      // Set up Apollo client
      const client = new AWSAppSyncClient({
          url: this.url,
          region: this.region,
          auth: {
              type: this.type,
              credentials: credentials
          }
      });

      const response = await client.query({ query: query, variables: variables })
      console.log('results of query: ', response)
      return response
 
        //Now subscribe to results
        // const observable = client.subscribe({ query: subquery });

        // const realtimeResults = function realtimeResults(data) {
        //     console.log('realtime data: ', data);
        // };

        // observable.subscribe({
        //     next: realtimeResults,
        //     complete: console.log,
        //     error: console.log,
        // });
    } catch (e) {
      console.log(e)
      alert('error', e)
    }
  }
}