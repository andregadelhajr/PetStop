import { environment } from 'src//environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste-error',
  templateUrl: './teste-error.component.html',
  styleUrls: ['./teste-error.component.scss']
})
export class TesteErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUrl + 'produtos/42').subscribe(Response => {
      console.log(Response);
    }, error => {
      console.log(error);
    });
  }

  get500Error(){
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(Response => {
      console.log(Response);
    }, error => {
      console.log(error);
    });
  }

  get400Error(){
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(Response => {
      console.log(Response);
    }, error => {
      console.log(error);
    });
  }

  get400ValidationError(){
    this.http.get(this.baseUrl + 'produtos/fortytwo').subscribe(Response => {
      console.log(Response);
    }, error => {
      console.log(error);
      this.validationErrors = error.errors;
    });
  }

}
