This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

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
Click **Deploy**. Vercel will build the application using Node.js 22, compile all TypeScript, generate static pages, and serve your app globally via their high-performance edge CDN!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more advanced details.

