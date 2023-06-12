import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-entry',
  templateUrl: './text-entry.component.html',
  styleUrls: ['./text-entry.component.scss']
})
export class TextEntryComponent {
  @Input() inputType: string; // What type the input is (pwd, email, number, etc)
  @Output() value: string = ""; // The current value of the entry

  updateValue(event: Event){
    this.value = (event.target as HTMLInputElement).value
  }

}
