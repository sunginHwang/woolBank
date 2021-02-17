const CracoAlias = require('craco-alias');

module.exports = {
  babel: {
    plugins: ['babel-plugin-styled-components']
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json'
      }
    }
  ]
};
