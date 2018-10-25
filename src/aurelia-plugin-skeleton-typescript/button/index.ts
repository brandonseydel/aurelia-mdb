import { autoinject, customElement, bindable, containerless, inlineView, customAttribute } from 'aurelia-framework';
import { constants } from '../common/constants';

@autoinject()
@customAttribute(`${constants.attributePrefix}btn`)
export class Button {

  @bindable private color = '';
  @bindable private rounded = false;
  @bindable private gradient = '';
  @bindable private outline = false;
  @bindable private flat = false;
  @bindable private size = '';
  @bindable private block = false;
  @bindable private floating = false;


  constructor(private element: Element) {

  }

  public bind(bindingContext: Object, overrideContext: Object) {
    const colorClass = 'btn-' + this.color;
    const gradientClass = this.gradient + '-gradient';
    const outlineClass = 'btn-outline-' + this.color;
    const flatClass = 'btn-flat';
    const roundedClass = 'btn-rounded';
    const sizeClass = 'btn-' + this.size;
    const blockClass = 'btn-block';
    const floatingClass = 'btn-floating';

    this.element.classList.add('btn');

    if (this.color !== '') {
      this.element.classList.add(colorClass);
    }

    if (this.rounded) {
      this.element.classList.add(roundedClass);
    }

    if (this.gradient) {
      if (this.color !== '') {
        this.element.classList.remove(colorClass);
      }
      this.element.classList.add(gradientClass);
    }

    if (this.outline) {
      this.element.classList.remove(colorClass);
      this.element.classList.add(outlineClass);
    }

    if (this.flat) {
      if (this.color) {
        this.element.classList.remove(colorClass);
      }
      if (this.gradient) {
        this.element.classList.remove(gradientClass);
      }
      if (this.outline) {
        this.element.classList.remove(outlineClass);
      }
      if (this.rounded) {
        this.element.classList.remove(roundedClass);
      }
      this.element.classList.add(flatClass);
    }

    if (this.size) {
      this.element.classList.add(sizeClass);
    }

    if (this.block) {
      this.element.classList.add(blockClass);
    }

    if (this.floating) {
      this.element.classList.remove('btn');
      this.element.classList.add(floatingClass);
    }
  }
}
