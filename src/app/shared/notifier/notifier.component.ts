import { Component, Input, OnInit } from '@angular/core';
import { ModalOverlayRef } from 'src/app/service/modal-overlay-ref';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {
  @Input() text = '';
  @Input() type = '';
  constructor(public modalOverlayRef: ModalOverlayRef) { }

  ngOnInit() {
  }

}
