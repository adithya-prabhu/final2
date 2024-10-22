import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../order-details';
import { Product } from '../product';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8014';

  public userSignUp(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/signup`, user);
  }

  public addMedicine(product: Product, image: Blob): Observable<any> {
    let formData = new FormData();
    formData.append('product', JSON.stringify(product));
    formData.append('image', image);
    return this.http.post<any>(`${this.baseUrl}/add-product`, formData);
  }

  public getAllMedicine(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get/all-products`);
  }

  public getMedicineByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get/products/${name}`);
  }

  public getMedicineByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get/products-by-category/${category}`);
  }

  public findById(pid: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-product/${pid}`);
  }

  public updateMedicine(pid: number, product: Product): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update-product/${pid}`, product);
  }

  public setAvailable(pid: number, product: Product): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/set-availability/product/${pid}`, product);
  }

  public createOrder(orderDetails: OrderDetails): Observable<OrderDetails> {
    return this.http.post<OrderDetails>(`${this.baseUrl}/create/order`, orderDetails);
  }

  public getOrderById(oid: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/order-invoice/${oid}`);
  }

  public getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get/all/orders`);
  }

  public deleteOrder(oid: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/order/${oid}`);
  }

  public getOrderByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get/orders/${username}`);
  }

  public allusers(): Observable<any[]> {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtZWRpY2FyZS5jb20iLCJleHAiOjE3Mjk2MjgzMjUsImlhdCI6MTcyOTU5MjMyNX0.V5cR209SBspGd9tjYT6RGoPYxtjS7LkTgiMeMIC2T6k" // or however you store your token
 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Include the token in the headers
    });
 
    console.log("from allusers method------------")
    return this.http.get<any[]>(`${this.baseUrl}/allusers`, { headers });
  }


}
