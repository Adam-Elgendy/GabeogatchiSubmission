import { Component } from '@angular/core';
import { PetService } from 'src/app/services/pet/pet.service';

@Component({
  selector: 'app-pet-display',
  templateUrl: './pet-display.component.html',
  styleUrls: ['./pet-display.component.scss']
})
export class PetDisplayComponent {
  petNumber: number;
  public petImg: string = "";
  
  
  constructor(public pet: PetService){
  }
  
  
  ngOnInit(){
    this.petNumber = this.pet.petNumber;
    this.getPetImage();
    setInterval(()=>{
      this.getPetImage();
    }, 1500)
  }

  getPetImage(): void{
    let status = this.pet.getStatus(); 
    if(this.pet.living){
      this.petImg =  this.pet.petNumber + this.expression(status);
      if(typeof this.petImg == 'undefined'){
        this.petImg = "2-happy"
      }
    }else{
      this.petImg =  "dead"
    }
  }

  expression(status: {happiness: number, cleanliness: number, hunger: number, healthiness: number}): string{
    let petExpression;
    this.petNumber = this.pet.petNumber
    
    if(status.happiness >= 75){
      petExpression = "happy"
    }else if(status.happiness >= 45){
      petExpression = "neutral"
    }else{
      petExpression = "sad"
    }

    if(status.healthiness < 35){
      petExpression = "ill";
    }

    return "-" + petExpression;
  }



  



}
