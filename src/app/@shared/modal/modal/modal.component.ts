import {Component, ComponentFactoryResolver, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalService} from '../modal.service';
import {ModalBodyDirective} from '../modal-body/modal-body.directive';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string | null = null;
  private readonly element: any;

  // @ts-ignore
  // @ViewChild('vf', {static: false}) vf: ViewContainerRef;
  @ViewChild(ModalBodyDirective, {static: true}) modalBodyDirective: ModalBodyDirective;

  constructor(
    private modalService: ModalService,
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    if (this.id) {
      this.modalService.remove(this.id);
      this.element.remove();
    }
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }

  addComponent(component: any): void {
    const resolver = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.modalBodyDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(resolver);
    // componentRef.instance.data = data;
    // this.vf.createComponent(resolver);
  }
}
