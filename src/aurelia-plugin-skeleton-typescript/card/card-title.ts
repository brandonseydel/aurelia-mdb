import { constants } from './../common/constants';
import { inlineView, bindable, computedFrom, customElement } from 'aurelia-framework';

@inlineView(`
<template  class="card-title">
    <slot></slot>
</template>
`)
@customElement(`${constants.elementPrefix}card-title`)
export class CardTitle {
    @bindable public class: string;
    @bindable public cascade: boolean;
    @bindable public wider: boolean;
    @bindable public narrower = false;
    @bindable public reverse = false;
    @bindable public dark = false;
}
