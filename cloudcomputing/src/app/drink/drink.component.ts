import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DrinkService } from '../service/drink.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit{

  DrinkArray: any[] = [];
  active = true;

  constructor(private router: Router,
              private drinkService: DrinkService,
              private route: ActivatedRoute,
              private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Quản lý');
    this.isSelect();
    this.getDrinks();
    const data = [];
    for(let i of this.DrinkArray){
      data.push(this.DrinkArray[i]);
    }
  }

  reLoad(){
    this.active = true;
    this.getDrinks();
  }

  getDrinks(){
    this.drinkService.getDrinksAWS().subscribe(
      (res) => {
        this.DrinkArray = res;
        this.drinkService.setSession(this.DrinkArray);
        this.active = false;
      },
      (err) => {

      })
  }

  isSelect(): boolean{
    var route = '/drink'
    if(this.router.url != route){
      return false;
    }
    return true;
  }


}
