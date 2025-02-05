import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpCLient: HttpClient, @Inject("baseUrl") private baseUrl:string) { }

  private url(requestParameter : Partial<RequestParameters>) : string {
    return `${ requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}`:""}`;
  }


  get<T>(requestParameter : Partial<RequestParameters>, id?:string): Observable<T>{
    let url : string ="";
    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${id ?`${id}` : ""}`;

  return this.httpCLient.get<T>(url,{ headers : requestParameter.header});
  }
  post<T>(requestParameter : Partial<RequestParameters>, body:Partial<T>) : Observable<T>{
    let url : string = "";
    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}`
   return this.httpCLient.post<T>(url,body,{headers : requestParameter.header});
  }
  put<T>(requestParameter : Partial<RequestParameters>, body:Partial<T>) : Observable<T>{
    let url : string = "";
    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}`;
    return this.httpCLient.put<T>(url,body,{headers : requestParameter.header});
  }
  delete<T>(requestParameter : Partial<RequestParameters>, id: string): Observable<T>{
  let url :string = "";
  if(requestParameter.fullEndPoint)
    url = requestParameter.fullEndPoint
  else
    url = `${this.url(requestParameter)}/${id}`;

  return this.httpCLient.delete<T>(url,{headers : requestParameter.header});
  }
}

export class RequestParameters{
  controller? : string;
  action? : string;

  header?: HttpHeaders;
  baseUrl? : string;

  fullEndPoint?:string;


}
