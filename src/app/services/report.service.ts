import { Injectable } from '@angular/core';
import { Report, IReportOptions } from 'notiflix/build/notiflix-report-aio';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  info(title:string,message:string,htmlSafe = false,cb = ()=>{}){
    Report.info(title,message,'Ok',cb,{
      svgSize:'40px',
      plainText:htmlSafe
    })
  }

  constructor() { }
}
