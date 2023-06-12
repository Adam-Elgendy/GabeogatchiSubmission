import { Injectable } from '@angular/core';
import { ConnectionsService } from '../connections/connections.service';
import * as Forge from 'node-forge';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private connections: ConnectionsService, private storage: StorageService) { }

  validateLogin(email: string, password: string): Promise<boolean>{ // Validate that the given username and password are valid 
    return new Promise<boolean>((resolve, reject)=>{
      this.connections.getEncryptionKey().then((key)=>{
        const encryptedPassword = this.encryptText(password, key);
        this.connections.validateDetails(email, encryptedPassword).then((res)=>{
          if(res.success){
            console.log(res)
            this.storage.setUserDetails(email, res["payload"])
            resolve(true)
          }else{
            resolve(false)
          }
        })
      });
    });
  }
  
  createAccount(email: string, passsword: string): Promise<boolean>{
    return new Promise<boolean>((resolve, reject)=>{
      this.connections.getEncryptionKey().then((key: string)=>{
        const encryptedPassword = this.encryptText(passsword, key);
        this.connections.createAccount(email, encryptedPassword).then((res)=>{
          if(res.success){
            const userToken: string = res["payload"]
            this.storage.setUserDetails(email, userToken);
            this.connections.setData(email, userToken, "funds", "200").then((res)=>{
                this.connections.setData(email, userToken, "battlePassScore", "20").then((res)=>{
                    this.connections.setData(email, userToken, "items", "[]").then((res)=>{
                        this.connections.setData(email, userToken, "previousGachaPulls", "[]").then((res)=>{
                        resolve(true)
                        });
                    });
                })
            })
          }else{
            resolve(false)
          }
        });
      });
    });
  }

  encryptText(password: string, key: string): string { // Encrypt any text with a RSA key
    const rsa = Forge.pki.publicKeyFromPem(key);
    let pwd = window.btoa(rsa.encrypt(password.toString()));
    return pwd
  }

}
