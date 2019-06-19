import { constants } from './../common/constants';
import { inlineView, bindable, autoinject, customElement, computedFrom } from 'aurelia-framework';

@autoinject
@customElement(`${constants.elementPrefix}icon`)
@inlineView(`
<template>
  <i class.bind="class"></i>
</template>
`)
export class Icon {

  @bindable
  private stack?: string;
  @bindable
  private color?: string;
  @bindable
  private icon!: string;
  @bindable
  private size?: string;
  private fixed = false;
  @bindable
  private pull?: string;
  private border = false;
  private spin = false;
  private pulse = false;
  @bindable
  private rotate?: string;
  @bindable
  private flip?: string;
  @bindable
  private inverse?: string;
  private classList: string;

  constructor(element: Element) {
    this.border = element.hasAttribute('border');
    this.spin = element.hasAttribute('spin');
    this.pulse = element.hasAttribute('pulse');
    this.fixed = element.hasAttribute('fixed');
    this.classList = element.getAttribute('class');
  }

  @computedFrom(
    'icon',
    'size',
    'fixed',
    'pull',
    'border',
    'spin',
    'pulse',
    'rotate',
    'flip',
    'inverse',
    'stack',
    'color'
  )
  get class() {
    return 'fa' +
      (this.icon ? ' fa-' + this.icon : '') +
      (this.size ? ' fa-' + this.size : '') +
      (this.fixed ? ' fa-fw' : '') +
      (this.pull ? ' fa-pull-' + this.pull : '') +
      (this.border ? ' fa-border' : '') +
      (this.spin ? ' fa-spin' : '') +
      (this.pulse ? ' fa-pulse' : '') +
      (this.rotate ? ' fa-rotate-' + this.rotate : '') +
      (this.flip ? ' fa-flip-' + this.flip : '') +
      (this.inverse ? ' fa-inverse' : '') +
      (this.stack ? ' fa-' + this.stack : '') +
      (this.color ? ' text-' + this.color : '') + ' ' +
      this.classList;
  }


}
