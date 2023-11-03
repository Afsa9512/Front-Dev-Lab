import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImagenModel } from 'src/app/models/imagen-producto.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'cargar-imagen',
  templateUrl: './cargar-imagen.component.html',
  styleUrls: ['./cargar-imagen.component.scss']
})
export class CargarImagenComponent implements OnInit{
  
  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter<ImagenModel>();

  constructor(private http: HttpClient,private common: CommonService) { }

  ngOnInit(): void {
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post<ImagenModel>(`${this.common.getUrl()}Productos/cargar-imagen`, formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            if (event.body) {
              console.log(event.body);
              this.onUploadFinished.emit(event.body);
            }
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
  }
}
