import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { LoadingService } from './loading.service';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  subirArchivo(url:string, file: File){
    this.loading.displayLoading('Subiendo archivo...')
    const formData = new FormData()

    formData.append('file',file)

    return this.http.post(url,formData)
    .pipe(
      tap(()=>this.loading.hideLoading()),
      catchError((err)=>{
        this.loading.hideLoading()
        this.notify.failure(err.error.message || 'Hubo un error al eliminar la especie')
        if(!err.error.message){
          console.error(err)
        }
        return of(null)
      })
    )
  }

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private notify: NotifyService
  ) { }
}
