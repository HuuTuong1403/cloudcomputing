import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DrinkService } from '../service/drink.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  DrinkArray: any[] = [];
  active = true;

  constructor(private title: Title,
    private drinkService: DrinkService,
    private notify: NzNotificationService) { }

  ngOnInit(): void {
    this.title.setTitle('Thực đơn')
    this.getDrinks();
  }

  getDrinks(){
    this.drinkService.getDrinksAWS().subscribe(
      (res) => {
        this.DrinkArray = res;
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
