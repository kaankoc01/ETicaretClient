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
      url = `${this.url(requestParameter)}${id ?`${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}` :""}`;

  return this.httpCLient.get<T>(url,{ headers : requestParameter.header , responseType : requestParameter.responseType as 'json'});
  }
  post<T>(requestParameter : Partial<RequestParameters>, body:Partial<T>) : Observable<T>{
    let url : string = "";
    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` :""}`
   return this.httpCLient.post<T>(url,body,{headers : requestParameter.header , responseType : requestParameter.responseType as 'json'});
  }
  put<T>(requestParameter : Partial<RequestParameters>, body:Partial<T>) : Observable<T>{
    let url : string = "";
    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` :""}`;
    return this.httpCLient.put<T>(url,body,{headers : requestParameter.header , responseType : requestParameter.responseType as 'json'});
  }
  delete<T>(requestParameter : Partial<RequestParameters>, id: string): Observable<T>{
  let url :string = "";
  if(requestParameter.fullEndPoint)
    url = requestParameter.fullEndPoint
  else
    url = `${this.url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}` :""}`;

  return this.httpCLient.delete<T>(url,{headers : requestParameter.header , responseType : requestParameter.responseType as 'json'});
  }
}

export class RequestParameters{
  controller? : string;
  action? : string;
  queryString?: string;
  header?: HttpHeaders;
  baseUrl? : string;

  fullEndPoint?:string;
  responseType? : string = 'json';


}
