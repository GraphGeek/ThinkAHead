import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/assets/services/local-storage.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  public scores: string[];

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.scores = this.localStorage.getScores();
  }

}
