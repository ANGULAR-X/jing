import { Directive,ElementRef,OnInit, Renderer } from '@angular/core';

@Directive({
  selector : '[j-dropdown]'
})

export class DropdownDirective implements OnInit {

  constructor(public el:ElementRef,public renderer: Renderer) {}

  public ngOnInit(): void {
    this.renderer.listen(this.el.nativeElement,'click',(event:any) => {
      // $(this.el.nativeElement).siblings().removeClass('active');
      // $(this.el.nativeElement).addClass('active');
      // $(this.el.nativeElement).toggleClass('active');
      $(this.el.nativeElement).parent().toggleClass('active');
      var $obj =$('#searchdown');
      // $('#toolsbox').removeClass('active');
      $obj.toggleClass('active');
      event.stopPropagation();
    });
  }
}
