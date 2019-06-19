import { constants } from './../common/constants';
import { inlineView, bindable, customElement, containerless } from 'aurelia-framework';

@inlineView(`
<template>
<img class="img-fluid" src.bind="src" alt.bind="alt">
</template>
`)
@containerless()
@customElement(`${constants.elementPrefix}card-img`)
export class CardImage {
    @bindable public src: string;
    @bindable public alt: string;
}
