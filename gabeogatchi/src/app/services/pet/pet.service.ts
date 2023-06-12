import { Injectable } from '@angular/core';
import { ConnectionsService } from '../connections/connections.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private kStatusDepletionTime : number = 2400000 //time taken to deplete 1% of each status (could add modifiers for different stats)
  private kStatusMax = 100;
  private kBaseHealth = 0;
  private depletionMultiplier: number = 100;
  
  public petNumber:number = 1;
  public name: string;
  public living: boolean = false;

  //status
  public happiness: number = 100;
  public cleanliness: number = 100;
  public hunger: number = 100;
  private healthiness: number = 100;

  //status modifiers
  private happinessModifier: number = 4
  private cleanlinessModifier: number = 1
  private hungerModifier: number = 1.5

  public age = 0

  //time 
  public timeOfCreation: number
  public lastUpdate: number = new Date().getTime();
  private lastSave: number = new Date().getTime();

  //to update status upon login and during play (maybe every minute?)
  updateStatus(): void{ 
    let currentTime: number = new Date().getTime()
    let timeSinceUpdate: number = currentTime - this.lastUpdate;
    
    //calculate age
    this.age = (currentTime-this.timeOfCreation)/(this.kStatusDepletionTime*5/this.depletionMultiplier);
    
    let statusReduction: number = timeSinceUpdate/(this.kStatusDepletionTime/this.depletionMultiplier);
    
    //reduce statuses by status reduction and im lazy
    this.cleanliness = this.cleanliness - statusReduction * this.cleanlinessModifier <= 0 ? 0 : this.cleanliness - statusReduction * this.cleanlinessModifier;
    this.hunger = this.hunger - statusReduction * this.hungerModifier <= 0 ? 0 : this.hunger - statusReduction * this.hungerModifier;

    //TODO make hapiness different to cleanliness and hunger
    this.happiness = this.happiness - statusReduction * this.happinessModifier <= 0 ? 0 : this.happiness - statusReduction * this.happinessModifier;
    
    
    //healthiness is the average of cleanliness and hunger with happiness weighted at one tenth + base - age
    this.healthiness = this.kBaseHealth + (this.cleanliness*5 + this.hunger*5 + this.happiness)/11 - this.age;

    if(this.healthiness <= 0){
      this.healthiness = 0;
      this.happiness = 0;
      this.hunger = 0;
      this.cleanliness = 0;

      if(this.living){
        this.living = false;
        this.savePet();
      }

    }else if(this.healthiness >= 100){
      this.healthiness = 100;
    }

    this.lastUpdate = currentTime;
    if(currentTime - this.lastSave >= 15000){
      this.lastSave = currentTime;
      this.savePet()
    }
  } 
  
  feed(foodValue: number): void{
    //TODO remove food from storage
    //auto replace food type if it runs out
    
    this.hunger += this.hungerModifier*foodValue;
    
    if(this.hunger > 100){
      this.hunger = 100;
    }

    this.updateStatus()
  }

  clean(cleanValue: number): void{
    this.cleanliness += Math.floor(Math.random()*cleanValue);
    
    if(this.cleanliness > 100){
      this.cleanliness = 100;
    }

    this.updateStatus()
  }
  
  increaseHappiness(value: number): void{
    this.happiness += value;
    
    if(this.happiness > 100){
      this.happiness = 100;
    }

    this.updateStatus()
  }

  getStatus(){
    this.updateStatus();

    return{
      happiness: this.happiness,
      cleanliness: this.cleanliness,
      hunger: this.hunger,
      healthiness: this.healthiness
    }
  }

  createPet(petName: string, petNumber: number){
    this.name = petName;
    this.happiness = 100;
    this.cleanliness = 100;
    this.hunger = 100;
    this.timeOfCreation = new Date().getTime()
    this.petNumber = 2;
    this.updateStatus()
    
    this.living = true;
    this.savePet()
  }
  
  savePet(){
    let petData = {
      "name": this.name,
      "number": this.petNumber,
      "timeOfCreation": this.timeOfCreation,
      "lastUpdate": this.lastUpdate,
      "happiness": this.happiness,
      "cleanliness": this.cleanliness,
      "hunger": this.hunger,
      "healthiness": this.healthiness
    }
    this.connections.setData(this.storage.email, this.storage.userToken, "petStatus", JSON.stringify(petData)).then((success)=>{
      return
    });
  }

  constructor(private connections: ConnectionsService, private storage: StorageService) {
    this.connections.getData(this.storage.email, this.storage.userToken, "petStatus").then((res)=>{
      if(res){
        let petData = JSON.parse(res);
        this.name = petData["name"];
        this.petNumber = petData["number"];
        this.timeOfCreation = petData["timeOfCreation"];
        this.lastUpdate = petData["lastUpdate"]
        this.happiness = petData["happiness"];
        this.cleanliness = petData["cleanliness"];
        this.hunger = petData["hunger"];
        this.healthiness = petData["healthiness"]
      }else{
        this.living = false;
      }
      this.updateStatus()
    })

    this.living = this.healthiness > 0;
  }
}

