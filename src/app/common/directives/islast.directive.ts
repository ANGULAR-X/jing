import {Directive, Input, Output, EventEmitter, OnInit} from "@angular/core";

@Directive({
  selector : '[isLast]'
})

export class IsLastDirective implements OnInit{

  @Input() isLast : boolean;
  @Output() lastDone : EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.isLast) {
      this.lastDone.emit(true);
    }
  }
}
