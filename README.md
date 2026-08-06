# Project Setup

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or newer recommended)
- **npm** (comes with Node.js)
- **Wrangler CLI**

Install Wrangler globally:

```bash
npm install -g wrangler
```

Verify the installation:

```bash
node -v
npm -v
wrangler --version
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/imshihab/OHI_INT.git
cd https://github.com/imshihab/OHI_INT.git
```

Install project dependencies:

```bash
npm install
```

---

## Important

After cloning the repository for the **first time**, build the project once:

```bash
npm run build
```

This generates the initial `dist/` directory required by Wrangler.

---

## Running the Development Server

Open **two terminal windows**.

### Terminal 1 — Start the Vite development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

### Terminal 2 — Start Cloudflare Pages

```bash
wrangler pages dev dist
```

This serves the built application using the Cloudflare Pages runtime.

---

## Available Scripts

### Start Vite Development Server

```bash
npm run dev
```

### Build the Project

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

---

## Development Workflow

After the initial setup:

1. Start the Vite development server:

   ```bash
   npm run dev
   ```

2. In another terminal, start Cloudflare Pages:

   ```bash
   wrangler pages dev dist
   ```

3. Make your changes.

4. If you modify Cloudflare-specific code or need an updated production build, rebuild:

   ```bash
   npm run build
   ```

---

## Notes

- Run `npm install` only once after cloning.
- Run `npm run build` once before starting `wrangler pages dev`.
- Keep **both terminals running** during development.
- If dependencies change, run:

  ```bash
  npm install
  ```
