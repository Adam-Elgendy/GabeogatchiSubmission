import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverResponse } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {
  private baseURL: string = "https://ap-southeast-2.aws.data.mongodb-api.com/app/base-camp-ttgwf/endpoint/"
  
  constructor(private httpClient: HttpClient) { }

  public getEncryptionKey():Promise<string>{ // Get the RSA public key from the server
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get(this.baseURL + "encryption/pubKey").subscribe((res)=>{
        resolve(res as string)
      })
    });
  };

  public validateDetails(email:string, encryptedPasssword:string): Promise<serverResponse>{ // Ensure inputted email and password are valid, and return the usertoken
    return new Promise<serverResponse>((resolve, reject)=>{
      this.httpClient.post(this.baseURL + "userData/logIn", {"email": email.toString(), "pwd": encryptedPasssword}).subscribe((res)=>{
        let response: serverResponse = {success: false, payload: ""};
        if((res as any)['worked']){
          response.success = true
          response.payload =(res as any)['payload']['Data']
          resolve(response)
        }
        resolve(response)
      });
    });
  }

  public createAccount(email: string, encryptedPasssword: string): Promise<serverResponse>{
    console.log(encryptedPasssword)
    return new Promise<serverResponse>((resolve, reject)=>{
      this.httpClient.post(this.baseURL + "userData/create", {"email": email.toString(), "pwd": encryptedPasssword, "app": "gabeogatchi"}).subscribe((res)=>{
        resolve({"success": (res as any)["success"], "payload": (res as any)["payload"]})
      });
    });
  }

  getData(email: string, usertoken: string, key: string): Promise<string|null>{ // Read a key-value pair from the server
    return new Promise<string|null>((resolve, reject)=>{
      this.httpClient.post(this.baseURL + "userData/read", {"email": email, "pwdToken": usertoken, "key": key}).subscribe((res)=>{
        if(Object.keys((res as serverResponse).payload).length == 0){
          (res as serverResponse).payload = null
        }
        if((res as serverResponse).success){
          resolve((res as serverResponse).payload)
        }else{
          reject((res as serverResponse).payload)
        }
      });
    });
  }

  setData(email: string, usertoken: string, key: string, value: string): Promise<boolean>{ // Set a key-value pair
    return new Promise<boolean>((resolve, reject)=>{
      this.httpClient.post(this.baseURL + "userData/set", {"email": email, "pwdToken": usertoken, "valKey": key, "val": value}).subscribe((res)=>{
        let response: serverResponse = res as serverResponse;
        resolve(response.success)
      });
    })
  }

}
