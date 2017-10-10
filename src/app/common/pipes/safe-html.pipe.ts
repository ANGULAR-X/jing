/**
 * Created by Mikasa on 2017/3/31.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name : 'safeHtml'
})

export class SafeHtml implements PipeTransform {

  constructor(public sanitizer : DomSanitizer) {
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
