import { constants } from './../common/constants';
import { inlineView, bindable, computedFrom, customElement } from 'aurelia-framework';

@inlineView(`
<template class.bind="cardClass">
    <slot></slot>
</template>
`)
@customElement(`${constants.elementPrefix}card-body`)
export class CardBody {
    @bindable public class: string;
    @bindable public cascade: boolean;

    @computedFrom('class', 'cascade')
    get cardClass(): string {
        let result = 'card-body ';
        result += this.cascade ? 'card-body-cascade ' : '';

        result += this.class;

        return result;
    }
}
