import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DrinkService } from '../../service/drink.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-delete-drink',
  templateUrl: './delete-drink.component.html',
  styleUrls: ['./delete-drink.component.scss']
})
export class DeleteDrinkComponent implements OnInit {

  DrinkArray: any[] = [];
  isVisible: boolean = false;
  active = true;

  constructor(private router: Router,
    private drinkService: DrinkService,
    private notify: NzNotificationService,) { }

  ngOnInit(): void {
    this.getDrinks();
    const data = [];
    for(let i of this.DrinkArray){
      data.push(this.DrinkArray[i]);
    }
  }
  DrinkName: string = "";
  showModalDelete(DrinkName: string): void{
    this.isVisible = true;
    this.DrinkName = DrinkName;
  }

  cancelDetail():void{
    this.isVisible = false;
  }

  turnBack(): void{
    this.router.navigate(['/drink']);
  }

  getDrinks(){
    this.drinkService.getDrinksAWS().subscribe(
      (res) => {
        this.DrinkArray = res;
        this.active = false;
      },
      (err) => {
        this.createNotify('error', 'Đã xảy ra lỗi');
      }
    )
  }

  isLoading = false;
  deleteDrink(): void{
    this.isLoading = true;
    this.drinkService.deleteDrink(this.DrinkName).subscribe(
      (res) => {
        this.isLoading = false;
        this.createNotify('success', `Bạn đã xóa món ${this.DrinkName} thành công`)
        this.isVisible = false;
        this.getDrinks();
      },
      (err) => {
        this.createNotify('error', `Đã xảy ra lỗi trong quá trình xóa`)
      }
    )
  }

  createNotify(type: string, content: string): void{
    if(type === 'success'){
      this.notify.create(
        type,
        'Thông báo',
        content,
        {
          nzStyle: {'background-color': '#DFFFD7'}
        }
      );
    }
    else{
      this.notify.create(
        type,
        'Thông báo',
        content,
        {
          nzStyle: {'background-color': '#FFCCCC'}
        }
      );
    }
  }
}
