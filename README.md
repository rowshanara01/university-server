### Multivendor E-Commerce Frontend ##

A modern, responsive frontend for a **multivendor e-commerce platform**, where multiple vendors can list and sell their products in a single marketplace. Built with **TypeScript** for type safety and maintainability.

## Features ##

- Browse products by category, vendor and search
- Product details page with images, price and description
- Shopping cart and checkout flow
- Vendor storefront pages
- User authentication (login / register)
- Vendor and customer dashboards
- Fully responsive design (mobile, tablet, desktop)

> Adjust this list to match what is actually implemented in your project.

## Tech Stack##

- **Language:** TypeScript##
- **Framework:** React / Next.js
- **Styling:** CSS / Tailwind CSS
- **API:** REST API (backend connects separately)

> Update the framework and styling lines if your project uses something different.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm or yarn

### Installation ##

```bash
### Clone the repository
git clone https://github.com/rowshanara01/vendor-ecom-frontend-.git

### Go to the project folder##
cd vendor-ecom-frontend-

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root and add:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Application pages / routes
│   ├── services/    # API calls
│   ├── types/       # TypeScript types and interfaces
│   └── styles/      # Global styles
├── package.json
└── tsconfig.json
```

> Update this to match your real folder structure.

### Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Author

**Rowshanara Akhter**
GitHub: [@rowshanara01](https://github.com/rowshanara01)

## License

This project is open source and available under the [MIT License](LICENSE).
