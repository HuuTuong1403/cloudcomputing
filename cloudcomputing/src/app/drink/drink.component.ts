import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DrinkService } from '../service/drink.service';
import { Title } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
              private title: Title,
              private notify: NzNotificationService) {}

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
