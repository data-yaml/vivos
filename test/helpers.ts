export module IT {
  export const ifis = (condition: boolean) => condition ? it : it.skip;
  export const ifhas = (key: string) => ifis(process.env[key] !== undefined);
}
