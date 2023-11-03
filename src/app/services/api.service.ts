import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private common: CommonService) { }

  get( controller: string ) {
    return this.http.get(`${ this.common.getUrl() }${ controller }`);
  }
  getId( controller: string, id: any ) {
    return this.http.get(`${ this.common.getUrl() }${ controller }${id}`);
  }
  post( controller: string, data: any) {
    return this.http.post(`${ this.common.getUrl() }${ controller }`, data);
  }
  put( controller: string, data: any) {
    return this.http.put(`${ this.common.getUrl() }${ controller }`, data);
  }
}
