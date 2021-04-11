import {Injectable, TemplateRef} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: any[] = [];

  constructor() {
  }

  public add(modal: any): void {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  public remove(id: string): void {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x.id !== id);
  }

  public open(id: string): void {
    // open modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.open();
  }

  /**
   * Open component
   * @param ref TemplateRef
   */
  public openComponent(ref: any): void {
    console.log('ref: ', ref.nativeElement);
  }

  public close(id: string): void {
    // close modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.close();
  }
}
