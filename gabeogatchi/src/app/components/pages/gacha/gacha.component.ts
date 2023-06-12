import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionsService } from 'src/app/services/connections/connections.service';
import { GachaService } from 'src/app/services/gacha/gacha.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { item, pageState } from 'src/types';

@Component({
  selector: 'app-gacha',
  templateUrl: './gacha.component.html',
  styleUrls: ['./gacha.component.scss']
})
export class GachaComponent {
  public pageState = pageState;
  public currentPageState = pageState.loading;
  public pageText = "Idle";
  public pullItem: item|null = null;

  constructor (private storage: StorageService, private connections: ConnectionsService, public router: Router, private gacha: GachaService){}

  ngOnInit(){
    this.currentPageState = pageState.idle;
    this.checkGacha().then((res)=>{
      if(res){
        this.currentPageState = pageState.idle;
      }else{
        this.currentPageState = pageState.error;
        this.pageText = "You do not have a gacha pod at the moment, unlock one from the store"
      }
    })
  }

  checkGacha(): Promise<boolean>{ // Ensure user has a gacha pod
    return new Promise<boolean>((resolve, reject)=>{
      this.connections.getData(this.storage.email, this.storage.userToken, "items").then((res)=>{
        if(res){
          let items = JSON.parse(res);
          let itemTitles: string[] = []
          items.forEach((item)=>{
            itemTitles.push(item.title)
          });
          console.log(itemTitles);
          if(itemTitles.includes("Gacha Pull")){
            resolve(true);
          }else{
            resolve(false);
          }
        }else{
          this.currentPageState = pageState.error;
          this.pageText = "Cannot find your inventory"
          reject(false)
        }
      });
    });
  }

  removeGacha(): Promise<void> { // Remove a gacha pull
    return new Promise<void>((resolve, reject)=>{
      this.connections.getData(this.storage.email, this.storage.userToken, "items").then((res)=>{
        if(res){
          let items: item[] = JSON.parse(res);
          for(let i=0; i<items.length; i++){
            if(items[i].title == "Gacha Pull"){
              items.splice(i, 1);
              break;
              
            }
          }
          this.connections.setData(this.storage.email, this.storage.userToken, "items", JSON.stringify(items)).then((res)=>{
            resolve();
          });
        }
      });
    })
  }

  pullGacha() {
    this.currentPageState = pageState.loading 
    this.removeGacha().then(()=>{
      this.gacha.pullOnBanner().then((item)=>{
        this.currentPageState = pageState.idle 
        this.pullItem = item
      });
    })
  }
}
