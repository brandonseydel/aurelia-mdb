import { autoinject } from 'aurelia-framework';
import { customAttribute, bindable } from 'aurelia-framework';
import { constants } from '../common/constants';

@autoinject()
@customAttribute(`${constants.attributePrefix}checkbox`, null)
export class Checkbox {
    @bindable  public checkedValue: any = true;
    @bindable public uncheckedValue: any = false;
    @bindable public value: any;



    private _state: boolean;
    public get state(): boolean {
        return this._state;
    }
    public set state(v: boolean) {
        this._state = v;
        if (!this._state) {
            this.element.classList.remove('active');
            return;
        }
        this.element.classList.add('active');
    }

    protected isDisabled: boolean;

    protected onChange: any = Function.prototype;
    protected onTouched: any = Function.prototype;

    constructor(private element: Element) {

    }

    public attached() {
        this.element.addEventListener('click', this.click.bind(this));
    }

    public detached() {
        this.element.removeEventListener('click', this.click);
    }

    private click(event: MouseEvent) {
        if (this.isDisabled) {
            return;
        }

        this.toggle(!this.state);
        this.onChange(this.value);
    }


    public bind(): any {
        this.toggle(this.trueValue === this.value);
    }

    protected get trueValue(): boolean {
        return typeof this.btnCheckboxTrue !== 'undefined'
            ? this.btnCheckboxTrue
            : true;
    }

    protected get falseValue(): boolean {
        return typeof this.btnCheckboxFalse !== 'undefined'
            ? this.btnCheckboxFalse
            : false;
    }

    public toggle(state: boolean): void {
        this.state = state;
        this.value = this.state ? this.trueValue : this.falseValue;
    }

    // ControlValueAccessor
    // model -> view
    public writeValue(value: any): void {
        this.state = this.trueValue === value;
        this.value = value ? this.trueValue : this.falseValue;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
}