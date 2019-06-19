import { MdlConfigBuilder } from './config-builder';
import { PLATFORM, FrameworkConfiguration } from 'aurelia-framework';
import * as LogManager from 'aurelia-logging';


export function configure(config: FrameworkConfiguration, configCallback: (config: MdlConfigBuilder) => any): void {
  let builder = config.container.get(MdlConfigBuilder) as MdlConfigBuilder;
  let logger = LogManager.getLogger('aurelia-mdl');
  if (configCallback !== undefined && typeof (configCallback) === 'function') {
    configCallback(builder);
  }

  let resources = builder.resources;
  logger.info(`Loading ${resources.length} wrappers`, resources);

  if (resources.length > 0) {
    config.globalResources(resources);
  }
}
