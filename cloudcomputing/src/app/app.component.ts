import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router,
    private title: Title){
      title.setTitle("Trang chủ");
    }

  isSelected(route: string): boolean{
    var router = '/drink' + route;
    return router=== this.router.url;
  }
}
