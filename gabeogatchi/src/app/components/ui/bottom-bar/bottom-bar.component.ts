import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent {
  @Input() currentPage: "home" | "battlepass" | "games" | "inventory" | "store";

  constructor(private router: Router){}
  
  setPage(page: "home" | "battlepass" | "games" | "inventory" | "store"){
    this.currentPage = page
    setTimeout(()=>{
      if(this.currentPage == "home"){
        this.router.navigateByUrl("/");
      }else{
        this.router.navigateByUrl(this.currentPage)
      }
    }, 250)
  }
}
