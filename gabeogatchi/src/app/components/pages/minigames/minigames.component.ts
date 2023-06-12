import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { game } from 'src/types';

@Component({
  selector: 'app-minigames',
  templateUrl: './minigames.component.html',
  styleUrls: ['./minigames.component.scss']
})
export class MinigamesComponent {
  public gamesList: game[] = []
  public displayedGame: string = "none";

  constructor(private router: Router){}

  ngOnInit(){
    //Modularly generate a list
    this.gamesList = [
      {
        "title": "Tetris",
        "description": "Stack the Blocks",
        "imgLink": "https://play-lh.googleusercontent.com/za2Nu_qjMw5GzWfbzet4zeiZT1xvJlTRi4NJzGpJWX9grxFAAko5dGBwe7qeqK01THw",
        "slug": "tetris"
      }
    ]
  }

  openGame(slug: string): void{
    this.displayedGame = slug
  }
}
