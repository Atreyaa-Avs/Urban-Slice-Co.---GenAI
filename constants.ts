import { Product, ProductExtra, PromoCode } from './types';

export const EXTRAS: ProductExtra[] = [
  { id: 'candles', name: 'Gold Candles (Pack of 5)', price: 2.50, category: 'party' },
  { id: 'topper', name: 'Acrylic "Happy Birthday" Topper', price: 5.00, category: 'party' },
  { id: 'knife', name: 'Premium Cake Knife', price: 3.00, category: 'party' },
  { id: 'sparklers', name: 'Sparklers (Pack of 3)', price: 4.00, category: 'party' },
  { id: 'poppers', name: 'Party Poppers', price: 3.50, category: 'party' },
  { id: 'snowspray', name: 'Snow Spray', price: 2.50, category: 'party' },
  { id: 'balloons', name: 'Metallic Balloons (Pack of 10)', price: 6.00, category: 'party' },
];

export const SAVOURIES: ProductExtra[] = [
  { id: 'chocolates', name: 'Artisan Truffles (Box of 4)', price: 8.00, category: 'savoury' },
  { id: 'cookies', name: 'Butter Cookies (Pack of 6)', price: 6.00, category: 'savoury' },
  { id: 'spicychips', name: 'Gourmet Spicy Chips', price: 4.50, category: 'savoury' },
  { id: 'munchies', name: 'Savory Munchies Mix', price: 5.00, category: 'savoury' },
  { id: 'drink', name: 'Sparkling Apple Drink', price: 3.50, category: 'savoury' },
];

export const GIFTS: ProductExtra[] = [
  { id: 'gift-chocolates', name: 'Luxury Chocolate Box', price: 15.00 },
  { id: 'gift-flowers', name: 'Red Roses Bouquet', price: 25.00 },
  { id: 'gift-teddy', name: 'Plush Teddy Bear', price: 12.00 },
];

export const CARDS: ProductExtra[] = [
  { id: 'card-bday', name: 'Premium Birthday Card', price: 3.00 },
  { id: 'card-anniv', name: 'Elegant Anniversary Card', price: 3.00 },
  { id: 'card-plain', name: 'Blank Gold Foil Card', price: 2.50 },
];

export const PROMOS: PromoCode[] = [
  { code: 'SLICE10', discountPercent: 0.10, minOrder: 40 },
  { code: 'FESTIVE20', discountAmount: 20, minOrder: 100 }
];

