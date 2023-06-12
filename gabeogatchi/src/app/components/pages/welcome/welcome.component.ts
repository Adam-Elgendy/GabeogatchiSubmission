import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { pageState } from 'src/types';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  public currentPageState: pageState = pageState.idle

  constructor(private router: Router){}

  public setPage(url: string){
    this.router.navigateByUrl(url);
  }
}
