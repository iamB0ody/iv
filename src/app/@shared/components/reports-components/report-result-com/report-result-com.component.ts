import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { ReportService } from 'src/app/@core/services/http/report.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/@core/services/http/user.service';

@Component({
  selector: 'app-report-result-com',
  templateUrl: './report-result-com.component.html',
  styleUrls: ['./report-result-com.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class ReportResultComComponent implements OnInit {
  // genral
  dataSource: any[] = []
  PagesNumber: number = 500
  loading: boolean = true;
  tableHeader: any[] = []
  fillter: any
  RouterId: any;
  DataLoaded: any = true;
  layouts:any[]=[]
layourArr:any[]=[];
updateArray:any[]=[]
lName:any;
shAddBtn:boolean=true;
  DialogVisabilty: boolean = false;
  DialogFunction: any
  DialogItem: any;
  DialogSelectionFunction:boolean=false;
  DialogUpdateFunction:boolean=false;
  DialogUpdateSelectedReport:boolean=false;
  hasLayouts:boolean=false;
  str!:string;
  pageNum:number=1;
  constructor(private userService:UserService,private messageService: MessageService,
    private reportService: ReportService,
    private activatedRoute: ActivatedRoute,


  ) {
 this.RouterId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  // * life cycle hooks
  ngOnInit(): void {
    if(!this.reportService.reportData)
    {
  this.paginateRefresh();
     }
    this.fake()
    var Router =this.reportService.reportData;    
    this.dataSource = Router?.data
    this.PagesNumber = Router.length
    this.DataLoaded = false
    this.InitTableHeader()
    
  }
  // * end life cycle hooks

  // to get table header 
  InitTableHeader() {
  this.shAddBtn=true;
    this.tableHeader=[]  
    var sub=' ' ; 
    for(let i=0;i<this.dataSource.length;i++)
    {
     for(let j=0;j< Object.values(this.dataSource[i]).length;j++)
     {
        
        let key = Object.keys(this.dataSource[i])[j]
      this.str=String( Object.values(this.dataSource[i])[j]);
      this.dataSource[i][key]=  this.str.replace("T00:00:00",sub)
     
     }
      
    }
    if (this.dataSource) {
      for (const key in { ...this.dataSource[0] }) {
    
      
      
        this.tableHeader.push(key)
      }
    }
  }
  //end to get table header 

  // sum column
  SumClicked = false
  sumTotalValue = 0
  SumColumn(item: any) {
    this.fillter = undefined
    // Get Clulmn value from Parent header
    var RowData: any[] = []
    this.dataSource.map(itemData => {
      RowData.push(itemData[item]);
    })
    // end Get Clulmn value from Parent header
    // check if Row Is Nmber
    if (Number.isInteger(RowData[0])) {
      this.sumTotalValue = RowData.reduce((a, b) => a + b)
      this.sumTotalValue == 0 ? this.messageService.add({ severity: 'error', summary: 'Error', detail: 'this row is Empety' }) : ''
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cant Sum this Row' });
    }
    // console.log(RowData);

  }
  // Save Layout
  SaveLayout() {
    this.layourArr=[]
    this.DialogFunction = 'Select';
    this.DialogVisabilty = true;
  }
  addLayout()
  { this.DialogVisabilty=false
      let obj={}
      obj = {
    
      LayoutName: this.lName,
      ReportName: this.RouterId,
      FieldsNames: this.layourArr,
      AllFieldsNames:this.tableHeader
    
  }
 
    this.reportService.addLayout(obj).subscribe((data) => {

      this.messageService.add({ severity: 'success', summary: 'Save', detail: 'Layout Added' });
      this.lName='';
    })
    
  }
  SelectLayout() {
    this.layouts=[]
    this.DialogSelectionFunction=true
    this.reportService.getLayouts(this.RouterId).subscribe((data:any) => {
    this.layouts=data.data; 
    if( this.layouts.length>0)
    {this.hasLayouts=true;}
    else
    {this.messageService.add({ severity: 'info', summary: 'Info message', detail: 'Empty Layouts List' });}

})
  }
  openLayout(layoutId:any) {
    this.shAddBtn=false;
    this.tableHeader=[]
    this.reportService.getSelectedLayout(layoutId).subscribe((data:any) => {
    for(let i=0;i<data.data.length;i++)
    {if(data.data[i].checked===true)
      this.tableHeader.push(data.data[i].fieldName)}
    
 this.DialogSelectionFunction=false;    })
  }
  updateLayout() {
    this.layouts=[]   
     this.DialogUpdateFunction=true;
    this.reportService.getLayouts(this.RouterId).subscribe((data:any) => {
    this.layouts=data.data; 
  if( this.layouts.length>0)
 {this.hasLayouts=true;
} 
else{this.messageService.add({ severity: 'info', summary: 'Info message', detail: 'Empty Layouts List' });}
   

})
  }
  updateLayoutFunction(id:any,name:any)
  {  
    this.lName=name; 
    this.layourArr=[];
    this.tableHeader=[];
    this.updateArray=[]
    this.reportService.getSelectedLayout(id).subscribe((data:any) => {      
     this.updateArray=data.data;
      for(let i=0;i<data.data.length;i++)
      {
        this.tableHeader.push(data.data[i].fieldName)
     
      }  
        
       this.DialogUpdateFunction=false; 
       for(let i=0;i<this.updateArray.length;i++)
       {
        if(this.updateArray[i].checked==true)
        this.layourArr.push(data.data[i].fieldName)
       }     
     this.DialogUpdateSelectedReport=true;}) 
          
          
     
  }
  submitUpdate()
  {
    this.DialogVisabilty=false
    let obj={}
    obj = {
  
    LayoutName: this.lName,
    ReportName: this.RouterId,
    FieldsNames: this.layourArr,
    AllFieldsNames:this.tableHeader
  
}

  this.reportService.updateLayout(obj).subscribe((data) => {

    this.messageService.add({ severity: 'success', summary: 'succes message', detail:data.message });
    this.lName='';
  })
  
  }
 
  
  deleteLayout(id:any)
  {
    this.reportService.deleteLayout(id).subscribe((data: any) => {
      this.messageService.add({ severity: 'success', summary: 'success message', detail: data.message }); 
    }, (err: any) => {});
  }
  CheckSelectItem(item: any,ev:any) {    
     if(ev.target.firstChild.nodeValue=='Remove')
    {
      ev.target.firstChild.nodeValue
      ='Select' 
      const index: number = this.layourArr.indexOf(item);
      if (index !== -1) {
        this.layourArr.splice(index, 1);
      } 
    }
    else{
     ev.target.firstChild.nodeValue
    ='Remove' 
    this.layourArr.push(item)}
    
    
    
  }
  ExportTOExcel() {
    this.DataLoaded = true
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${this.RouterId}.xlsx`);
    this.DataLoaded = false
  }
  // end Export Layout
  // paginate
  paginate(event: any) {
    var SelectionCriteria = JSON.parse(localStorage.getItem('SelectionCriteria') || '{}')
    this.DataLoaded = true
    this.reportService.executeReport(SelectionCriteria, this.pageNum, 10000, this.RouterId).subscribe((data: any) => {
      this.DataLoaded = false
      localStorage.setItem('ReportResults', JSON.stringify(data));
      this.dataSource = data.data
      this.PagesNumber = data.length
      this.InitTableHeader();
      this.dataSource =this.dataSource ;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
      this.DataLoaded = false
    });
    this.pageNum++;
  }
   //////////////////////////
   paginateRefresh()
   {
     var SelectionCriteria = JSON.parse(localStorage.getItem('SelectionCriteria') || '{}')
     this.DataLoaded = true
     this.reportService.executeReport(SelectionCriteria, this.pageNum, 10000, this.RouterId).subscribe((data: any) => {
       if(data.data.length > 0 )
       {this.DataLoaded = false
         // localStorage.setItem('ReportResults', JSON.stringify(data));
         this.dataSource = data.data
         this.PagesNumber = data.length
         this.InitTableHeader();
         this.dataSource =this.dataSource ;
         }
         else{
           this.messageService.add({ severity: 'info', summary: 'Info Message', detail: `Last Page` });
           this.DataLoaded = false;
         }
     }, (err: any) => {
       if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
         this.userService.userLogout();
       }
       this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
       this.DataLoaded = false
     });
     
   }
  //////////////////////////
  paginatePositive()
  {
    var SelectionCriteria = JSON.parse(localStorage.getItem('SelectionCriteria') || '{}')
    this.DataLoaded = true;
    this.pageNum++;
    this.reportService.executeReport(SelectionCriteria, this.pageNum, 10000, this.RouterId).subscribe((data: any) => {
      if(data.data.length > 0 )
      {this.DataLoaded = false
        // localStorage.setItem('ReportResults', JSON.stringify(data));
        this.dataSource = data.data
        this.PagesNumber = data.length
        this.InitTableHeader();
        this.dataSource =this.dataSource ;
       }
        else{ this.pageNum--;
          this.messageService.add({ severity: 'info', summary: 'Info Message', detail: `Last Page` });
          this.DataLoaded = false;
        }
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
      this.DataLoaded = false
    });
    
  }
    //////////////////////////
    paginateNegative()
    {
      if(this.pageNum > 1)
      { this.pageNum--;
      var SelectionCriteria = JSON.parse(localStorage.getItem('SelectionCriteria') || '{}')
      this.DataLoaded = true
      this.reportService.executeReport(SelectionCriteria, this.pageNum, 10000, this.RouterId).subscribe((data: any) => {
        this.DataLoaded = false
        localStorage.setItem('ReportResults', JSON.stringify(data));
        this.dataSource = data.data
        this.PagesNumber = data.length
        this.InitTableHeader();
        this.dataSource =this.dataSource ;
      }, (err: any) => {
        if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
          this.userService.userLogout();
        }
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
        this.DataLoaded = false
      });
     
    }}
  ////////////All Data
  ExportAllData()
  {
    this.messageService.add({ severity: 'warn', summary: 'Long Time', detail: `Exporting Will Take Long Time` });
     this.DataLoaded = true
    var SelectionCriteria = JSON.parse(localStorage.getItem('SelectionCriteria') || '{}')
    this.reportService.executeReport(SelectionCriteria,0,0,this.RouterId).subscribe((data: any) => {
     if(data)
     {
      //this.dataSource=data
     //this.InitTableHeader()
     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${this.RouterId}.xlsx`);
    this.DataLoaded = false
     }
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
    });
  }
  //end paginate

  // ********************************fakes ********************************

  fake() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
