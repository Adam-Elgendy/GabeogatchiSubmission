import { Component } from '@angular/core';
import { PetService } from 'src/app/services/pet/pet.service';
import { item, pageState } from 'src/types';

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.scss']
})
export class CreatePetComponent {
  public pageState = pageState;
  public currentPageState = pageState.loading;

  private availablePets: Array<string>;

  getPetImage(petNumber: number): string{
    if(petNumber <= 2){

      return petNumber + "-happy"
    }
    else{
      return "locked"
    }
  }
  
  submitPet(name: string){
    this.pet.createPet(name, 1)
  }
  constructor(private pet: PetService){}
}
