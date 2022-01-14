import {
    Injectable,
    ComponentFactoryResolver,
    ApplicationRef,
    Injector,
    EmbeddedViewRef,
    ComponentRef,
  } from '@angular/core'
import { LoaderOverlayComponent } from './loader-overlay.component';
  
  @Injectable({
    providedIn: 'root',
  })

  export class LoaderOverlayService {
    private loaderOverlayComponentRef: ComponentRef<LoaderOverlayComponent> | any;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ){}

    openLoader(): any{
      if(this.loaderOverlayComponentRef && this.loaderOverlayComponentRef.hostView['_appRef']){
        return true;
      }
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoaderOverlayComponent);
      const componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(componentRef.hostView);

      const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
      this.loaderOverlayComponentRef = componentRef;
    }

    removeLoader() {
        if (this.loaderOverlayComponentRef) {
          this.appRef.detachView(this.loaderOverlayComponentRef.hostView);
          this.loaderOverlayComponentRef.destroy();
        }
      }
  }