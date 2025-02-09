import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';

@Component({
  selector: 'app-file-upload',
 // standalone: true,
  //imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  constructor(private httpclientService : HttpClientService , private alertifyService : AlertifyService, private customToasterService  : CustomToastrService){}

  public files: NgxFileDropEntry[] = [];

  @Input() options : Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData  : FormData = new FormData();
    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file : File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

        this.httpclientService.post({
          controller : this.options.controller,
          action : this.options.action,
          queryString : this.options.queryString,
          header : new HttpHeaders({"responseType": "blob"})
        },fileData).subscribe(data => {
          const message : string = "Dosyalar başariyla yüklenmiştir."
          if(this.options.isAdminPage){
            this.alertifyService.message(message,{
              dismissOthers : true,
              messageType : MessageType.Success,
              position : Position.TopRight
            })
          }
          else {
            this.customToasterService.message(message,"Başarili",{
              messageType : ToastrMessageType.Success,
              position : ToastrPosition.TopLeft
            })
          }
        },(errorResponse : HttpErrorResponse) => {
          const message : string = "Dosyalar Yüklenirken beklenmeyen bir hata oluştu."
          if(this.options.isAdminPage){
            this.alertifyService.message(message,{
              dismissOthers : true,
              messageType : MessageType.Error,
              position : Position.TopRight
            })
          }
          else {
            this.customToasterService.message(message,"Başarisiz",{
              messageType : ToastrMessageType.Error,
              position : ToastrPosition.TopLeft
            })
          }
        });

  }

}

export class FileUploadOptions{
  controller? : string;
  action?: string;
  queryString? : string;
  explanation? : string;
  accept? : string;
  isAdminPage? : boolean = false;
}

