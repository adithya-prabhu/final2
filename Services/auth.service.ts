import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangePassword } from '../changepassword';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8014'; // Replace with your actual API URL
 
  changePasswordObject: ChangePassword = {
    username: '',
    password: ''
  };
  constructor(private http: HttpClient) {}
 
  // validateUser(username: string, contactnumber: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/validate-user`, { username, contactnumber });
  // }
 
  changePassword(username: string, newPassword: string): Observable<any> {
    // const body = new URLSearchParams();
    // body.set('username', username);
    // body.set('newPassword', newPassword);
    // console.log("-=--------------------------",body.toString());
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtZWRpY2FyZS5jb20iLCJleHAiOjE3Mjk2MjgzMjUsImlhdCI6MTcyOTU5MjMyNX0.V5cR209SBspGd9tjYT6RGoPYxtjS7LkTgiMeMIC2T6k" // or however you store your token
 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Include the token in the headers
    });
    console.log("username", username);
    console.log("password", newPassword);
    this.changePasswordObject.username = username;
    this.changePasswordObject.password = newPassword;
    console.log("change username", this.changePasswordObject.username);
    console.log("chanbge password", this.changePasswordObject.password);
    return this.http.post(`${this.apiUrl}/change-password`, this.changePasswordObject, {
      headers: headers
    });
  }
 
}