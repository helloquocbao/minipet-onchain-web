# MiniPet Website 🌐
The official web application for **MiniPet**, featuring the marketplace, custom pet minting dashboard, and admin configurations. Powered by the **Sui Blockchain** and **Walrus Protocol**.

---

## 🚀 Key Features

1. **Decentralized Marketplace**: Adopt official pixel pets (represented as Sui NFTs) using SUI or custom MIPET tokens.
2. **Custom Pet Minting**: Purchase a Mint Slot, upload custom pixel spritesheets and avatars, and mint a personalized NFT.
3. **Dynamic Admin Verification**:
   - The `/admin` panel dynamically verifies ownership by querying `AdminCap` ownership on-chain using Sui RPC client.
   - Non-admin connections are securely blocked with clear localized "Access Denied" panels.
4. **Permanent Walrus Storage**: Client custom creations are safely uploaded to the Walrus decentralized protocol with gas-free sponsor handling.
5. **SEO & Internationalization**:
   - Next.js 15 App Router with hybrid Server/Client rendering for full metadata and crawler discovery.
   - Alternate Hreflang support for Multilingual routing (English, Vietnamese, Chinese, Italian, French).
   - Dynamically generated `sitemap.xml` and custom rules inside `robots.txt`.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management & Query**: [@tanstack/react-query](https://tanstack.com/query/latest)
- **Sui Integration**: [@mysten/dapp-kit](https://sdk.mystenlabs.com/dapp-kit) & `@mysten/sui`
- **Internationalization**: [i18next](https://www.i18next.com/) & `react-i18next`
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 📦 Getting Started

### 1. Configure Environment Variables
Create a `.env` file in the root of `minipet-web`:
```ini
NEXT_PUBLIC_SUI_NETWORK=testnet
NEXT_PUBLIC_PACKAGE_ID=0x...
NEXT_PUBLIC_GLOBAL_CONFIG_ID=0x...
NEXT_PUBLIC_ADMIN_CAP_ID=0x...
NEXT_PUBLIC_PET_TOKEN_PACKAGE_ID=0x...
NEXT_PUBLIC_TREASURY_CAP_ID=0x...

NEXT_PUBLIC_WALRUS_PUBLISHER_URL=https://publisher.walrus-testnet.walrus.space
NEXT_PUBLIC_WALRUS_AGGREGATOR_URL=https://aggregator.walrus-testnet.walrus.space
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### 2. Install and Run
```bash
# Install dependencies
npm install

# Start local Next.js dev server
npm run dev

# Build optimized production assets (checks lints, types, and generates sitemaps)
npm run build
```

---

## 🔒 Security & Dependency Patching
This project is configured with zero security vulnerabilities:
- **PostCSS XSS Vulnerability**: Patched by forcing resolution override `postcss@^8.5.14` in `package.json`.
- **Brace Expansion DoS**: Patched to a secure version under eslint/minimatch dependencies.
