import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAuthunticated: boolean = false;
  constructor(public route: Router) {

  }



  ngOnInit(): void {
    this.route.events.subscribe(() => {
      if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
        this.isAuthunticated = true;
      }
      else {
        this.isAuthunticated = false;
      }
    });
  }

}
