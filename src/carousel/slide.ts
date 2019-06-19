
import { Carousel } from './carousel';
import { customElement, inlineView, bindable, Parent, inject, Optional } from 'aurelia-framework';
import { constants } from '../common/constants';

@customElement(`${constants.elementPrefix}carousel-item`)
@inject(Optional.of(Carousel))
@inlineView(`
<template class.bind="slideClass">
<slot></slot>
</template>
`)
export class Slide {
    @bindable public active: boolean;
    @bindable public animated = false;
    @bindable public directionNext = false;
    @bindable public directionLeft = false;
    @bindable public directionPrev = false;
    @bindable public directionRight = false;


    public get slideClass() {
        let result = 'carousel-item ';
        result += this.animated ? 'animated ' : '';
        result += this.active ? 'active ' : '';
        result += this.directionNext ? 'carousel-item-next ' : '';
        result += this.directionLeft ? 'carousel-item-left ' : '';
        result += this.directionPrev ? 'carousel-item-prev ' : '';
        result += this.directionRight ? 'carousel-item-right ' : '';
        return result;
    }



    public constructor(public carousel: Carousel) {
    }

    /** Fires changes in container collection after adding a new slide instance */
    public attached(): void {
        this.carousel.addSlide(this);
    }

    /** Fires changes in container collection after removing of this slide instance */
    public detached(): void {
        this.carousel.removeSlide(this);
    }
}
