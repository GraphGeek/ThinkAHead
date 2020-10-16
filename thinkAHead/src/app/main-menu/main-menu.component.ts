import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/assets/services/local-storage.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent implements OnInit {
  public scores: string[];
  public timeToDuel = new Audio('../assets/sounds/timeToDuel.mp3');
  public exPlayer1 = [
    'Joe Lopez',
    'Pain au chocolat',
    'Lacrimatica',
    'Un hotel ?',
    'Maître Yoda',
    'David Lafarge',
    'Olive',
    'Cyprien',
    'Booba',
    'Michou',
    'Naruto Uzumaki',
    'Terrance',
    'Macron',
  ];
  public exPlayer2 = [
    'David Lopez',
    'Chocolatine',
    'Pourquoi ?',
    'Trivago',
    'Lorenzo Becker',
    'Miss Jirachi',
    'Tom',
    'Cortex',
    'Kaaris',
    'InoxTag',
    'Sasuke Uchiwa',
    'Philippe',
    'Gilet jaune',
  ];
  public randForEx = Math.floor(
    Math.random() * Math.floor(this.exPlayer1.length)
  );

  public playerForm = new FormGroup({
    player1: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[^/,&,",:,=,+]{0,32}$'),
      ])
    ),
    player2: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[^/,&,",:,=,+]{0,32}$'),
      ])
    ),
    squareSize: new FormControl('', Validators.required),
  });

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.scores = this.localStorage.getScores();
  }

  launchGame() {
    this.router.navigate(['/game'], {
      queryParams: {
        player1: this.playerForm.get('player1').value,
        player2: this.playerForm.get('player2').value,
        squareSize: this.playerForm.get('squareSize').value,
      },
    });
    this.timeToDuel.load();
    this.timeToDuel.play();
  }
}
