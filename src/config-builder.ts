import * as LogManager from 'aurelia-logging';
import { PLATFORM } from 'aurelia-pal';

export class MdlConfigBuilder {
  public resources: string[] = [];
  private registerRepeatStrategy = true;
  private _propogatePreventDefault = false;
  private logger: LogManager.Logger;

  constructor() {
    this.logger = LogManager.getLogger('aurelia-mdb');
  }

  public detect(): MdlConfigBuilder {
    return this;
  }

  public core(): MdlConfigBuilder {
    this.icon();
    this.button();
    this.checkbox();
    this.waves();
    this.radio();
    this.badge();
    this.breadcrumb();
    this.card();
    this.carousel();
    return this;
  }

  public carousel(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./carousel/carousel'));
    this.resources.push(PLATFORM.moduleName('./carousel/slide'));
    return this;
  }


  public card(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./card/card'));
    this.resources.push(PLATFORM.moduleName('./card/card-title'));
    this.resources.push(PLATFORM.moduleName('./card/card-text'));
    this.resources.push(PLATFORM.moduleName('./card/card-body'));
    this.resources.push(PLATFORM.moduleName('./card/card-footer'));
    this.resources.push(PLATFORM.moduleName('./card/card-image'));
    return this;
  }

  public badge(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./badge/index'));
    return this;
  }

  public breadcrumb(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./breadcrumb/breadcrumb'), PLATFORM.moduleName('./breadcrumb/item'));
    return this;
  }


  public waves(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./mdbWavesEffect/index'));
    return this;
  }

  public button(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./button/index'));
    return this;
  }

  public radio(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./radio/index'));
    return this;
  }

  public checkbox(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./checkbox/index'));
    return this;
  }

  public pro(): MdlConfigBuilder {
    return this;
  }

  public icon(): MdlConfigBuilder {
    this.resources.push(PLATFORM.moduleName('./icon/index'));
    return this;
  }
}
