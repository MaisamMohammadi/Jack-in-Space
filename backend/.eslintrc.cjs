module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'import/extensions': 0,
    'object-curly-newline': 0
  }
}
