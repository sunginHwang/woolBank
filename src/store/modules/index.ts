// @ts-ignore
const requireModule: any = require.context('.', true, /^(?!.\/index).*.ts$/);

const modules: any = {};
requireModule.keys().forEach((filename: string) => {
  const moduleName: string = filename.replace(/(\.\/|\.ts)/g, '');
  modules[moduleName] = requireModule(filename).default.reducer;
});

export default modules;
