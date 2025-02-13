import command from '@tipalti/percy-cli-command';
import flags from '@tipalti/percy-cli-command/flags';

export const id = command('id', {
  description: 'Prints the build ID from a locally running Percy process',
  flags: [flags.port],
  percy: true
}, async function*({ flags, percy, log, exit }) {
  if (!percy) exit(0, 'Percy is disabled');

  let { request } = await import('@tipalti/percy-cli-command/utils');
  let ping = `http://localhost:${flags.port}/percy/healthcheck`;
  let build = null;

  try {
    ({ build } = await request(ping, { retryNotFound: true, noProxy: true }));
  } catch (err) {
    log.error('Percy is not running');
    log.debug(err);
    exit(1);
  }

  if (build?.id) {
    log.stdout.write(build.id.toString());
  } else {
    log.error('Unable to find local build information');
    exit(1);
  }
});

export default id;
