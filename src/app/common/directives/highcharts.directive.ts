
import {Directive, ElementRef, Input, OnInit, Renderer} from '@angular/core';
import * as highcharts from 'highcharts';

@Directive({
  selector : '[highcharts]'
})

export class HighchartsDirective  implements OnInit{
  @Input() highcharts : any;
  constructor(public el:ElementRef,public renderer: Renderer) {}
  public ngOnInit(): void {
    $(this.el.nativeElement).highcharts(this.highcharts);
  }
}
