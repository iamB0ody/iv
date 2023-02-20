import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/@core/services/http/request.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.scss']
})
export class AdminRequestsComponent implements OnInit {
  requestsData: any;
  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    // this.getRequestsData();
  }
   

}

