import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/assets/services/local-storage.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  public scores: string[];

  public playerForm = new FormGroup({
    player1: new FormControl('',  Validators.compose([Validators.required, Validators.pattern('^[^\/]{0,32}$')])),
    player2: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[^\/]{0,32}$')])),
    squareSize: new FormControl('', Validators.required)
  });

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.scores = this.localStorage.getScores();
  }

  launchGame(){

  }
}
