import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClipboardService } from 'ngx-clipboard';
import { MessageService } from 'primeng/api';
import { ReportService } from 'src/app/@core/services/http/report.service';

@Component({
  selector: 'helper-dialog',
  templateUrl: './helper-dialog.component.html',
  styleUrls: ['./helper-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelperDialogComponent implements OnInit, OnChanges{
  @Input() HelperDetail: any;
  @Input() TableVisabilities!: boolean;
  @Input() HelperTableContent!: any;
  @Output() messageEvent = new EventEmitter< string>();
  message!: string;
  loading: boolean = true;
  representatives!: any[];
  tableHeader: any[] = [];
  fillter: any;
  sendedtoSelection:any;

  constructor( private clipboardApi: ClipboardService, public messageService: MessageService,private reportService:ReportService) { }
  ngOnInit(): void {
    this.fakeData()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['HelperTableContent']){
        
      this.HelperTableContent = changes['HelperTableContent']?.currentValue
      this.InitTableHeader()
      this.loading = false

    }
  }
  // to get table header 
  InitTableHeader() {
    this.tableHeader = []
    for (const key in { ...this.HelperTableContent[0] }) {
      this.tableHeader.push(key)
      
    }
  }
  //end to get table header 
  fakeData() {
    setTimeout(() => {
      this.loading = false
    }, 1000);
  }
  selectVal(val:any)
  {
  //  console.log(this.HelperTableContent);
   for(let i=0;i<this.HelperTableContent.length;i++)
   {const x=new Map(Object.entries(this?.HelperTableContent[i]))
    const output = [...x.values()];
    // Object.keys(x)
    // .map(function(n) {
    // return [+n,x[n]];
    // });
    
    for(let j=0;j<output.length;j++)
   {
    // console.log(output[j])
    if(output[j]==val)
    {this.sendedtoSelection=output[0];
      this.messageEvent.emit(this.sendedtoSelection);
      this.reportService.help=false;
    }
   }
  }
   
    // this.messageEvent.emit(val);

  this.closeDialog()
  }
  closeDialog()
  {
    this.HelperDetail.DialogModule = false;
    this.reportService.help=false;
    this.messageEvent.emit("done")
  }
 
}