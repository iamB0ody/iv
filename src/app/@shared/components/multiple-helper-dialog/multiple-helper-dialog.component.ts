import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClipboardService } from 'ngx-clipboard';
import { MessageService } from 'primeng/api';
import { ReportService } from 'src/app/@core/services/http/report.service';

@Component({
  selector: 'multiple-helper-dialog',
  templateUrl: './multiple-helper-dialog.component.html',
  styleUrls: ['./multiple-helper-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultipleHelperDialogComponent {
  @Input() MultipleHelperDetail: any;
  @Input() TableVisabilities!: boolean;
  @Input() MultipleHelperTableContent!: any;
  @Input() criteriaField!: any;
  @Output() messageEvent = new EventEmitter<string>();
  message!: string;
  loading: boolean = true;
  loadPage:boolean=false;
  representatives!: any[];
  tableHeader: any[] = [];
  fillter: any;
  sendedtoSelection:any;
  genArr:any[]=[];
  constructor(public messageService: MessageService,private reportService:ReportService) { }
  ngOnInit(): void {
    this.fakeData();
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['MultipleHelperTableContent']){   
      this.MultipleHelperTableContent = changes['MultipleHelperTableContent']?.currentValue
      this.InitTableHeader()
      this.loading = false;
      this.loadPage=true
    }
    // if(changes['criteriaField']){   
    //   this.MultipleHelperTableContent = changes['criteriaField']?.currentValue
    //   // this.InitTableHeader()
    //   // this.loading = false;
    //   // this.loadPage=true
    //    alert(this.criteriaField)
    // }
  }
  // to get table header 
  InitTableHeader() {
    this.tableHeader = []
    for (const key in { ...this?.MultipleHelperTableContent[0] }) {
      if(key)
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
   for(let i=0;i<this.MultipleHelperTableContent.length;i++)
   {const x=new Map(Object.entries(this?.MultipleHelperTableContent[i]))
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
      this.messageEvent.emit(this.sendedtoSelection)
    }
   }
  }
   
    // this.messageEvent.emit(val);

  this.closeDialog()
  }
  
  closeDialog()
  {
    this.MultipleHelperDetail.DialogModule = false;
    
    this.reportService.multipleHelp=false;
    this.messageEvent.emit("done");
  }
  // closeDialog()
  // {
  //   this.HelperDetail.DialogModule = false;
  //   this.reportService.help=false;
  // }
  changeSelection(val:any)
  {
    
      this.reportService.selectionCriteria.push(val);
     
    let len=this.genArr.length
this.genArr[len]=Object.entries(val)
for(let i=0;i<this.genArr.length;i++)
alert(this.genArr[i])

  }
  ngOnDestroy() {
    this.closeDialog()
  }
}