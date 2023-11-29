import Constants from '../src/constants';
export module IT {
  export const cc = new Constants({});
  export const ifis = (condition: boolean) => condition ? it : it.skip;
  export const ifhas = (key: string) => ifis(cc.has(key));
}
