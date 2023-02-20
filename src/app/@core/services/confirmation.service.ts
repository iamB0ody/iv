// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ConfirmationService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'src/app/@shared/components/layout-components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'md' | 'lg' = 'md'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }
}

