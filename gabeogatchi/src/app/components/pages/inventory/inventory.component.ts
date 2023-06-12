import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionsService } from 'src/app/services/connections/connections.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { item } from 'src/types';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  public inventory: item[] = [];

  constructor(private storage: StorageService, private connections: ConnectionsService, private router: Router){};

  ngOnInit(){
    this.getInventoryItems()
  }

  getInventoryItems(): Promise<void>{
    return new Promise<void>((resolve, reject)=>{
      this.connections.getData(this.storage.email, this.storage.userToken, "items").then((items)=>{
        if(items){
          this.inventory = JSON.parse(items)
        }
      })
    });
  }

  openElem(item: item): void{
    console.log(item.title)
    if(item.title == "Gacha Pull"){
      this.router.navigateByUrl("gacha")
    }
  }
}
