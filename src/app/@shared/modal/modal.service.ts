import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, TemplateRef} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private componentRef: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
  ) {
  }

  /**
   * Open component
   * @param ref TemplateRef
   */
  public open(ref: any): any {

    console.log('ref: ', ref.nativeElement);

    const componentRef = this.componentFactoryResolver.resolveComponentFactory(ref).create(this.injector);
    this.componentRef = componentRef;

    this.applicationRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // domElem.style.display = 'block';
    const a = domElem.getElementsByTagName('app-modal');
    if (a.length) {
      (a[0] as HTMLElement).style.display = 'block';
    }
    document.body.classList.add('jw-modal-open');
    return componentRef;
  }

  public close(): void {
    this.applicationRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }
}
