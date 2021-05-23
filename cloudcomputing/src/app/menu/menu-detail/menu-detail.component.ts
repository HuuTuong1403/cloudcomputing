import { Component, OnInit } from '@angular/core';
import { DrinkService }  from '../../service/drink.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.scss']
})
export class MenuDetailComponent implements OnInit {

  drink!: any;
  active = true;
  constructor(private route: ActivatedRoute,
              private drinkService: DrinkService,
              private notify: NzNotificationService) { }

  ngOnInit(): void {
    this.getDrink();
  }

  getDrink(): void{
    const name = String(this.route.snapshot.paramMap.get('name'));
    this.drinkService.getDrinkByDrinkName(name).subscribe(
      (res) =>{
        this.drink = res[0];
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
