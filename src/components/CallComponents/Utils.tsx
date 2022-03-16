export const fetchTokenResponse = async (): Promise<any> => {
    const response = await fetch('https://localhost:44392/api/AzureCommunicationIdentity');
     const responseAsJson=await response.json();
     const token = responseAsJson.accessToken.token;
     var user=responseAsJson.user.id;
     if(token){
       return {token,user};
     }
     throw 'Invalid token response';
 };