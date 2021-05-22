import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router,
    private route: ActivatedRoute){}

  isSelected(route: string): boolean{
    var router;
    if(route == '/drink'){
      router = route;
      return true;
    }
    else{
      router = '/drink' + route
    }
    return router=== this.router.url;
  }

  isRouter(): boolean{
    if(this.router.url != '/menu'){
      return false;
    }

    return true;
  }
}
