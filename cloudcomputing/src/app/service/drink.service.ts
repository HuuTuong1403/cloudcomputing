import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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

  addDrinkAWWS(formAddDrink: FormData): Observable<any>{
    return this.http.post<any>(this.local + 'drinks/add-drink', formAddDrink);
  }
}
