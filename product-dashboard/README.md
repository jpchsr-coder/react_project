# Product Dashboard

A modern e-commerce product dashboard built with React, TypeScript, Redux Toolkit, and Vite. This application showcases a responsive product listing with filtering, sorting, and favorites functionality.

## Features

- **Product Listing**: View all available products with images, prices, and ratings
- **Search & Filter**: Search products by name and filter by category
- **Sorting**: Sort products by price, rating, and title
- **Favorites**: Add/remove products to/from favorites
- **Product Details**: Detailed view for each product
- **Responsive Design**: Works on desktop and mobile devices
- **Type Safety**: Full TypeScript support
- **Testing**: Comprehensive test coverage with Jest and React Testing Library

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Redux Toolkit, React-Redux
- **Routing**: React Router DOM
- **Styling**: CSS Modules
- **Testing**: Jest, React Testing Library
- **Build Tool**: Vite

## Project Structure

```
src/
├── app/
│   ├── pages/
│   │   ├── ProductList.tsx      # Main product listing page
│   │   ├── ProductDetail.tsx    # Product details page
│   │   └── Favorites.tsx        # Favorites page
│   ├── store.ts                 # Redux store configuration
│   └── hooks.ts                 # Custom React hooks
├── components/
│   ├── ProductCard.tsx          # Product card component
│   ├── ProductListHeader.tsx    # Header with search and filter
│   ├── FilterBar.tsx            # Filter and sort controls
│   └── SearchBar.tsx            # Search input component
├── features/
│   ├── products/
│   │   ├── productsSlice.ts     # Products Redux slice
│   │   └── productsSelectors.ts # Products selectors
│   └── favorites/
│       └── favoritesSlice.ts    # Favorites Redux slice
└── types/
    └── index.ts                 # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd product-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate test coverage report
npm run test:coverage
```

## Available Scripts

- `dev`: Start development server
- `build`: Build for production
- `preview`: Preview production build
- `test`: Run tests
- `test:coverage`: Run tests with coverage report
- `lint`: Run ESLint
- `typecheck`: Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
