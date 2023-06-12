import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public email: string = "" 
  public userToken: string = "" 


  constructor() { }

  isSignedIn():Boolean{ // Check if a user has already signed in
    let userToken = localStorage.getItem("GabeoGatchiUserToken");
    if(userToken){
      let email = localStorage.getItem("GabeoGatchiUserEmail");
      if(email){
        this.email = email
        this.userToken = userToken;
        return true;
      }else{
        return false
      }``
    }else{
      return false;
    }
  }

  setUserDetails(email: string, userToken: string){ // Store the user token within localstorage
    this.userToken = userToken
    this.email = email
    localStorage.setItem("GabeoGatchiUserEmail", email);
    localStorage.setItem("GabeoGatchiUserToken", userToken);
    return
  }
}
