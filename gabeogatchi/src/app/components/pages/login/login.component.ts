import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { pageState } from 'src/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public pageState = pageState;
  public formState: pageState = pageState.idle // Current page state

  constructor(private auth: AuthService, private router: Router){}

  validateAuth(userName: string, password: string, event?: Event|undefined): void{
    if(event){
      event.preventDefault(); // Stop page from reloading
    }

    

    this.formState = pageState.loading;
    this.auth.validateLogin(userName, password).then((isValid: boolean)=>{
      if(isValid){
        this.formState = pageState.idle
        this.router.navigateByUrl("/")
      }else{
        this.formState = pageState.error
      }
    });    
  }
}