export const CAKE_CATALOG: Product[] = [
  {
    id: 'cake-001',
    slug: 'classic-chocolate-truffle',
    name: 'Classic Chocolate Truffle',
    description: 'Decadent dark chocolate sponge, layered with silky ganache and finished with chocolate shavings.',
    tags: ['vegetarian', 'chocolate'],
    rating: 4.9,
    image: 'https://static.wixstatic.com/media/165a57_6980b1b3645d4d22ab9073e0f96c1680~mv2.jpg/v1/fill/w_750,h_1001,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/165a57_6980b1b3645d4d22ab9073e0f96c1680~mv2.jpg',
    sizes: [{ label: '0.5kg', price: 20 }, { label: '1kg', price: 38 }, { label: '1.5kg', price: 55 }],
    featured: true
  },
  {
    id: 'cake-002',
    slug: 'crimson-kiss-red-velvet',
    name: 'The Crimson Kiss',
    description: 'Velvet crumb with light cocoa, layered with tangy cream cheese frosting and elegant red hue.',
    tags: ['vegetarian', 'bestseller'],
    rating: 4.8,
    image: 'https://static.wixstatic.com/media/165a57_7487ac7280cb45f6a1037fa5feefbcd5~mv2.jpg/v1/fill/w_750,h_1001,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/165a57_7487ac7280cb45f6a1037fa5feefbcd5~mv2.jpg',
    sizes: [{ label: '0.5kg', price: 22 }, { label: '1kg', price: 40 }, { label: '1.5kg', price: 58 }],
    featured: true
  },
  {
    id: 'cake-003',
    slug: 'black-forest-royale',
    name: 'Black Forest Royale',
    description: 'Classic German black forest with layers of chocolate sponge, cherries, and whipped cream.',
    tags: ['vegetarian'],
    rating: 4.7,
    image: 'https://static.wixstatic.com/media/165a57_fd018e60316e45e0a36c4139e63c5609~mv2.jpg/v1/fill/w_750,h_1001,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/165a57_fd018e60316e45e0a36c4139e63c5609~mv2.jpg',
    sizes: [{ label: '0.5kg', price: 24 }, { label: '1kg', price: 44 }, { label: '1.5kg', price: 62 }]
  },
  {
    id: 'cake-004',
    slug: 'ny-cheesecake',
    name: 'New York Cheesecake',
    description: 'Dense, creamy cheesecake on a buttery graham crust—served plain or with berry compote.',
    tags: ['contains-dairy', 'vegetarian', 'classic'],
    rating: 4.9,
    image: 'https://static.wixstatic.com/media/165a57_341489e41eb54256953b84af1a793d4e~mv2.jpg/v1/fill/w_750,h_500,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/165a57_341489e41eb54256953b84af1a793d4e~mv2.jpg',
    sizes: [{ label: '0.5kg', price: 28 }, { label: '1kg', price: 50 }],
    featured: true
  },
  {
    id: 'cake-005',
    slug: 'tiramisu-elegante',
    name: 'Tiramisu Elegante',
    description: 'Venetian layers of mascarpone, espresso-soaked ladyfingers, and dusted cocoa.',
    tags: ['contains-dairy', 'contains-egg', 'coffee'],
    rating: 4.8,
    image: 'https://static.wixstatic.com/media/165a57_52aab49120574dbd993aa4979ec0ea19~mv2.jpg/v1/fill/w_750,h_1125,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/165a57_52aab49120574dbd993aa4979ec0ea19~mv2.jpg',
    sizes: [{ label: '0.5kg', price: 26 }, { label: '1kg', price: 48 }]
  },
  {
    id: 'cake-006',
    slug: 'strawberry-shortcake',
    name: 'Strawberry Shortcake',
    description: 'Light sponge layers with whipped cream and fresh seasonal strawberries—airy and refreshing.',
    tags: ['vegetarian', 'fruit'],
    rating: 4.6,
    image: 'https://static.wixstatic.com/media/165a57_3ecede9579784b5e9cd200e737054c2b~mv2.jpg/v1/fill/w_750,h_1001,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/165a57_3ecede9579784b5e9cd200e737054c2b~mv2.jpg',
    sizes: [{ label: '0.5kg', price: 20 }, { label: '1kg', price: 36 }]
  },
  {
    id: 'cake-007',
    slug: 'carrot-walnut',
    name: 'Carrot & Walnut Cake',
    description: 'Spiced carrot cake with toasted walnuts and cream-cheese frosting—comforting and classic.',
    tags: ['contains-nuts', 'vegetarian'],
    rating: 4.7,
    image: 'https://static.wixstatic.com/media/165a57_c45f1288b25f4155964d9bb582e5bc67~mv2.jpg/v1/fill/w_750,h_750,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/165a57_c45f1288b25f4155964d9bb582e5bc67~mv2.jpg',
    sizes: [{ label: '0.5kg', price: 18 }, { label: '1kg', price: 34 }]
  },
  {
    id: 'cake-008',
    slug: 'matcha-mousse',
    name: 'Matcha Mousse Cake',
    description: 'Delicate matcha sponge with light green tea mousse layers—a subtle, refined flavor profile.',
    tags: ['vegetarian', 'unique'],
    rating: 4.6,
    image: 'https://static.wixstatic.com/media/165a57_b6b696362199499692acc223481e07fb~mv2.jpg/v1/fill/w_750,h_500,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/165a57_b6b696362199499692acc223481e07fb~mv2.jpg',
    sizes: [{ label: '0.5kg', price: 26 }, { label: '1kg', price: 48 }]
  },
  {
    id: 'cake-009',
    slug: 'lemon-drizzle',
    name: 'Lemon Drizzle Delight',
    description: 'Zesty lemon sponge soaked with lemon syrup and glazed for bright citrus notes.',
    tags: ['vegetarian', 'citrus'],
    rating: 4.5,
    image: 'https://as2.ftcdn.net/v2/jpg/14/23/07/87/1000_F_1423078752_H5rIbZLoNrKthGDDaScG156oFkZZvBFZ.jpg',
    sizes: [{ label: '0.5kg', price: 18 }, { label: '1kg', price: 32 }]
  },
  {
    id: 'cake-010',
    slug: 'mango-mousse',
    name: 'Mango Mousse Royale',
    description: 'Tropical mango mousse layered over light sponge—silky tropical finish, seasonal premium.',
    tags: ['vegetarian', 'fruit'],
    rating: 4.7,
    image: 'https://as1.ftcdn.net/v2/jpg/17/18/90/64/1000_F_1718906485_a7EOBtH6LFk5rA4w6MPVAKpcq31NRkEs.jpg',
    sizes: [{ label: '0.5kg', price: 24 }, { label: '1kg', price: 44 }]
  },
  {
    id: 'cake-011', slug: 'opera-slice', name: 'Opera Slice', description: 'French classic: almond sponge, coffee syrup, chocolate glaze.',
    tags: ['contains-nuts', 'luxury'], rating: 4.8, image: 'https://as1.ftcdn.net/v2/jpg/11/14/92/94/1000_F_1114929464_302Nt9lLH88Jes270PjKcjvw8BkQizxa.jpg', sizes: [{ label: '0.5kg', price: 30 }, { label: '1kg', price: 62 }]
  },
  {
    id: 'cake-012', slug: 'basque-burnt', name: 'Basque Burnt Cheesecake', description: 'Creamy, caramelized top with soft, almost custardy interior.',
    tags: ['vegetarian', 'trendy'], rating: 4.9, image: 'https://as1.ftcdn.net/v2/jpg/14/36/75/30/1000_F_1436753031_EZEAd6jTwkOXfFbaWPQ6xWRMSmriG0sF.jpg', sizes: [{ label: '0.6kg', price: 30 }, { label: '1.2kg', price: 56 }]
  },
  {
    id: 'cake-013', slug: 'coconut-cloud', name: 'Coconut Cloud Cake', description: 'Light coconut sponge layered with coconut cream and toasted flakes.',
    tags: ['vegetarian'], rating: 4.5, image: 'https://images.unsplash.com/photo-1586985564259-6211eb4c12d8?auto=format&fit=crop&w=800&q=80', sizes: [{ label: '0.5kg', price: 22 }, { label: '1kg', price: 40 }]
  },
  {
    id: 'cake-014', slug: 'salted-caramel', name: 'Salted Caramel Indulgence', description: 'Caramel-soaked sponge, salted caramel buttercream, and crunchy praline.',
    tags: ['vegetarian', 'rich'], rating: 4.7, image: 'https://as1.ftcdn.net/v2/jpg/15/73/02/74/1000_F_1573027450_WdUvqQN4RHLbGPM87UmwzI8IM8fsuBWz.jpg', sizes: [{ label: '0.5kg', price: 25 }, { label: '1kg', price: 46 }]
  },
  {
    id: 'cake-015', slug: 'pistachio-rose', name: 'Pistachio Rose Cake', description: 'Delicate pistachio layers with rosewater cream.',
    tags: ['contains-nuts', 'floral'], rating: 4.8, image: 'https://as2.ftcdn.net/v2/jpg/12/91/60/51/1000_F_1291605144_nVrI2XqNacOMU04CdMhbZGv61uGrqqZy.jpg', sizes: [{ label: '0.5kg', price: 28 }, { label: '1kg', price: 52 }]
  },
  {
    id: 'cake-016', slug: 'black-sesame', name: 'Black Sesame Silk', description: 'Earthy black sesame mousse and sponge—elegant umami twist.',
    tags: ['vegetarian', 'unique'], rating: 4.6, image: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?auto=format&fit=crop&w=800&q=80', sizes: [{ label: '0.5kg', price: 26 }, { label: '1kg', price: 50 }]
  },
  {
    id: 'cake-017', slug: 'nutella-hazelnut', name: 'Nutella Hazelnut Gateau', description: 'Hazelnut sponge with Nutella cream and crunchy praline.',
    tags: ['contains-nuts', 'chocolate'], rating: 4.8, image: 'https://as2.ftcdn.net/v2/jpg/15/57/18/97/1000_F_1557189779_NhzHkS7s5kfXD9SwllQjdSjVTI3lz1qf.jpg', sizes: [{ label: '0.5kg', price: 24 }, { label: '1kg', price: 46 }]
  },
  {
    id: 'cake-018', slug: 'saffron-cardamom', name: 'Saffron-Cardamom Delight', description: 'Saffron-scented sponge with cardamom cream.',
    tags: ['vegetarian', 'spiced'], rating: 4.7, image: 'https://images.unsplash.com/photo-1629384499250-01164461683d?auto=format&fit=crop&w=800&q=80', sizes: [{ label: '0.5kg', price: 30 }, { label: '1kg', price: 56 }]
  },
  {
    id: 'cake-019', slug: 'berry-mascarpone', name: 'Berry & Mascarpone Torte', description: 'Fresh berries layered with mascarpone cream.',
    tags: ['vegetarian', 'fruit'], rating: 4.6, image: 'https://as1.ftcdn.net/v2/jpg/10/58/51/58/1000_F_1058515882_GXgqKZasY0d8PtiMUBSy1fsx7cNSe2Pv.jpg', sizes: [{ label: '0.5kg', price: 22 }, { label: '1kg', price: 42 }]
  },
  {
    id: 'cake-020', slug: 'vanilla-bean', name: 'Vanilla Bean Royale', description: 'Classic vanilla sponge infused with real vanilla bean.',
    tags: ['vegetarian', 'classic'], rating: 4.5, image: 'https://as2.ftcdn.net/v2/jpg/08/92/51/85/1000_F_892518559_7EoMiCpzjawkd0YqrPS7IIkkczGChPyu.jpg', sizes: [{ label: '0.5kg', price: 18 }, { label: '1kg', price: 34 }]
  }
];
