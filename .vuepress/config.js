module.exports = {
  title: 'spchinhhang 🎉',
  description: `spchinhhang wrote in typescript`,
  base: process.env.DEPLOY_ENV === 'gh-pages' ? '/nestjs-core/' : '/',
  themeConfig: {
    sidebar: [['/', 'Introduction'], '/docs/development', '/docs/architecture']
  }
};
