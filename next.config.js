const withPlugins = require('next-compose-plugins');

const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPlugins([
  withPWA,
  {
    images: {
      domains: ['image.istarbucks.co.kr'],
    }
  }
  // 추가 플러그인
]);
