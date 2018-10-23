import * as LogManager from 'aurelia-logging';
import { PLATFORM } from 'aurelia-pal';

/**
* Configure the Aurelia-KendoUI-bridge
*/
export class MdlConfigBuilder {
  private resources: string[] = [];
  private registerRepeatStrategy = true;
  private _propogatePreventDefault = false;
  private logger: LogManager.Logger;

  constructor() {
    this.logger = LogManager.getLogger('aurelia-kendoui-bridge');
  }

  /**
  * Automatically detect which Kendo controls are loaded, and load matching wrappers
  */
  public detect(): MdlConfigBuilder {
    return this;
  }

  /**
  * Globally register all Kendo Core wrappers including templating support
  */
  public core(): MdlConfigBuilder {
    this.fa();
    this.button();
    this.checkbox();
    this.waves();
    this.radio()
    return this;
  }

  public waves(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./mdbWavesEffect/mdbWavesEffect'));
    return this;
  }

  public button(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./button/button'));
    return this;
  }

  public radio(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./radio/radio'));
    return this;
  }

  public checkbox(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./checkbox/checkbox'));
    return this;
  }

  /**
  * Globally register all Kendo Core and Kendo Pro wrappers
  */
  public pro(): MdlConfigBuilder {
    return this;
  }

  public fa(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./fa/fa'));
    return this;
  }
}
