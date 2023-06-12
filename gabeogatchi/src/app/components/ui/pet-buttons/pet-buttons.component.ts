import { Component, Input, Output } from '@angular/core';
import { PetService } from 'src/app/services/pet/pet.service';
import { ConnectionsService } from 'src/app/services/connections/connections.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { pageState, item } from 'src/types';

@Component({
  selector: 'app-pet-buttons',
  templateUrl: './pet-buttons.component.html',
  styleUrls: ['./pet-buttons.component.scss']
})
export class PetButtonsComponent {
  public feedText = "Feed"
  public patText = "Pet"
  public cleanText = "Clean"
  public pageState = pageState;
  kValueMultiplier = 10;

  feed(){
    this.removeItem("Food", this.pet)
  }
  
  pat(){
    this.pet.increaseHappiness(5)
  }
  
  clean(){
    this.removeItem("Cleaning", this.pet)
  }

  removeItem(itemType: string, pet: PetService){
    const email = this.ls.email
    const token = this.ls.userToken

    this.connections.getData(email, token, "items").then((items)=>{
      let itemAray: item[] = JSON.parse(items);
      let found: boolean = false;
      for(let element of itemAray){        
        if(element.title.includes(itemType)){
          found = true;
          if(itemType == "Food"){
            pet.feed(parseFloat(element.rarity)*this.kValueMultiplier)
          }else if(itemType == "Cleaning"){
            pet.clean(parseFloat(element.rarity)*this.kValueMultiplier)
          }

          itemAray.splice(itemAray.indexOf(element), 1);
          this.connections.setData(email, token,"items",JSON.stringify(itemAray)).then((res)=>{
            
          });
          break;
        }
      }
      if(!found){
        if(itemType == "Food"){
          this.feedText = "You have no food"
        }else if(itemType == "Cleaning"){
          this.cleanText = "You have no cleaning products"
        }
      }
    })
  }

  constructor(private pet: PetService, private connections: ConnectionsService, private ls: StorageService){}
}
