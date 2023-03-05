
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ReportService } from 'src/app/@core/services/http/report.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { UserService } from 'src/app/@core/services/http/user.service';

@Component({
  selector: 'app-execlude-ranges',
  templateUrl: './execlude-ranges.component.html',
  styleUrls: ['./execlude-ranges.component.scss']
})
export class ExecludeRangesComponent {
  Months: any[] = [
    '01','02','03','04','05','06','07','08','09','10','11','12'
  ];
  date1 = new FormControl();
  date2 = new FormControl();
  allVariables: any[] = [];
  isLoaded: boolean = false;
  RouterId: any
  HelperDetail: any;
  HelperTableContent: any;
  simpleOptionsFakedata: any
  message1: string = '';
  inputText: any;
  variantItem:any;
  variantEvent:any;
  variantSide:any;
  FormatedData: any[] = [];
  dValue1:any;
  dValue2:any;
  selectedOption1!: string;
  selectedOption2!: string;
  datesArr:any[]=[];
  selectionForm!:FormGroup;
  ////////////////////multiple///////////
  MultipleHelperDetail: any;
  MultipleHelperTableContent: any;
  @Input() criteriaField: any;
displayedTable:any[]=[];
displayedTable2:any[]=[];
  constructor(private userService:UserService,
    private activatedRoute: ActivatedRoute,
    private reportService: ReportService,
    public messageService: MessageService,
    private router: Router,private fb: FormBuilder) { }
  // * life cycle hooks
  ngOnInit(): void {
    this.initData();
    this.GetSelectionCriteria(this.RouterId);
  }
  chosenYearHandler1(dp: any) {
    this.dValue1=dp;
    const ctrlValue = this.date1.value;
    ctrlValue.year(dp);
    this.date1.setValue(ctrlValue);
    dp.close();
   
  }
 
  // * end life cycle hooks

  // init genral data
  initData(): void {
    this.isLoaded = true;
    this.RouterId = this.activatedRoute.snapshot.paramMap.get('id');
  }
  // init genral data



  // input select change and formated data for simple api
  ChangeInput(type: string, Side: any, event: any, item: any) {
    if (Side == 'From') {
      item.Indicator = 2;
      item.Low = [type == 'input' ? event.target.value : event.value]
      this.FormatedData.push(item)
      // check input type from left side or from right side to update or add new 
      this.FormatedData.forEach((element: any, index: any) => {
        // if (element.HelpFullLeft === true && index) {
        // }
      });
      // end check input type from left side or from right side to update or add new 
    }
     else {
      item.Indicator = 10
      item.High = [type == 'input' ? event.target.value : event.value]
      this.FormatedData.push(item)
      // end check input type from left side or from right side to update or add new 
      this.FormatedData.forEach((element: any, index: any) => {
        // if (element.HelpFullRight === true && index) {
        // }
      });
      // end check input type from left side or from right side to update or add new 
    }
    //end  check input type from left side or from right side

    this.ValidateInput(item)
    

    // log data
  }
  ChangeInput3(type: string, Side: any, event: any, item: any) {
    // check input type from left side or from right side
    if (Side == 'From') {
      item.Indicator = 2
      item.Low = [type == 'input' ? event : event]
      this.FormatedData.push(item)
     
      // check input type from left side or from right side to update or add new 
      this.FormatedData.forEach((element: any, index: any) => {
        if (element.HelpFullLeft === true && index) {
        }
      });
      // end check input type from left side or from right side to update or add new 


    } 
    else {
      item.Indicator = 10
      item.High = [type == 'input' ? event : event]
      this.FormatedData.push(item)
     
      // end check input type from left side or from right side to update or add new 
      this.FormatedData.forEach((element: any, index: any) => {
        if (element.HelpFullRight === true && index) {
        }
      });
      // end check input type from left side or from right side to update or add new 

    }
    //end  check input type from left side or from right side

    this.ValidateInput(item)
    

    // log data
  
  }
  ChangeInput4(type: string, Side: any, event: any, item: any) {
   
   event=[this.selectionForm.controls[event].value.getMonth()+1,this.selectionForm.controls[event].value.getDate(),this.selectionForm.controls[event].value.getFullYear()].join('-');
   event?.slice(1, -1)
    // send Indicator 0 For make it For Equal in backend
    // End send Indicator 0 For make it For Equal in backend
    // check input type from left side or from right side
    if (Side == 'From') {
      item.Indicator = 2
      item.Low = [type == 'input' ? event : event]
      this.FormatedData.push(item)
      // check input type from left side or from right side to update or add new 
      this.FormatedData.forEach((element: any, index: any) => {
        if (element.HelpFullLeft === true && index) {
        }
      });
      // end check input type from left side or from right side to update or add new 
    } 
    else {
      item.Indicator = 10
      item.High = [type == 'input' ? event : event]
      this.FormatedData.push(item)
     
      // end check input type from left side or from right side to update or add new 
      this.FormatedData.forEach((element: any, index: any) => {
        if (element.HelpFullRight === true && index) {
        }
      });
      // end check input type from left side or from right side to update or add new 

    }
    //end  check input type from left side or from right side

    this.ValidateInput(item)
  
    // log data

  }
  // end input select change and formated data for simple api
  // Check if items value is valid
  ValidateInput(item: any) {
    if (item.Low && item.High) {
      if (item.Low < item.High || item.Low == item.High) {
        // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Pleas Enter Valid Value' });
        return
      }
    }
  }
  // end Check if items value is valid
  // Check if Vlaue is Invalid 
  CheckSelectedRange(vlaue: any) {
  
  }
  // end Check if Vlaue is Invalid 

