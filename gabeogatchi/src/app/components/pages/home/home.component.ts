import { Component } from '@angular/core';
import { ConnectionsService } from 'src/app/services/connections/connections.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { PetService } from 'src/app/services/pet/pet.service';
import { pageState } from 'src/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private connections: ConnectionsService, private storage: StorageService, public pet: PetService){ }

  ngOnInit(){
    this.connections.setData(this.storage.email, this.storage.userToken, "lastLogin", (new Date().getTime()).toString()).then((res)=>{})
  }

  

}
