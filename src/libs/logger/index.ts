type Message = Parameters<typeof console['log']>;

function info(...message: Message) {
  // eslint-disable-next-line no-console
  console.info(...message);
}

function debug(...message: Message) {
  // eslint-disable-next-line no-console
  console.debug(...message);
}

export const logger = {
  info,
  debug,
};
