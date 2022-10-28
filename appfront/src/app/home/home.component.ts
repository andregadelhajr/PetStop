import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  face = 'https://cdn-icons-png.flaticon.com/512/59/59439.png';
  inst = 'https://c.neh.tw/thumb/f/720/m2H7H7i8Z5d3K9Z5.jpg';
  tt = 'https://cdn-icons-png.flaticon.com/512/1384/1384033.png';

  constructor() { }

  ngOnInit(): void {
  }

}
