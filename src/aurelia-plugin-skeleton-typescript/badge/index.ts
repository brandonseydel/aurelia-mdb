import { constants } from './../common/constants';
import { inlineView, bindable, autoinject, computedFrom, containerless, customElement } from 'aurelia-framework';

@autoinject
@customElement(`${constants.elementPrefix}badge`)
@inlineView(`
<template>
<span class.bind="badgeClass">
  <slot></slot>
</span>
</template>
`)
export class Badge {
    @bindable public default = false;
    @bindable public primary = false;
    @bindable public success = false;
    @bindable public info = false;
    @bindable public warning = false;
    @bindable public danger = false;
    @bindable public pill = false;

    @bindable public color: string;
    @bindable public class: string;
    constructor(private el: Element) {
    }

    @computedFrom('default', 'primary', 'success', 'info', 'warning', 'danger', 'pill', 'color')
    get badgeClass(): string {
        let result = 'badge ';
        result += this.default ? 'badge-default ' : '';
        result += this.primary ? 'badge-primary ' : '';
        result += this.success ? 'badge-success ' : '';
        result += this.info ? 'badge-info ' : '';
        result += this.warning ? 'badge-warning ' : '';
        result += this.danger ? 'badge-danger ' : '';
        result += this.pill ? 'badge-pill ' : '';

        if (this.color) {
            result += this.color;
        }

        return result;
    }

}
