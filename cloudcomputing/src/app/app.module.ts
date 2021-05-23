import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { HttpClientModule } from '@angular/common/http';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DrinkComponent } from './drink/drink.component';
import { AddDrinkComponent } from './drink/add-drink/add-drink.component';
import { UpdateDrinkComponent } from './drink/update-drink/update-drink.component';
import { DeleteDrinkComponent } from './drink/delete-drink/delete-drink.component';
import { UpdateDrinkDetailComponent } from './drink/update-drink-detail/update-drink-detail.component';
import { MenuComponent } from './menu/menu.component';
import { TrashComponent } from './drink/trash/trash.component';
import { MenuDetailComponent } from './menu/menu-detail/menu-detail.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DrinkComponent,
    AddDrinkComponent,
    UpdateDrinkComponent,
    DeleteDrinkComponent,
    UpdateDrinkDetailComponent,
    MenuComponent,
    TrashComponent,
    MenuDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    HttpClientModule,

    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCardModule,
    NzNotificationModule,
    NzModalModule,
    NzDividerModule,
    NzButtonModule,
    NzSpinModule,
    NzGridModule,

    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,

  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
