import { Component, Inject } from '@angular/core';
import { VERSION } from '@angular/material/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.css']
})
export class InformationDialog {
  title = ''
  message = 'Are you sure?'
  confirmButtonText = 'Yes'
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<InformationDialog>) {
      if (data) {
        this.title = data.title || this.title;
        this.message = data.message || this.message;
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        }
      }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
