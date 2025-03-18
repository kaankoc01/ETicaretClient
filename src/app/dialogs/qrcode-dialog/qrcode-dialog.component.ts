import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrl: './qrcode-dialog.component.scss'
})
export class QrcodeDialogComponent  extends BaseDialog<QrcodeDialogComponent> implements OnInit{

  constructor(
        dialogRef : MatDialogRef<QrcodeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data :string,  private qrCodeService : QrCodeService, private domSanitizer : DomSanitizer){
        super(dialogRef)
      }

  qrCodeSafeUrl : SafeUrl;
  async ngOnInit() {
    const qrCodeBlob: Blob = await this.qrCodeService.generateQRCode(this.data);
    const url : string = URL.createObjectURL(qrCodeBlob);
    this.qrCodeSafeUrl =  this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
