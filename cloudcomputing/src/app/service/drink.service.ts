import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  private url = "https://coffee-server-dynamodb.herokuapp.com/";
  private local = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  getDrinksAWS(): Observable<any>{
    return this.http.get<any[]>(this.url + 'drinks')
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
    return this.http.post<any>(this.url + 'drinks/add-drink', formAddDrink);
  }

  getDrinkByDrinkName(DrinkName: string): Observable<any>{
    return this.http.get<any>(this.url + 'drinks/update-drink/' + DrinkName);
  }

  updateDrink(formUpdateDrink: FormData, DrinkName: string): Observable<any>{
    return this.http.put<any>(this.url + 'drinks/update-drink/' + DrinkName,  formUpdateDrink);
  }

  getDrinkType(): Observable<any[]>{
    return this.http.get<any[]>(this.url + 'drinks/get-drink-type');
  }

  deleteDrink(DrinkName: string): Observable<any>{
    return this.http.delete<any>(this.url + 'drinks/delete-drink', { params: { DrinkName } });
  }

  getDrinkDelete(): Observable<any[]>{
    return this.http.get<any[]>(this.url + 'drinks/restore-drink');
  }

  deleteHardDrink(DrinkName: string): Observable<any>{
    return this.http.delete<any>(this.url + 'drinks/delete-hard-drink', { params: { DrinkName }} );
  }

  restoreDrink(DrinkName: string): Observable<any>{
    return this.http.delete<any>(this.url + 'drinks/restore-drink', {  params: { DrinkName }});
  }
}
