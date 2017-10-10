/**
 * Created by front on 2017/9/26.
 */
import {Directive, ElementRef, OnInit, Renderer, Input} from '@angular/core';

@Directive({
  selector: '[watermark]'
})

export class WaterMarkDirective implements OnInit {
  @Input() watermark: any;
  public defaultOption: any;

  constructor(public el: ElementRef, public renderer: Renderer) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser = currentUser || null;
    if (!currentUser) return;
    this.defaultOption = {
      watermark_txt:currentUser.account,
      watermark_company:currentUser.companyName,
      watermark_x: 50,//水印起始位置x轴坐标
      watermark_y: 0,//水印起始位置Y轴坐标
      watermark_rows: 10,//水印行数
      watermark_cols: 10,//水印列数
      watermark_x_space: 50,//水印x轴间隔
      watermark_y_space: 50,//水印y轴间隔
      watermark_color: '#CCC',//水印字体颜色
      watermark_alpha: 0.1,//水印透明度
      watermark_fontsize: '20px',//水印字体大小
      watermark_font: 'Microsoft YaHei',//水印字体
      watermark_width: 300,//水印宽度
      watermark_height: 120,//水印长度
      watermark_angle: 25//水印倾斜度数
    }

  }

  public ngOnInit(): void {
    this.watermark = Object.assign(this.defaultOption, this.watermark);
    //获取页面最大宽度
    let page_width: number;
    page_width = $('body').width();
    //获取页面最大长度
    let page_height = $('body').height();
    //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
    if (this.defaultOption.watermark_cols == 0 ||
      (parseInt(this.defaultOption.watermark_x
        + this.defaultOption.watermark_width * this.defaultOption.watermark_cols
        + this.defaultOption.watermark_x_space * (this.defaultOption.watermark_cols - 1))
      > page_width)) {
      this.defaultOption.watermark_cols = (page_width - this.defaultOption.watermark_x + this.defaultOption.watermark_x_space)
        / (this.defaultOption.watermark_width + this.defaultOption.watermark_x_space);
      this.defaultOption.watermark_x_space = (page_width - this.defaultOption.watermark_x - this.defaultOption.watermark_width * this.defaultOption.watermark_cols)
        / (this.defaultOption.watermark_cols - 1)
    }
    //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
    if (this.defaultOption.watermark_rows == 0 ||
      (parseInt(this.defaultOption.watermark_y
        + this.defaultOption.watermark_height * this.defaultOption.watermark_rows
        + this.defaultOption.watermark_y_space * (this.defaultOption.watermark_rows - 1))
      > page_height)) {
      this.defaultOption.watermark_rows = (this.defaultOption.watermark_y_space
        + page_height - this.defaultOption.watermark_y)
        / (this.defaultOption.watermark_height + this.defaultOption.watermark_y_space);
      this.defaultOption.watermark_y_space = (page_height
        - this.defaultOption.watermark_y
        - this.defaultOption.watermark_height
        * this.defaultOption.watermark_rows)
        / (this.defaultOption.watermark_rows - 1)
    }

    var x;
    var y;
    var $trg= $(this.defaultOption.targBox);
    var oTemp=document.createElement('div');
    oTemp.className='watermark';
    for (var i = 0; i < this.defaultOption.watermark_rows; i++) {
      y = this.defaultOption.watermark_y + (this.defaultOption.watermark_y_space + this.defaultOption.watermark_height) * i;
      for (var j = 0; j < this.defaultOption.watermark_cols; j++) {
        x = this.defaultOption.watermark_x + (this.defaultOption.watermark_width + this.defaultOption.watermark_x_space) * j;

        var mask_div = document.createElement('div');
        var mask_br = document.createElement('br');
        mask_div.id = 'mask_div' + i + j;
        mask_div.appendChild(document.createTextNode(this.defaultOption.watermark_txt));
        mask_div.appendChild(mask_br);
        mask_div.appendChild(document.createTextNode(this.defaultOption.watermark_company));
        //设置水印div倾斜显示
        mask_div.style.webkitTransform = "rotate(-" + this.defaultOption.watermark_angle + "deg)";
        // mask_div.style.MozTransform = "rotate(-" + this.defaultOption.watermark_angle + "deg)";
        // mask_div.style.msTransform = "rotate(-" + this.defaultOption.watermark_angle + "deg)";
        // mask_div.style.OTransform = "rotate(-" + this.defaultOption.watermark_angle + "deg)";
        mask_div.style.transform = "rotate(-" + this.defaultOption.watermark_angle + "deg)";
        mask_div.style.visibility = "";
        mask_div.style.position = "absolute";
        mask_div.style.left = x + 'px';
        mask_div.style.top = y + 'px';
        mask_div.style.overflow = "hidden";
        mask_div.style.zIndex = "99";
        //mask_div.style.border="solid #eee 1px";
        mask_div.style.opacity = this.defaultOption.watermark_alpha;
        mask_div.style.fontSize = this.defaultOption.watermark_fontsize;
        mask_div.style.fontFamily = this.defaultOption.watermark_font;
        mask_div.style.color = this.defaultOption.watermark_color;
        mask_div.style.textAlign = "center";
        mask_div.style.width = this.defaultOption.watermark_width + 'px';
        mask_div.style.minHeight = this.defaultOption.watermark_height + 'px';
        mask_div.style.display = "block";
        mask_div.style.whiteSpace = 'normal';
        mask_div.style.wordBreak = 'break-all';
        $(oTemp).append(mask_div);
      };
    };
    $(this.el.nativeElement).append(oTemp);
  }
}
