const PROXY_CONFIG = [
  {
    context: [
      '/api/weatherforecast',
      '/api/user',
      '/api/student',
      '/api/teacher',
      '/api/workingDay',
    ],
    target: 'https://localhost:7020',
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
