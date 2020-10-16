import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  public gameForm = new FormGroup({
    score1: new FormControl(0, Validators.required),
    score2: new FormControl(0, Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  saveScores() {}
}
