import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/assets/services/local-storage.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  public gameForm = new FormGroup({
    score1: new FormControl({ value: 0, disabled: true }, Validators.required),
    score2: new FormControl({ value: 0, disabled: true }, Validators.required),
  });
  public board = [[], [], [], [], []];
  public rawMatch = new Audio('../assets/sounds/motus.mp3');
  public player1Win = new Audio('../assets/sounds/player1win.mp3');
  public player2Win = new Audio('../assets/sounds/player2win.mp3');
  public squareSize: number;
  public player1: string;
  public player2: string;
  public actualTurn = true;
  public lines = [
    '0/0|0/1|0/2|0/3|0/4',
    '1/0|1/1|1/2|1/3|1/4',
    '2/0|2/1|2/2|2/3|2/4',
    '3/0|3/1|3/2|3/3|3/4',
    '4/0|4/1|4/2|4/3|4/4',
  ];
  public columns = [
    '0/0|1/0|2/0|3/0|4/0',
    '0/1|1/1|2/1|3/1|4/1',
    '0/2|1/2|2/2|3/2|4/2',
    '0/3|1/3|2/3|3/3|4/3',
    '0/4|1/4|2/4|3/4|4/4',
  ];
  public selectedLineColumn = "X/X|X/X|X/X|X/X|X/X";
  public isLine: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['squareSize'] != undefined) {
        this.squareSize = params['squareSize'];
        if (this.squareSize > 5 || !this.squareSize.toString().match('[0-9]')) {
          this.router.navigate(['/main-menu']);
        }
        this.player1 = params['player1'];
        this.player2 = params['player2'];
      } else {
        this.router.navigate(['/main-menu']);
      }
    });
    window.history.pushState({}, null, window.location.href.split('?')[0]);

    if (this.squareSize == 4) {
      this.board = [[], [], [], []];
      this.lines = [
        '0/0|0/1|0/2|0/3',
        '1/0|1/1|1/2|1/3',
        '2/0|2/1|2/2|2/3',
        '3/0|3/1|3/2|3/3',
      ];
      this.columns = [
        '0/0|1/0|2/0|3/0',
        '0/1|1/1|2/1|3/1',
        '0/2|1/2|2/2|3/2',
        '0/3|1/3|2/3|3/3',
      ];
    } else if (this.squareSize == 3) {
      this.board = [[], [], []];
      this.lines = [
        '0/0|0/1|0/2',
        '1/0|1/1|1/2',
        '2/0|2/1|2/2',
      ];
      this.columns = [
        '0/0|1/0|2/0',
        '0/1|1/1|2/1',
        '0/2|1/2|2/2',
      ];
    }

    for (let i = 0; i < this.squareSize; i++) {
      for (let y = 0; y < this.squareSize; y++) {
        this.board[i][y] = this.getRandomInt(-10, 9);
      }
    }

    let nbCaseSup = 0.2 * (this.squareSize * this.squareSize);
    for(let i = 0; i < nbCaseSup; i++){
      this.board[this.getRandomInt(0, this.squareSize)][this.getRandomInt(0, this.squareSize)] = this.getRandomInt(10, 15);
    }

    if (Math.random() > 0.5) {
      this.selectedLineColumn = this.lines[
        this.getRandomInt(0, this.squareSize)
      ];
      this.isLine = true;
    } else {
      this.selectedLineColumn = this.columns[
        this.getRandomInt(0, this.squareSize)
      ];
      this.isLine = false;
    }
  }

  finishPlayerTurn(points, coord) {
    let tab = this.selectedLineColumn.split('|');
    let split = coord.split('/');
    for (let i = 0; i < tab.length; i++) {
      if (coord == tab[i]) {
        if (this.board[split[0]][split[1]] != 'X') {
          if (this.actualTurn) {
            let actualScore1 = this.gameForm.get('score1').value;
            this.gameForm.get('score1').setValue(actualScore1 + points);
          } else {
            let actualScore2 = this.gameForm.get('score2').value;
            this.gameForm.get('score2').setValue(actualScore2 + points);
          }
          this.board[split[0]][split[1]] = 'X';
          this.actualTurn = !this.actualTurn;

          if (this.isLine) {
            this.columns.forEach((column) => {
              if (column.includes(coord)) {
                this.selectedLineColumn = column;
              }
            });
          } else {
            this.lines.forEach((line) => {
              if (line.includes(coord)) {
                this.selectedLineColumn = line;
              }
            });
          }
          this.isLine = !this.isLine;
        }

        if(this.verifEndGame()){
          this.selectedLineColumn="X/X|X/X|X/X|X/X|X/X"
          if(this.gameForm.get('score1').value > this.gameForm.get('score2').value){
            this.player1Win.load();
            this.player1Win.play();
          }else if(this.gameForm.get('score1').value < this.gameForm.get('score2').value){
            this.player2Win.load();
            this.player2Win.play();
          }else{
            this.rawMatch.load();
            this.rawMatch.play();
          }
          this.saveScores();
          this.router.navigate(['/main-menu']);
        }

      }
    }
  }

  verifEndGame() {
    let temp;
    let fullLine = 0;
    let fullColumn = 0;
    let endGame = false;

    this.lines.forEach((line) => {
      temp = line.split('|');
      temp.forEach((coordo) => {
        let xy = coordo.split('/');
        if (this.board[xy[0]][xy[1]] == 'X') {
          fullLine++;
        }
      });
      if(fullLine == this.squareSize){
        endGame = true;
      }else{
        fullLine = 0;
      }
    });

    this.columns.forEach((column) => {
      temp = column.split('|');
      temp.forEach((coordo) => {
        let xy = coordo.split('/');
        if (this.board[xy[0]][xy[1]] == 'X') {
          fullColumn++;
        }
      });
      if(fullColumn == this.squareSize){
        endGame = true;
      }else{
        fullColumn = 0;
      }
    });

    return endGame;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  saveScores() {
    this.localStorage.addScores(
      this.player1 +
        '/' +
        this.gameForm.get('score1').value +
        '/' +
        this.player2 +
        '/' +
        this.gameForm.get('score2').value
    );
  }
}
