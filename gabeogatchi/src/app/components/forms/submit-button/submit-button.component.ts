import { Component, EventEmitter, Input, Output } from '@angular/core';
import { pageState } from 'src/types';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent {
  possibleStates = pageState // Private copy of the enum 
  @Input() buttonText: string; // Text to be shown on button
  @Input() buttonState: pageState; // Current state
  @Output() onClick = new EventEmitter<Event>();

  getClick(event: Event):void { // Emitt an event every time the button is clicked
    this.onClick.emit(event)
  }

}
