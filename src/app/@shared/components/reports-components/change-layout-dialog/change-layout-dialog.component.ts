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
  layouts: Array<string>=['layout 1','layout 2','layout 3','layout 4','layout 5'];
  radioTitle!: string;
  model   = {option: 'option3'};
  constructor() { }
  ngOnInit(): void {}
  closeDialog()
  { 
    this.messageEvent.emit(this.model.option);
    this.shLayouts = false
  }
}
