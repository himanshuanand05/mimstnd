import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoaderOverlayService } from 'src/app/common/loader-overlay/loader-overlay.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-upload-content-creation',
  templateUrl: './upload-content-creation.component.html',
  styleUrls: ['./upload-content-creation.component.scss']
})
export class UploadContentCreationComponent implements OnInit {

  @ViewChild('csvFileEle')
  csvFileEle!: ElementRef;
  contentCsvData: string = '';

  constructor(
    private trainingService: TrainingService,
    private loaderOverlayService: LoaderOverlayService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  fileChanges(event: Event){
    this.contentCsvData = '';
    const element = event.currentTarget as HTMLInputElement;
    let files: FileList | null = element.files;
    console.log(files);
    if(files && files.length > 0) {
       let file : File | null = files.item(0); 
       if (file) {
         console.log(file.type);
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            this.contentCsvData = reader.result as string;
            console.log(this.contentCsvData);
         }
        }
      }
  }

  uploadContentData() {
    this.loaderOverlayService.openLoader();
    this.trainingService.uploadBulkFile(this.contentCsvData)
      .subscribe((res: any) => {
        this.loaderOverlayService.removeLoader();
        console.log('uploadBulkFile res', res);
        this.csvFileEle.nativeElement.value = "";
        this.contentCsvData = '';
        let fileName = 'log.txt';
        let msg: any = res.Message;
        this.messageService.add({ severity: 'success', summary: msg });


        this.downloadFile(fileName);
      });
  }

  downloadFile(fileName: string) {

    this.trainingService.downloadLogFile(fileName)
      .subscribe( (response:any)=> {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (fileName){
          downloadLink.setAttribute('download', fileName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
        }
            
      })
    
  }

  downloadTemplate() {
    let header: any = ['Training Type', 'Domain', 'Skill', 'Module', 'Topic', 'Sub Topic', 'Duration'];
    const csvArray = header.join(',');
  
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = 'content-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
