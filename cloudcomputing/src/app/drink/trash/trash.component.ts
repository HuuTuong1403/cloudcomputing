import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DrinkService } from '../../service/drink.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  DrinkDeleteArray: any[] = [];
  active = true;

  constructor(private router: Router,
    private drinkService: DrinkService,
    private notify: NzNotificationService) { }

  ngOnInit(): void {
    this.getDrinkDelete();
    const data = [];
    for(let i of this.DrinkDeleteArray){
      data.push(this.DrinkDeleteArray[i]);
    }
  }

  turnBack(): void{
    this.router.navigate(['/drink']);
  }

  getDrinkDelete(){
    this.drinkService.getDrinkDelete().subscribe(
      (res) => {
        this.DrinkDeleteArray = res;
        this.drinkService.setSession(this.DrinkDeleteArray);
        this.active = false;
      },
      (err) => {

      }
    )
  }

  deleteHardDrink(DrinkName: string): void{
    this.active = true;
    this.drinkService.deleteHardDrink(DrinkName).subscribe(
      (res) => {
        this.createNotify('success', `Bạn đã xóa món ${DrinkName} vĩnh viễn`)
        this.getDrinkDelete();
        setTimeout(() => {
          this.active = false;
        }, 1000)
      },
      (err) => {
        this.active = false;
        this.createNotify('success', 'Đã xảy ra lỗi trong quá trình xóa')
        console.log(err);
      }
    )
  }

  restoreDrink(DrinkName: string): void{
    this.active = true;
    this.drinkService.restoreDrink(DrinkName).subscribe(
      (res) => {
        this.createNotify('success', `Bạn đã khôi phục món ${DrinkName} thành công`)
        this.getDrinkDelete();
        setTimeout(() => {
          this.active = false;
        }, 1000)
      },
      (err) => {
        this.active = false;
        this.createNotify('success', 'Đã xảy ra lỗi trong quá trình khôi phục')
        console.log(err);
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
