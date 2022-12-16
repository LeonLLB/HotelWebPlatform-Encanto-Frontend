import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'hwp-subir-foto',
  templateUrl: './subir-foto.component.html',
  styles: [
  ]
})
export class SubirFotoComponent implements OnInit {

  habitacionId!: string
  file!: File
  imgTemp: any = null

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private notifyService: NotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data=>this.habitacionId=data['id'])
  }

  onFileChange(file: any){
    this.file = file.files[0]

    if(!this.file){
      this.imgTemp = null
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(this.file)

    reader.onload = () => this.imgTemp = reader.result
  }

  onFileSubmit(){    
    this.fileService.subirArchivo(`/files/habitacion/subir-foto/${this.habitacionId}`,this.file)
    .subscribe({
      next:(data)=>{
        if(data){
          this.notifyService.success('Foto de la habitación subida con exito')
          this.router.navigate(['main','habitaciones',this.habitacionId])
        }
      },
      error:(err)=>{
        this.notifyService.failure(err.error.message) 
      },
    })
  }

}
