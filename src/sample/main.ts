import { MdlConfigBuilder } from './../aurelia-plugin-skeleton-typescript/config-builder';
import { Aurelia, PLATFORM } from 'aurelia-framework';
import './mdb.css';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName('aurelia-plugin-skeleton-typescript'), (config: MdlConfigBuilder) => config.core());

  await aurelia.start();
  await aurelia.setRoot('app');
}
