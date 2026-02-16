
// Removed Category from imports as it is not exported from types.ts
import { Technology, UIComponent } from './types';

export const MOCK_COMPONENTS: UIComponent[] = [
  {
    id: '1',
    name: 'Modern SaaS Header',
    description: 'A responsive header with a sticky blurred background and mobile menu.',
    // Replaced Category.HEADERS with string literal 'Headers' to match DEFAULT_CATEGORIES in types.ts
    category: 'Headers',
    technology: [Technology.REACT, Technology.TAILWIND],
    tags: ['sticky', 'blur', 'minimal'],
    imageUrl: 'https://picsum.photos/seed/header1/800/200',
    author: 'Admin',
    dateAdded: '2024-03-20',
    code: {
      react: `export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">UI HUB</span>
          </a>
        </div>
      </div>
    </header>
  );
}`
    }
  },
  {
    id: '2',
    name: 'Auth Multi-step Form',
    description: 'Clean authentication form with validation and progress indicator.',
    // Replaced Category.FORMS with string literal 'Forms' to match DEFAULT_CATEGORIES in types.ts
    category: 'Forms',
    technology: [Technology.REACT, Technology.TAILWIND],
    tags: ['auth', 'validation', 'steps'],
    imageUrl: 'https://picsum.photos/seed/form1/600/800',
    author: 'DesignTeam',
    dateAdded: '2024-03-21',
    code: {
      html: `<form class="space-y-4">
  <input type="email" class="w-full px-4 py-2 border rounded" placeholder="Email" />
  <button class="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
</form>`
    }
  },
  {
    id: '3',
    name: 'Neo-brutalist Pricing',
    description: 'High contrast pricing tables for creative agencies.',
    // Replaced Category.PRICING with string literal 'Pricing' to match DEFAULT_CATEGORIES in types.ts
    category: 'Pricing',
    technology: [Technology.TAILWIND],
    tags: ['neo-brutalism', 'dark-mode'],
    imageUrl: 'https://picsum.photos/seed/price1/600/500',
    author: 'Artur',
    dateAdded: '2024-03-19',
    code: {
      html: `<div class="border-4 border-black p-8 shadow-[8px_8px_0_0_#000]">
  <h3 class="text-2xl font-black">Pro Plan</h3>
  <p class="text-4xl font-black mt-4">$49/mo</p>
</div>`
    }
  },
  {
    id: '4',
    name: 'Glassmorphism Card',
    description: 'Modern card style with heavy background blur and gradient borders.',
    // Replaced Category.CARDS with string literal 'Cards' to match DEFAULT_CATEGORIES in types.ts
    category: 'Cards',
    technology: [Technology.CSS, Technology.TAILWIND],
    tags: ['glassmorphism', 'modern'],
    imageUrl: 'https://picsum.photos/seed/card1/600/400',
    author: 'Elena',
    dateAdded: '2024-03-22',
    code: {
      html: `<div class="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
  <h4 class="text-white font-bold">Glass Card</h4>
</div>`
    }
  },
  {
      id: '5',
      name: 'Geometric Hero',
      description: 'Abstract hero section with animated blobs and call to action.',
      // Replaced Category.HERO with string literal 'Hero Sections' to match DEFAULT_CATEGORIES in types.ts
      category: 'Hero Sections',
      technology: [Technology.TAILWIND],
      tags: ['hero', 'animation'],
      imageUrl: 'https://picsum.photos/seed/hero1/800/600',
      author: 'Admin',
      dateAdded: '2024-03-23',
      code: {
          html: `<section class="relative overflow-hidden py-24">
  <div class="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20"></div>
  <div class="relative container mx-auto text-center">
    <h1 class="text-6xl font-extrabold">Build Faster</h1>
  </div>
</section>`
      }
  },
  {
    id: '6',
    name: 'Minimalist Footer',
    description: 'A clean footer with simple navigation and social links.',
    // Replaced Category.FOOTERS with string literal 'Footers' to match DEFAULT_CATEGORIES in types.ts
    category: 'Footers',
    technology: [Technology.TAILWIND],
    tags: ['footer', 'minimal'],
    imageUrl: 'https://picsum.photos/seed/footer1/800/150',
    author: 'Admin',
    dateAdded: '2024-03-24',
    code: {
        html: `<footer class="border-t py-8">
  <div class="container mx-auto flex justify-between">
    <p>&copy; 2024 UI Hub</p>
    <div class="flex gap-4">
      <a href="#">Twitter</a>
      <a href="#">GitHub</a>
    </div>
  </div>
</footer>`
    }
  }
];
