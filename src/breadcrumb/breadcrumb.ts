import { constants } from './../common/constants';
import { bindable, customElement, inlineView, containerless, processContent } from 'aurelia-framework';

@containerless()
@inlineView(`
<template>
<ol class="breadcrumb list-inline list-unstyled \${customClass} text-\${textTransform}">
  <slot></slot>
</ol>
</template>
`)
@customElement(`${constants.elementPrefix}breadcrumb`)
export class Breadcrumb {
  @bindable public customClass: string;
  @bindable public textTransform: string;

  public bind() {
    console.log(this.customClass);
  }
}
