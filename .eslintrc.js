module.exports = {
  extends: ['@shooontan/eslint-config-ts'],
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-empty-function': 'error',
    '@typescript-eslint/member-ordering': 'error',
  },
};
