import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  private url = "";
  private local = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  getDrinksAWS(): Observable<any>{
    return this.http.get<any[]>(this.local + 'drinks')
  }

  setSession(data: any[]){
    localStorage.setItem("drinks", JSON.stringify(data));
  }

  getSession(){
    var data: any[] = [];
    data = JSON.parse(localStorage.drinks);
    return data;
  }

  addDrinkAWWS(formAddDrink: FormData): Observable<any>{
    return this.http.post<any>(this.local + 'drinks/add-drink', formAddDrink);
  }

  getDrinkByDrinkName(DrinkName: string): Observable<any>{
    return this.http.get<any>(this.local + 'drinks/update-drink/' + DrinkName);
  }

  updateDrink(formUpdateDrink: FormData, DrinkName: string): Observable<any>{
    return this.http.put<any>(this.local + 'drinks/update-drink/' + DrinkName,  formUpdateDrink);
  }

  getDrinkType(): Observable<any[]>{
    return this.http.get<any[]>(this.local + 'drinks/get-drink-type');
  }

  deleteDrink(DrinkName: string): Observable<any>{
    return this.http.delete<any>(this.local + 'drinks/delete-drink', { params: { DrinkName } });
  }

  getDrinkDelete(): Observable<any[]>{
    return this.http.get<any[]>(this.local + 'drinks/restore-drink');
  }

  deleteHardDrink(DrinkName: string): Observable<any>{
    return this.http.delete<any>(this.local + 'drinks/delete-hard-drink', { params: { DrinkName }} );
  }

  restoreDrink(DrinkName: string): Observable<any>{
    return this.http.delete<any>(this.local + 'drinks/restore-drink', {  params: { DrinkName }});
  }
}
