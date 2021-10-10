import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(public messageService: MessageService) {
  }

  public addSingle(type: string, title: string, message: string) {
    this.messageService.add({severity: type, summary: title, detail: message});
  }
}
