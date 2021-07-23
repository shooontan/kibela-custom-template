export function load(name: string) {
  const script = document.createElement('script');
  script.setAttribute('type', 'module');
  // eslint-disable-next-line
  // @ts-ignore
  script.setAttribute('src', chrome.runtime.getURL(`pages/${name}.js`));
  const { head } = document;
  head.insertBefore(script, head.lastChild);
}
