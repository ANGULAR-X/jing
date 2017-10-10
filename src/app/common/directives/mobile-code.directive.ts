import { Directive,ElementRef,OnInit, Renderer } from '@angular/core';

@Directive({
  selector : '[mobile-code]'
})

export class MobileCodeDirective implements OnInit {

  constructor(public el:ElementRef,public renderer: Renderer) {}

  public ngOnInit(): void {
    this.renderer.listen(this.el.nativeElement,'click',(event:any) => {
      $(this.el.nativeElement).siblings().removeClass('active');
      $(this.el.nativeElement).addClass('active');
    });
  }
}
