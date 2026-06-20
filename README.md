# MiniPet Website 🌐

The official web application for **MiniPet**, featuring the marketplace, custom pet minting dashboard, and admin configurations. Powered by the **Sui Blockchain** and **Walrus Protocol**.

**Live**: [https://minipet.vercel.app](https://minipet.vercel.app)

---

## 🚀 Key Features

1. **Decentralized Marketplace**: Adopt official pixel pets (Sui NFTs) with SUI. View pet type, description, rarity preview, and animation states before purchase.
2. **Custom Pet Minting**: Purchase a Mint Slot with MIPET tokens, upload custom pixel spritesheets and avatars, and mint a personalized NFT.
3. **Rarity System**: On-chain gacha — Normal (70%), Rare (20%), Super Rare (8%), Legendary (2%) with unique spritesheets per rarity.
4. **Admin Panel**: Dynamically verifies `AdminCap` ownership on-chain. Manage pet templates, global config, and fees.
5. **Permanent Walrus Storage**: Custom spritesheets uploaded to Walrus decentralized protocol with gas-free sponsor handling via backend.
6. **Desktop App Sync**: Deep-link wallet sync (`minipet://`) to connect web wallet with Tauri desktop app.
7. **Download Hub**: Platform-aware download section (macOS ARM active, Windows/Intel coming soon).
8. **SEO & Internationalization**:
   - Next.js 15 App Router with hybrid Server/Client rendering
   - 5 languages: English, Vietnamese, Korean, French, Italian
   - Dynamic `sitemap.xml` and `robots.txt`

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| State/Query | [@tanstack/react-query](https://tanstack.com/query/latest) |
| Sui SDK | [@mysten/dapp-kit](https://sdk.mystenlabs.com/dapp-kit) & `@mysten/sui` |
| i18n | [i18next](https://www.i18next.com/) & `react-i18next` |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) & react-icons |

---

## 📦 Getting Started

### 1. Environment Variables

Create `.env` (or `.env.local`):
```ini
NEXT_PUBLIC_SUI_NETWORK=testnet
NEXT_PUBLIC_PACKAGE_ID=0x1de01a3d4bf50fdc2710f765313469316efac4252a3192f835d71ff225578c03
NEXT_PUBLIC_GLOBAL_CONFIG_ID=0xc77d430ff60cb762958bd36f7053d42a43bc6562fb21855b67fb8ff764dadf83
NEXT_PUBLIC_ADMIN_CAP_ID=0x092031bc999896a437468675d8600288dfa48fd646444b07a769191236d9590d
NEXT_PUBLIC_PET_TOKEN_PACKAGE_ID=0x7762d89a5c01c00ae0d118e3a2f6191ef13aa701a5aa7f57ecc38fe6959c403e
NEXT_PUBLIC_TREASURY_CAP_ID=0x8c0387f8bf0654f9abef3690c5289226c06c15c3ea2d5a0a3451c891600bf31f

NEXT_PUBLIC_WALRUS_PUBLISHER_URL=https://publisher.walrus-testnet.walrus.space
NEXT_PUBLIC_WALRUS_AGGREGATOR_URL=https://aggregator.walrus-testnet.walrus.space
NEXT_PUBLIC_BACKEND_URL=https://api.minipet.xyz
```

### 2. Install and Run
```bash
npm install
npm run dev       # Development (localhost:3000)
npm run build     # Production build
```

---

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, features, download section |
| `/market` | Pet marketplace — browse & adopt official pets |
| `/market/[id]` | Pet detail — animation viewer, rarity preview, adopt |
| `/market/mint-slot` | Purchase Mint Slot with MIPET tokens |
| `/custom-pet` | Custom pet creator — upload sprites, mint NFT |
| `/profile` | User profile — owned pets, transaction history |
| `/admin` | Admin panel — manage templates & config (AdminCap required) |
| `/sync-login` | Wallet sync with desktop app via deep-link |
| `/roadmap` | Development roadmap |
| `/docs` | Documentation |

---

## 🔒 Security
- PostCSS XSS vulnerability patched via resolution override
- On-chain admin verification (no hardcoded admin addresses)
- Gas sponsorship via backend to prevent user key exposure

---

MIT © [QBao](mailto:lehoquocbao9@gmail.com)
