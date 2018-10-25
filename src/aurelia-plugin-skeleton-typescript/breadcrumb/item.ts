import { constants } from './../common/constants';
import { bindable, customElement, inlineView, autoinject, containerless, processContent, computedFrom } from 'aurelia-framework';

@inlineView(`
<template>
<li class="list-inline-item breadcrumb-item font-weight-\${fontWeight} \${classes}">
  <slot></slot>
</li>
</template>
`)
@containerless()
@customElement(`${constants.elementPrefix}breadcrumb-item`)
@autoinject()
export class BreadcrumbItem {
    @bindable public fontWeight: string;
    @bindable public class: string;

    constructor(private el: Element) { }

    public attached() {
        // this.el.classList.add('breadcrumb-item');
    }
    @computedFrom('class')
    private get classes() {
        return this.class;
    }
}
