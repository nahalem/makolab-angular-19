import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  dialogRef!: MatDialogRef<any>;
  outputData: any;

  height: string = '';
  width: string = '';

  constructor(
    public dialog: MatDialog
    ) {
  }

  public openOverlay<T extends ComponentType<any>>(type: T, inputData?: any): void {
    this.dialogRef = this.dialog.open(type, this.createConfig(inputData));
  }

  public closeRefOverlay(): void {
    this.dialogRef.close();
  }

  public closeOverlay(): void {
    this.dialogRef.close();
    this.dialog.closeAll();
    this.dialog.ngOnDestroy();
  }

  public sendCloseOverlayEvent(document: Document, data?: any, eventId? : string) {
    let event: CustomEvent;
    event = document.createEvent('CustomEvent');

    if(eventId){
      event.initCustomEvent(eventId, true, true, {data});
    }
    else {
      event.initCustomEvent('isp:modal:close', true, true, {data});
    }

    document.dispatchEvent(event);
  }

  private createConfig(inputData?: any): MatDialogConfig {
    return {
      // maxWidth: this.width,
      // maxHeight: this.height,
      // disableClose: true,
      // height: this.height,
      // width: this.width,
      // panelClass: 'fullscreen-dialog',
      // data: inputData,
      // hasBackdrop: true
      maxWidth: 'none',
      maxHeight: 'none',
      disableClose: true,
      height: this.height,
      width: this.width,
      // panelClass: 'fullscreen-dialog',
      data: inputData,
      hasBackdrop: true,
      closeOnNavigation: true
    };
  }
}
