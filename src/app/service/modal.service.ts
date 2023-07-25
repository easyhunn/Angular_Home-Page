import { Injectable, Injector, ComponentRef, Type, Component } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ModalOverlayRef } from './modal-overlay-ref';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { MODAL_CONFIG, MODAL_COMPNENT } from './modal-tokens';
import { ModalConfig } from './type/interfaces';
// import { ConfigService } from './config.service';

const DEFAULT_CONFIG: ModalConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel',
  disposeOnNavigation: true,
  closeOnBackdropClick: false,
};

@Injectable()
export class ModalService {
  constructor(
    private injector: Injector,
    private overlay: Overlay,
    // private configSer: ConfigService
    ) { }

  open<T>(component: Type<T>, config: ModalConfig, afterCreateFunc?: (component: T) => void) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const modalOverlayRef = new ModalOverlayRef(overlayRef);

    const overlayComponent = this.attachDialogContainer<T>(component, afterCreateFunc, overlayRef, dialogConfig, modalOverlayRef);
    if (config.closeOnBackdropClick) {
      overlayRef.backdropClick().subscribe(_ => {
        modalOverlayRef.close();
        // setTimeout(() => config.onBackdropClick(), 0);
      });
    }

    return overlayComponent;
  }

  private createOverlay(config: ModalConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer<T>( component: Type<T>, afterCreateFunc: (componentInstance: T) => void = () => {},
                                    overlayRef: OverlayRef, config: ModalConfig, modalOverlayRef: ModalOverlayRef) {
    const injector = this.createInjector<T>(component, config, modalOverlayRef);

    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<T> = overlayRef.attach(containerPortal);
    afterCreateFunc(containerRef.instance);
    return containerRef.instance;
  }

  private createInjector<T>(component: Type<T>, config: ModalConfig, modalRef: ModalOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(ModalOverlayRef, modalRef);
    injectionTokens.set(MODAL_CONFIG, config);
    injectionTokens.set(MODAL_COMPNENT, component);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(config: ModalConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
      width: config.width,
      height: config.height,
      minWidth: config.minWidth,
      minHeight: config.minHeight,
      maxWidth: config.maxWidth,
      maxHeight: config.maxHeight,
      disposeOnNavigation: config.disposeOnNavigation
    });

    return overlayConfig;
  }
}


@Component({
  template: ''
})
export class ModalBaseComponent {
  constructor(
    protected overlayRef: ModalOverlayRef
  ) {}

  close() {
    this.overlayRef.close();
  }
}