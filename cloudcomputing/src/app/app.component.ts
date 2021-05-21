import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cloudcomputing';

  constructor(private router: Router){}

  isSelected(route: string): boolean{
    var router = '/drink' + route;
    return router=== this.router.url;
  }
}
