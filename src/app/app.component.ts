import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { apiUsersGet } from './services/auth-services/functions';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from './services/auth-services/api-configuration';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Scalable_E-Commerce_Platform';

  constructor(private http: HttpClient, private apiConfig: ApiConfiguration) { }
  // Test call to the generated API function
  ngOnInit() {
    console.log('Calling API to get users...');
    const params = {
      UserCode: 'admin',
    };

    this.getUsers(params);
  }

  getUsers(params:any) {
    apiUsersGet(this.http, this.apiConfig.rootUrl, params).subscribe(res => {
      const data = JSON.parse(res.body as unknown as string);
      console.log(data.result);
    });
  }

}
