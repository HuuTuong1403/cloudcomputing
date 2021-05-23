import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DrinkService } from '../../service/drink.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-drink',
  templateUrl: './update-drink.component.html',
  styleUrls: ['./update-drink.component.scss']
})
export class UpdateDrinkComponent implements OnInit {

  DrinkArray: any[] = [];
  active = true;

  constructor(private router: Router,
    private drinkService: DrinkService,
    private notify: NzNotificationService) { }

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
        this.notify.create(
          'error',
          'Thông báo',
          'Đã xảy ra lỗi',
          {
            nzStyle: {'background-color': '#FFCCCC'}
          }
        );
      }
    )
  }


}
