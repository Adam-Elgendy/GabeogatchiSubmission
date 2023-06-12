import { Component } from '@angular/core';
import { StorageService } from './services/storage/storage.service';
import { Router } from '@angular/router';
import { ConnectionsService } from './services/connections/connections.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gabeogatchi';
  
  constructor(private storageManager: StorageService, private router: Router, private connections: ConnectionsService){}

  ngOnInit(): void{
    if(!this.storageManager.isSignedIn()){
      let location = window.location.href.split("/")
      if(!["welcome", "login", "create"].includes(location[location.length - 1])){
        this.router.navigateByUrl("/welcome")
      }
    }
    else{
    }
  }
}
