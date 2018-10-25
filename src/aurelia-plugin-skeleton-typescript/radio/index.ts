import { customAttribute, bindable, autoinject } from 'aurelia-framework';
import { constants } from '../common/constants';

/**
* Create radio buttons or groups of buttons.
* A value of a selected button is bound to a variable specified via ngModel.
*/
@autoinject()
@customAttribute(`${constants.attributePrefix}radio`, null, [])
export class Radio {
    public onChange: any = Function.prototype;
    public onTouched: any = Function.prototype;

    private radioElementsArray: Array<Element> = [];
    /** Radio button value, will be set to `ngModel` */
    @bindable public radioValue: any;
    /** If `true` — radio button can be unchecked */
    @bindable public uncheckable: boolean;
    /** Current value of radio component or group */
    @bindable public value: any;

    constructor(private el: Element) {

    }

    public detached() {
        this.el.removeEventListener('click', this.onClick);
    }

    public onClick(event?: MouseEvent): void {
        try {
            this.el.parentElement.childNodes.forEach((element: Element) => {
                this.radioElementsArray.push(element);
            });
            this.radioElementsArray.forEach(element => {
                if (element.classList) {
                    element.classList.remove('active');
                }
            });
            this.el.classList.add('active');
        } catch (error) {
            // ignore
        }

        if (this.el.attributes.getNamedItem('disabled')) {
            return;
        }

        if (this.uncheckable && this.radioValue === this.value) {
            this.value = undefined;
        } else {
            this.value = this.radioValue;
        }

        this.onTouched();
        this.onChange(this.value);
    }

    public attached(): void {
        this.el.addEventListener('click', this.onClick.bind(this));
        this.uncheckable = typeof this.uncheckable !== 'undefined';
        if (this.radioValue === this.value) {
            this.el.classList.add('active');
        }
    }

    public onBlur(): void {
        this.onTouched();
    }

    // ControlValueAccessor
    // model -> view
    public writeValue(value: any): void {
        this.value = value;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
