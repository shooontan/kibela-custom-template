module.exports = {
  extends: ['@shooontan/eslint-config-ts'],
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'no-constant-condition': ['error', { checkLoops: false }],
  },
};
