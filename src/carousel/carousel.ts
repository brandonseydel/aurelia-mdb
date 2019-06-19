import { autoinject } from 'aurelia-framework';
import { constants } from './../common/constants';

import { LinkedList } from '../utils/linked-list.class';
import { Slide } from './slide';
import { CarouselConfig } from './config';
import { customElement, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

export enum Direction { UNKNOWN, NEXT, PREV }

@autoinject()
@customElement(`${constants.elementPrefix}carousel`)
export class Carousel {



    private SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

    protected _slides: LinkedList<Slide> = new LinkedList<Slide>();
    private focusMethod: any;
    private keyboardMethod: any;
    public get slides(): Slide[] {
        return this._slides.toArray();
    }

    protected currentInterval: any;
    protected isPlaying: boolean;
    protected destroyed = false;
    protected animationEnd = true;
    private isBrowser: any = false;
    /** If `true` — carousel will not cycle continuously and will have hard stops (prevent looping) */
    @bindable public noWrap: boolean;
    /**  If `true` — will disable pausing on carousel mouse hover */
    @bindable public noPause: boolean;
    @bindable public interval: number;

    @bindable public isControls = true;
    @bindable public keyboard: boolean;

    @bindable public class: String = '';
    @bindable public type: String = '';
    @bindable public animation: String = '';
    @bindable public activeSlideIndex: number;
    protected _interval: number;

    // protected _currentActiveSlide: number;
    protected _currentActiveSlide: number | any;

    /** Will be emitted when active slide has been changed. Part of two-way-bindable [(activeSlide)] property */
    // @Output() public activeSlideChange: EventEmitter<any> = new EventEmitter<any>(false);

    @bindable
    public activeSlide: number;





    public constructor(private config: CarouselConfig, private el: Element, private eventAggregator: EventAggregator) {
        this.isBrowser = true; // isPlatformBrowser(platformId);
        Object.assign(this, config);
    }

    public activeSlideChanged(index: number) {
        if (this._slides.length && index !== this._currentActiveSlide) {
            this._select(index);
        }
    }

    public checkNavigation() {
        if (this.type === 'carousel-multi-item') {
            return false;
        }
        return true;

    }

    public checkDots() {
        if (this.type === 'carousel-thumbnails') {
            return false;
        }
        return true;
    }


    /**
     * Delay of item cycling in milliseconds. If false, carousel won't cycle automatically.
     */

    public intervalChanged() {
        this.restartTimer();
    }



    public detached() {
        this.destroyed = true;
        this.el.removeEventListener('click', this.focusMethod);
        this.el.removeEventListener('keyup', this.keyboardMethod);
    }

    /**
     * Adds new slide. If this slide is first in collection - set it as active and starts auto changing
     * @param slide
     */
    public addSlide(slide: Slide): void {
        this._slides.add(slide);
        if (this._slides.length === 1) {
            this._currentActiveSlide = void 0;
            this.activeSlide = 0;
            this.play();
        }
    }

    public attached() {
        // Setting first visible slide
        if (this.activeSlideIndex) {
            setTimeout(() => {
                this._select(this.activeSlideIndex);
                this.eventAggregator.publish({ 'relatedTarget': this.activeSlide });
            }, 0);
        }
        this.focusMethod = this.focus.bind(this);
        this.keyboardMethod = this.keyboardControl.bind(this);
        this.el.addEventListener('click', this.focusMethod);
        this.el.addEventListener('keyup', this.keyboardMethod);

    }

    /**
     * Removes specified slide. If this slide is active - will roll to another slide
     * @param slide
     */
    public removeSlide(slide: Slide): void {
        const remIndex = this._slides.indexOf(slide);

        if (this._currentActiveSlide === remIndex) {

            // removing of active slide
            //  let nextSlideIndex: number = void 0;
            let nextSlideIndex: number | any = void 0;
            if (this._slides.length > 1) {
                // if this slide last - will roll to first slide, if noWrap flag is FALSE or to previous, if noWrap is TRUE
                // in case, if this slide in middle of collection, index of next slide is same to removed
                nextSlideIndex = !this.isLast(remIndex) ? remIndex :
                    this.noWrap ? remIndex - 1 : 0;
            }
            this._slides.remove(remIndex);

            // prevents exception with changing some value after checking
            setTimeout(() => {
                this._select(nextSlideIndex);
            }, 0);
        } else {
            this._slides.remove(remIndex);
            const currentSlideIndex = this.getCurrentSlideIndex();
            setTimeout(() => {
                // after removing, need to actualize index of current active slide
                this._currentActiveSlide = currentSlideIndex;
                this.eventAggregator.publish(this._currentActiveSlide);
            }, 0);

        }
    }
    // Fixed problem while cannot swipe next / previous image while using HammerJS.
    public swipe(action = this.SWIPE_ACTION.RIGHT) {
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.previousSlide();
        }

        if (action === this.SWIPE_ACTION.LEFT) {
            this.nextSlide();
        }
    }


    /**
     * Rolling to next slide
     * @param force: {boolean} if true - will ignore noWrap flag
     */
    public nextSlide(force = false) {
        if (this.animation === 'slide') {
            this.pause();
            const direction = Direction.NEXT;
            this.slideAnimation(this.findNextSlideIndex(direction, force), direction);
        } else if (this.animation === 'fade') {
            this.pause();
            this.fadeAnimation(this.findNextSlideIndex(Direction.NEXT, force));
        } else {
            this.activeSlide = this.findNextSlideIndex(Direction.NEXT, force);
        }
        if (!this.animation) {
            this.eventAggregator.publish({ 'direction': 'Next', 'relatedTarget': this.activeSlide });
        }
    }

    /**
     * Rolling to previous slide
     * @param force: {boolean} if true - will ignore noWrap flag
     */
    public previousSlide(force = false): void {
        if (this.animation === 'slide') {
            this.pause();
            const direction = Direction.PREV;
            this.slideAnimation(this.findNextSlideIndex(direction, force), direction);
        } else if (this.animation === 'fade') {
            this.pause();
            this.fadeAnimation(this.findNextSlideIndex(Direction.PREV, force));
        } else {
            this.activeSlide = this.findNextSlideIndex(Direction.PREV, force);
        }
        if (!this.animation) {
            this.eventAggregator.publish({ 'direction': 'Prev', 'relatedTarget': this.activeSlide });
        }
    }





    /**
     * Rolling to specified slide
     * @param index: {number} index of slide, which must be shown
     */
    public selectSlide(index: number): void {
        this.pause();
        if (this.animation === 'slide') {

            if (this.activeSlide < index) {
                this.slideAnimation(index, Direction.NEXT);
            } else if (this.activeSlide > index) {
                this.slideAnimation(index, Direction.PREV);
            }
        } else if (this.animation === 'fade') {
            if (index !== this.activeSlide) {
                this.fadeAnimation(index);
            }
        }
        this.play();
    }

    /**
     * Starts a auto changing of slides
     */
    public play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.restartTimer();
        }
    }

    /**
     * Stops a auto changing of slides
     */
    public pause() {
        if (!this.noPause) {
            this.isPlaying = false;
            this.resetTimer();
        }
    }

    /**
     * Finds and returns index of currently displayed slide
     */
    public getCurrentSlideIndex(): number {
        return this._slides.findIndex((slide: Slide) => slide.active);
    }

    /**
     * Defines, whether the specified index is last in collection
     */
    public isLast(index: number): boolean {
        return index + 1 >= this._slides.length;
    }



    protected hasClass(el: any, className: any) {
        if (el.classList) {
            return el.classList.contains(className);
        } else {
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    }

    protected classAdd(el: any, className: any) {
        if (el.classList) {
            el.classList.add(className);
        } else if (!this.hasClass(el, className)) {
            el.className += ' ' + className;
        }
    }

    protected removeClass(el: any, className: any) {
        if (el.classList) {
            el.classList.remove(className);
        } else if (this.hasClass(el, className)) {
            const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    }



    protected fadeAnimation(goToIndex: number) {
        // const currentSlide = this._slides.get(this._currentActiveSlide);
        const goToSlide = this._slides.get(goToIndex);

        if (this.animationEnd) {
            this.animationEnd = false;

            goToSlide.directionNext = true;
            if (this.isBrowser) {
                setTimeout(() => {
                    goToSlide.directionNext = false;
                    this.animationEnd = true;

                    this.activeSlide = goToIndex;
                    this.eventAggregator.publish({ 'direction': 'Next', 'relatedTarget': this.activeSlide });
                    this.play();
                }, 100);
            }
        }
    }

    protected slideAnimation(goToIndex: number, direction: any) {

        const currentSlide = this._slides.get(this._currentActiveSlide);
        const goToSlide = this._slides.get(goToIndex);

        if (this.animationEnd) {
            if (direction === Direction.NEXT) {
                this.animationEnd = false;
                goToSlide.directionNext = true;
                if (this.isBrowser) {
                    setTimeout(() => {
                        goToSlide.directionLeft = true;
                        currentSlide.directionLeft = true;
                    }, 100);
                }
            }

            if (direction === Direction.PREV) {
                this.animationEnd = false;

                goToSlide.directionPrev = true;
                if (this.isBrowser) {
                    setTimeout(() => {
                        goToSlide.directionRight = true;
                        currentSlide.directionRight = true;
                    }, 100);
                }
            }

            if (this.isBrowser) {
                setTimeout(() => {
                    goToSlide.directionLeft = false;
                    goToSlide.directionNext = false;
                    currentSlide.directionLeft = false;
                    currentSlide.directionNext = false;
                    goToSlide.directionRight = false;
                    goToSlide.directionPrev = false;
                    currentSlide.directionRight = false;
                    currentSlide.directionPrev = false;

                    this.animationEnd = true;

                    this.activeSlide = goToIndex;

                    let directionName;
                    if (direction === Direction.NEXT) {
                        directionName = 'Next';
                    } else if (direction === Direction.PREV) {
                        directionName = 'Prev';
                    }

                    this.eventAggregator.publish({ 'direction': directionName, 'relatedTarget': this.activeSlide });
                    this.play();
                }, 700);
            }
        }
    }

    private keyboardControl(event: KeyboardEvent) {
        if (this.keyboard) {
            if (event.keyCode === 39) {
                this.nextSlide();
            }

            if (event.keyCode === 37) {
                this.previousSlide();
            }
        }

    }

    private focus() {
        (<HTMLElement>this.el).focus();
    }

    private getImg(slide: any) {
        return slide.el.nativeElement.querySelector('img').src;
    }

    /**
     * Defines next slide index, depending of direction
     * @param direction: Direction(UNKNOWN|PREV|NEXT)
     * @param force: {boolean} if TRUE - will ignore noWrap flag, else will return undefined if next slide require wrapping
     */
    private findNextSlideIndex(direction: Direction, force: boolean): any {
        let nextSlideIndex = 0;

        if (!force && (this.isLast(this.activeSlide) && direction !== Direction.PREV && this.noWrap)) {
            return void 0;
        }

        switch (direction) {
            case Direction.NEXT:
                // if this is last slide, not force, looping is disabled and need to going forward - select current slide, as a next
                nextSlideIndex = (!this.isLast(this._currentActiveSlide)) ? this._currentActiveSlide + 1 :
                    (!force && this.noWrap) ? this._currentActiveSlide : 0;
                break;
            case Direction.PREV:
                // if this is first slide, not force, looping is disabled and need to going backward - select current slide, as a next
                nextSlideIndex = (this._currentActiveSlide > 0) ? this._currentActiveSlide - 1 :
                    (!force && this.noWrap) ? this._currentActiveSlide : this._slides.length - 1;
                break;
            default:
                throw new Error('Unknown direction');
        }
        return nextSlideIndex;
    }

    /**
     * Sets a slide, which specified through index, as active
     * @param index
     */
    private _select(index: number): void {
        if (isNaN(index)) {
            this.pause();
            return;
        }
        const currentSlide = this._slides.get(this._currentActiveSlide);
        if (currentSlide) {
            currentSlide.active = false;
        }
        const nextSlide = this._slides.get(index);
        if (nextSlide) {
            this._currentActiveSlide = index;
            nextSlide.active = true;
            this.activeSlide = index;
            // this.activeSlideChange.emit(index);
        }
    }

    /**
     * Starts loop of auto changing of slides
     */
    private restartTimer(): any {
        this.resetTimer();
        if (this.isBrowser) {
            const interval = +this.interval;
            if (!isNaN(interval) && interval > 0) {
                this.currentInterval = setInterval(
                    () => {
                        const nInterval = +this.interval;
                        if (this.isPlaying && !isNaN(this.interval) && nInterval > 0 && this.slides.length) {
                            this.nextSlide();
                        } else {
                            this.pause();
                        }
                    },
                    interval);
            }
        }
    }

    /**
     * Stops loop of auto changing of slides
     */
    private resetTimer(): void {
        if (this.isBrowser) {
            if (this.currentInterval) {
                clearInterval(this.currentInterval);
                this.currentInterval = void 0;
            }
        }

    }

}