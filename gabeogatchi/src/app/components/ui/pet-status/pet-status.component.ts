import { Component } from '@angular/core';

import { PetService } from 'src/app/services/pet/pet.service';

@Component({
  selector: 'app-pet-status',
  templateUrl: './pet-status.component.html',
  styleUrls: ['./pet-status.component.scss']
})
export class PetStatusComponent {
  date: Date
  barUpdate
  
  constructor(private pet: PetService){
    this.barUpdate= setInterval(() => this.updateStatus(), 1000)
    this.updateStatus()
  }

  public happiness: number = 100;
  public cleanliness: number = 100;
  public hunger: number = 100;
  public healthiness: number = 100;

  updateStatus(): void{
    // console.log(this.date.getTime())
    let status: {happiness: number, cleanliness: number, hunger: number, healthiness: number} = this.pet.getStatus();

    this.happiness = status.happiness
    this.cleanliness = status.cleanliness
    this.hunger = status.hunger
    this.healthiness = status.healthiness

  }
}
