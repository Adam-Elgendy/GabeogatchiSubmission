import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { pageState } from 'src/types';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  public pageState = pageState;
  public formState: pageState = pageState.idle // Current page state

  constructor(private auth: AuthService, private router: Router){}

  validateAuth(userName: string, password: string, event?: Event|undefined): void{
    if(event){
      event.preventDefault(); // Stop page from reloading
    }

    

    this.formState = pageState.loading;
    this.auth.createAccount(userName, password).then((isValid: boolean)=>{
      console.log(isValid)
      if(isValid){
        this.formState = pageState.idle
        this.router.navigateByUrl("/")
      }else{
        this.formState = pageState.error
      }
    });    
  }
  
}
