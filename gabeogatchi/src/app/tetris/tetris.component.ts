import { Component } from '@angular/core';

@Component({
  selector: 'tetris-root',
  template: `
    <game-board></game-board>
  `,
})
export class TetrisComponent {
  title = 'ng-tetris';
}
