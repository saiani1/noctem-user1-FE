const withPlugins = require('next-compose-plugins');

const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPlugins([
  withPWA,
  {
    images: {
      domains: ['image.istarbucks.co.kr', 'user-images.githubusercontent.com'],
    },
    webpack: config => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    },
  },
  // 추가 플러그인
]);
