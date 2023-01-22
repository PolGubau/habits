module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  root: true,

  extends: [
    'plugin:@next/next/recommended',
    'plugin:react/recommended',"eslint:recommended",
    'standard-with-typescript'
  ],
  
  parser: `@typescript-eslint/parser`,
  parserOptions: {
      "ecmaFeatures": {
      "jsx": true
    },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaVersion: 12,
    sourceType: 'module'
    
  },
  
  plugins: [
    'react'
  ],
  
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    "dot-notation": 0,
    "@typescript-eslint/no-throw-literal": ["error"],
    '@typescript-eslint/no-unnecessary-type-assertion': 2,
    "@typescript-eslint/dot-notation": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-floating-promises": "off",
    
  },
  
  
}
