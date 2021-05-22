import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DrinkService } from '../../service/drink.service';

@Component({
  selector: 'app-update-drink',
  templateUrl: './update-drink.component.html',
  styleUrls: ['./update-drink.component.scss']
})
export class UpdateDrinkComponent implements OnInit {

  DrinkArray: any[] = [];
  active = true;

  constructor(private router: Router,
    private drinkService: DrinkService,) { }

  ngOnInit(): void {
    this.getDrinks();
    const data = [];
    for(let i of this.DrinkArray){
      data.push(this.DrinkArray[i]);
    }
  }

  turnBack(): void{
    this.router.navigate(['/drink']);
  }

  getDrinks(){
    this.drinkService.getDrinksAWS().subscribe(
      (res) => {
        this.DrinkArray = res;
        this.drinkService.setSession(this.DrinkArray);
        this.active = false;
      },
      (err) => {

      }
    )
  }
}
