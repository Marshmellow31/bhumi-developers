# Bhumi Developers - Corporate Website

A modern, high-performance corporate website and project portfolio for **Bhumi Developers**, a leading real estate firm developing residential, commercial, and township projects across Bharuch, Mumbai, and Vadodara.

This application is built using the latest web technologies to provide an immersive, premium user experience with 3D elements, smooth scrolling, and responsive design.

## ✨ Key Features

- **Project Portfolio:** Detailed showcasing of ongoing, completed, and upcoming real estate projects (e.g., Central Square, Solitaire Pallazzo, City Center).
- **Immersive 3D Experiences:** Interactive 3D graphics and canvas elements powered by React Three Fiber.
- **Smooth Scrolling:** Integrated Lenis for seamless and fluid scrolling experiences.
- **Premium Aesthetics:** Modern UI/UX built with Tailwind CSS v4 and Framer Motion for elegant animations.
- **Performance Optimized:** Utilizing Next.js App Router, optimized images, and fonts for maximum speed and SEO.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **3D Rendering:** [React Three Fiber](https://r3f.docs.pmnd.rs/) & [Drei](https://github.com/pmndrs/drei)
- **Scrolling:** [Lenis](https://lenis.studiofreight.com/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📂 Project Structure

- `app/`: Next.js App Router structure, containing pages, layouts, and global CSS.
- `components/`: Modular React components, including UI elements, home sections, and 3D canvases.
- `data/`: Centralized static data points (e.g., `projects.ts` containing all real estate project details).
- `lib/`: Utility functions and helper classes.
- `public/`: Static assets including images, videos, 3D models, and PDF brochures.

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🌐 Deploy on Vercel

This project is fully optimized and configured for seamless deployment on [Vercel](https://vercel.com). Follow the steps below to deploy your app:

### 1. Push Your Changes to GitHub
Ensure all the Vercel configuration files, package updates, and environment setups are pushed to your remote repository:
```bash
git add .
git commit -m "Configure project for professional Vercel deployment"
git push origin master
```

### 2. Import into Vercel
1. Go to the [Vercel Dashboard](https://vercel.com) and click **Add New** > **Project**.
2. Select and import your GitHub repository: `bhumi-developers`.
3. Vercel will automatically detect **Next.js** as the framework and configure the optimal build command (`next build`) and output directory.

### 3. Configure Environment Variables
Before clicking **Deploy**, expand the **Environment Variables** section in the Vercel project configuration and add the following keys from your `.env.example` file:

| Variable Name | Example Value | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_NAME` | `Bhumi Developers` | The name of your site shown across titles and components. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `contact@bhumidevelopers.com` | The default email address used for contact and enquiry actions. |

### 4. Deploy!
Click **Deploy**. Vercel will build the application, compile all TypeScript, generate static pages, and serve your app globally via their high-performance edge CDN!
