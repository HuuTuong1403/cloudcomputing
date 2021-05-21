import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DrinkService } from '../service/drink.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit{

  DrinkArray: any[] = [];

  constructor(private router: Router,
              private drinkService: DrinkService,
              private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.isSelect();
    this.getDrinks();
    const data = [];
    for(let i of this.DrinkArray){
      data.push(this.DrinkArray[i]);
    }
  }

  getDrinks(){
    this.drinkService.getDrinksAWS().subscribe(
      (res) => {
        this.DrinkArray = res;
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
