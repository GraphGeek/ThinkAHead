import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string) {
    try {
      if(localStorage.getItem(key) != null){
        return JSON.parse(localStorage.getItem(key));
      }else{
        return null;
      }
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  getScores(): string[]{
    return this.get("scores");
  }

  addScores(data: string){
    let scores = this.getScores();
    if(scores == null){
      scores = [];
    }
    scores.push(data)
    this.set("scores", scores);
  }
}
