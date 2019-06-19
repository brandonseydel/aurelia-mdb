import { constants } from './../common/constants';
import { inlineView, bindable, computedFrom, customElement } from 'aurelia-framework';

@inlineView(`
<template>
<div class.bind="cardClass">
    <slot></slot>
    </div>
</template>
`)
@customElement(`${constants.elementPrefix}card-footer`)
export class CardFooter {
    @bindable public class: string;
    @computedFrom('class')
    get cardClass(): string {
        let result = 'card-footer ';
        result += this.class;

        return result;
    }
}
