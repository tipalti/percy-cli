import PercyConfig from '@tipalti/percy-config';
import * as CoreConfig from './config.js';

PercyConfig.addSchema(CoreConfig.schemas);
PercyConfig.addMigration(CoreConfig.migrations);

export { default, Percy } from './percy.js';
