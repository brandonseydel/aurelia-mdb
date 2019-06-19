import { MdlConfigBuilder } from 'config-builder';
import { Aurelia, PLATFORM } from 'aurelia-framework';
import './mdb.css';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .feature('resources', (config: MdlConfigBuilder) => config.core());

  await aurelia.start();
  await aurelia.setRoot('app');
}
