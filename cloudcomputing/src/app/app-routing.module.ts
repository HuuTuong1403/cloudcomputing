import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinkComponent } from './drink/drink.component';
import { AddDrinkComponent } from './drink/add-drink/add-drink.component';
import { UpdateDrinkComponent } from './drink/update-drink/update-drink.component';
import { DeleteDrinkComponent } from './drink/delete-drink/delete-drink.component';
import { UpdateDrinkDetailComponent } from './drink/update-drink-detail/update-drink-detail.component';
import { TrashComponent } from './drink/trash/trash.component';

import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'drink', component: DrinkComponent, children: [
    { path: '', redirectTo: 'drink', pathMatch: 'full'},
    { path: 'trash', component: TrashComponent},
    { path: 'add-drink', component: AddDrinkComponent},
    { path: 'update-drink', component: UpdateDrinkComponent},
    { path: 'update-drink/:name', component: UpdateDrinkDetailComponent},
    { path: 'delete-drink', component: DeleteDrinkComponent }
  ]},
  { path: '', pathMatch: 'full', redirectTo: '/drink'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
