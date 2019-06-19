import { constants } from './../common/constants';
import { inlineView, bindable, computedFrom, customElement } from 'aurelia-framework';

@inlineView(`
<template>
<div class.bind="cardClass">
    <slot></slot>
</div>
</template>
`)
@customElement(`${constants.elementPrefix}card`)
export class Card {
    @bindable public class: string;
    @bindable public cascade: boolean;
    @bindable public wider: boolean;
    @bindable public narrower = false;
    @bindable public reverse = false;
    @bindable public dark = false;

    @computedFrom('class', 'cascade', 'wider', 'narrower', 'reverse', 'dark')
    get cardClass(): string {
        let result = 'card ';
        result += this.cascade ? 'card-cascade ' : '';
        result += this.wider ? 'wider ' : '';
        result += this.narrower ? 'narrower ' : '';
        result += this.reverse ? 'reverse ' : '';
        result += this.dark ? 'card-dark ' : '';

        result += this.class;

        return result;
    }
}
