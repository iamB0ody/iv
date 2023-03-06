import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-change-layout-dialog',
  templateUrl: './change-layout-dialog.component.html',
  styleUrls: ['./change-layout-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangeLayoutDialogComponent {
  @Input() shLayouts: any;
  @Input() RouterId: any;
  @Output() messageEvent = new EventEmitter< string>();
  constructor() { }
  ngOnInit(): void {}
  closeDialog()
  { 
    this.messageEvent.emit("ok");
   
  }
}
