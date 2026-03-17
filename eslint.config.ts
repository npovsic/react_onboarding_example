import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // 1. Base TypeScript Recommended Config
  tseslint.configs.recommended,

  {
    // Restrict these rules to your TS files
    files: ['**/*.ts'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // 2. Logic Rules
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',

      // 3. Prettier Integration
      // This tells Prettier to enforce single quotes and semicolons
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
        },
      ],

      // 4. Disable ESLint's own formatting rules to avoid conflicts
      ...prettierConfig.rules,
    },
  },
);