  // Get Input History  
  // help button
  HelpFull(e: Event) {
    this.HelperDetail = e
    this.isDataLoaded = true
    this.reportService.GetHelpButton(this.HelperDetail.fieldName).subscribe((data) => {
      this.isDataLoaded = false

      this.HelperTableContent = data
      this.HelperDetail.DialogModule = true

    }, (err: any) => {
      this.isDataLoaded = false
      this.HelperTableContent = []
      this.HelperDetail.DialogModule = false
    });
    
    
  }
  ////////////////////////////////multiple help////////////////////////////////////////
  multipleHelper(e: Event) {

  
    this.HelperDetail = e
    this.isDataLoaded = true
    this.reportService.GetHelpButton(this.HelperDetail.fieldName).subscribe((data) => {
      this.isDataLoaded = false

      this.HelperTableContent = data
      this.HelperDetail.DialogModule = true

    }, (err: any) => {
      this.isDataLoaded = false
      this.HelperTableContent = []
      this.HelperDetail.DialogModule = false
    });
    
    
    
  }
  // end help button

  // ***************************Call API Data*************************************
  // get Section criteria
  GetSelectionCriteria(code: string) {
    this.reportService.getSelectedReport(code).subscribe((data: any) => {
      for(let j=0;j <data.length;j++)
      {
        if(data[j].fieldName==this.criteriaField )
     {
       this.allVariables.push(data[j])
      }
      }
      // this.allVariables = data;
     
      for(let i=0;i<this.allVariables.length;i++)
      {
        if(this.allVariables[i].type===1)
        {
          this.datesArr.push(this.allVariables[i].fieldName+"From")
          this.datesArr.push(this.allVariables[i].fieldName+"To")
        }

      }
     
     
      for(let i=0;i<this.allVariables.length;i++)
      {
        if(this.allVariables[i].type===1)
        {
          this.datesArr.push(this.allVariables[i].fieldName+"From")
          this.datesArr.push(this.allVariables[i].fieldName+"To")
        }

      }
     
      this.selectionForm=new FormGroup([])
    
      this.datesArr.forEach(x=>{
     
        this.selectionForm.addControl(x,new FormControl())
     });
    
    }
    , (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
    });
  }
  getControl(key:string)
  {
    return this.selectionForm.get(key) as FormControl
  }
  // end get Section criteria
  // GetHistory
  simpleOptions: any[] = []
  GetHistory(item: any, Side: any,ev:any): void {
    this.variantEvent=ev; 
    this.variantItem=item;
    this.variantSide=Side;
    
    
    this.reportService.getInputHistoryValues(item.technicalName, this.RouterId).subscribe((data: any) => {
    

      this.simpleOptions = data.data;
     

    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
    });

    // this.simpleOptions = [...this.simpleOptionsFakedata.data]
    if (Side == 'From') {
      item.HelpFullLeft = true ;
    } else {
      item.HelpFullRight = true
    }
  }
  dataFake: any
  historyFormatedData: any[] = []
  isDataLoaded: any = false
  ExcuteAndGetReportResult() {
    
    var unique = [...new Set(this.FormatedData)];
    

    if (this.displayedTable.indexOf("From " +unique[0].Low) === -1 && unique[0].Low!='') 
    this.displayedTable.push("From " + unique[0].Low)
    if (this.displayedTable2.indexOf(" To " +unique[0].High) === -1) 
        this.displayedTable2.push(" To " + unique[0].High)
 // this.isDataLoaded = true
    if (unique.length > 0) {
      unique.map(data => {
        data.Indicator = 1;
        data.Indicator = (data.High && !data.Low) ? 10 : data.Indicator //less than  10
        data.Indicator = (data.Low && !data.High) ? 0 : data.Indicator // sEqual, //0
        data.Low = data.Low ? data.Low : []
        data.High = data.High ? data.High : []
      })
    //   this.reportService.executeReport(unique, 1, 10000, this.RouterId).subscribe((data: any) => {
    //     this.isDataLoaded = false
    //    this.reportService.reportData=data;
    //     localStorage.setItem('SelectionCriteria', JSON.stringify(unique));
    //     this.router.navigate([`result/${this.RouterId}`])

    //   }, (err: any) => {
    //     if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
    //       this.userService.userLogout();
    //     }
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error}` });
    //     this.isDataLoaded = false
    //     this.initData();
    // this.GetSelectionCriteria(this.RouterId);
    // this.FormatedData=[];
        
    //   });
   let item=Object.values(unique[0])
  // for (let i = 0; i <item.length; i++) {
    let high;
    let low;
    let indicator=0;
    // -------------------high---------------------
    if (item[7] !=null && Array.isArray(item[7]) && item[7][0].length > 0)
      high = item[7]
    else
      high = []
  // -------------------low---------------------
    if (item[5] !=null && Array.isArray(item[5]) && item[5][0].length > 0 )
      low = item[5]
    else
      low = []
  // -------------------indicator---------------------
      if(high.length==0 &&low.length > 0)
      {indicator=0;}
     else if(high.length > 0 &&low.length > 0)
      {indicator=2;}
     else if(high.length >0 &&low.length == 0)
      {indicator=10;}
    //  else if(high.length==0 &&low.length > 0)
    //   {indicator=0;}
    let obj = {
      fieldName: item[0],
      technicalName: item[1],
      type: item[2],
      HelpFullLeft:item[3],
      Indicator:1,
      Low: low
      ,
      High:high
    }
    if(this.reportService.selectionCriteria.indexOf(obj)===-1)
    this.reportService.selectionCriteria.push(obj)
  // }
    unique=[]
    } else {
      // this.isDataLoaded = false
      this.messageService.add({ severity: 'error', summary: 'Add Values', detail: 'Select Your Values Please' });
    }


    // post history hinout data
    unique.map((data: any) => {    
      if(data.Low[0])
      this.historyFormatedData.push(
        {
          "ReportName": this.RouterId,
          "TechnicalName": data.technicalName,
          "Value": data.Low[0]
        });
       if(data.High[0])
      this.historyFormatedData.push(
        {
          "ReportName": this.RouterId,
          "TechnicalName": data.technicalName,
          "Value": data.High[0]
        })
    })
    // ReportId: number, TechnicalName: string, Value: any
    this.reportService.PostSelectionHistory(this.historyFormatedData).subscribe((data: any) => {
      this.reportService.reportData=data;
        
    }
    , (err: any) => {
      // this.isDataLoaded = false
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
    });
    // go to result  this.router.navigate([`result/${this.RouterId}`])
  }
  displayMessage(ev: any) {    
    this.ChangeInput2('input',this.variantSide,this.variantEvent,this.variantItem,ev)
    // this.HelperDetail.technicalName=ev

  }
  ChangeInput2(type: string, Side: any, event: any, item: any,val:any) {
    
   if(val && val!='done'  )
   {
    if (Side == 'From') {
      // item.Indicator = 9
      item.Low =[val] 
      event.target.value= val
      this.FormatedData.push(item)
      // check input type from left side or from right side to update or add new 
      this.FormatedData.forEach((element: any, index: any) => {
        // element.HelpFullRight = false;
        if (element.HelpFullLeft === true && index) {
          // this.FormatedData.splice(index, 1);
        }
      });
      // end check input type from left side or from right side to update or add new 


    } 

    else {
      //this.historyFormatedData.push(val)
      item.High =[val] 
      event.target.value= val
      this.FormatedData.push(item)
      // end check input type from left side or from right side to update or add new 
      this.FormatedData.forEach((element: any, index: any) => {
        // element.HelpFullLeft = false;
        if (element.HelpFullRight === true && index) {
          // this.FormatedData.splice(index, 1);
        }
      });
      // end check input type from left side or from right side to update or add new 

    }
   // end  check input type from left side or from right side

    this.ValidateInput(item)
   

   }
   else if("done"){
    
   }
   else{
    this.isLoaded=true;
   } 
    // log data
  
  }
  removeItem(id:any)
  {
this.displayedTable.splice(id,1);  } 
  
}
