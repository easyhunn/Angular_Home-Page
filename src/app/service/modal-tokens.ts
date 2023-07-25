import { InjectionToken } from '@angular/core';
import { Component } from '@angular/core';
import { ModalConfig } from './type/interfaces';

// import { Image } from './file-preview-overlay.service';

export const MODAL_CONFIG = new InjectionToken<ModalConfig>('MODAL_CONFIG');
export const MODAL_COMPNENT = new InjectionToken<Component>('MODAL_COMPNENT');
