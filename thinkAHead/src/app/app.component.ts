import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public AH = new Audio()

  ngOnInit(){
  this.AH.src = "../assets/sounds/AH.mp3";
  this.AH.load();
  }

  playAH(){
    this.AH.play();
  }
}
