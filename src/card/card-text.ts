import { constants } from './../common/constants';
import { inlineView, bindable, computedFrom, customElement } from 'aurelia-framework';

@inlineView(`
<template>
<p class="card-text \${class} ">
    <slot></slot>
</p>
</template>
`)
@customElement(`${constants.elementPrefix}card-text`)
export class CardText {
    @bindable public class: string;
}
