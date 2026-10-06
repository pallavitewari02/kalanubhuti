import { publicUrl } from '../lib/publicUrl';

export type BlogPost = {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  intro: string;
  heading: string;
  paragraphs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'art-of-madhubani',
    title: 'The Art of Madhubani',
    image: publicUrl('/blog/madhubani.jpg'),
    imageAlt: 'Madhubani folk painting',
    intro:
      'At Kalanubhuti, every brushstroke tells a story — a story of heritage reborn through modern eyes. Our philosophy, “Handmade Tradition, Modern Expression,” celebrates the timeless beauty of Indian art forms while embracing today’s creative spirit. Among these treasures, Madhubani art stands as a radiant example — a tradition that transforms ordinary moments into extraordinary expressions of culture, devotion, and imagination.',
    heading: 'The Art of Madhubani — A Canvas of Heritage and Heart',
    paragraphs: [
      'In the quiet villages of Bihar, where stories are painted instead of written, Madhubani art blooms like poetry on walls and paper. It’s not just an art form — it’s a living tradition, passed down through generations of women who turned everyday life into timeless beauty.',
      'Originally drawn on mud walls during festivals and weddings, Madhubani paintings use natural colors made from turmeric, indigo, and flowers. The artists never leave a space empty — every inch bursts with patterns, symbols, and rhythm, echoing nature’s harmony. Fish for fertility, peacocks for love, and the sun for energy — each motif tells a story of life, devotion, and hope.',
      'What makes Madhubani so mesmerizing is its balance between simplicity and intricacy. The lines are bold, yet the details are delicate. The themes are ancient, yet the emotions feel universal. Whether it’s the divine love of Radha Krishna or the serenity of village life, every painting feels like a conversation between the artist and the viewer.',
      'Today, Madhubani has traveled far beyond Bihar — adorning fabrics, home décor, and global galleries. Yet, its soul remains rooted in the same earthy wisdom: art is not just decoration; it’s expression, identity, and prayer.',
      'For anyone who looks closely, Madhubani isn’t just color on canvas — it’s the heartbeat of tradition, whispering stories of India’s timeless artistry.',
    ],
  },
  {
    slug: 'magic-of-meenakari',
    title: 'The Magic of Meenakari',
    image: publicUrl('/blog/meenakari.jpg'),
    imageAlt: 'Meenakari enamel on metal',
    intro:
      'At Kalanubhuti, every creation is a dialogue between tradition and innovation. Our philosophy, “Handmade Tradition, Modern Expression,” celebrates India’s timeless artistry while embracing the creativity of today’s world. Among these radiant crafts, Meenakari art shines like a jewel — literally and metaphorically — weaving metal, color, and imagination into one mesmerizing form.',
    heading: 'The Magic of Meenakari — Colors That Speak Through Metal',
    paragraphs: [
      'Born in the royal ateliers of Rajasthan and Gujarat, Meenakari is the art of painting and ornamenting metal surfaces with vibrant enamel. The word “Meena” means gem, and true to its name, this craft transforms plain gold, silver, or copper into shimmering canvases of color.',
      'Each piece begins with a metal base, carefully engraved with delicate patterns. Then, powdered glass pigments are applied and fired in a kiln — a process that fuses color to metal, creating a glossy, jewel like finish. The result is breathtaking: peacocks, flowers, and paisleys dance across jewelry boxes, plates, and ornaments, glowing with life and heritage.',
      'What makes Meenakari magical is its fusion of precision and poetry. Every hue tells a story — red for passion, green for growth, blue for devotion. The artisans, often working in family workshops, pass down their secrets through generations, ensuring that each stroke carries centuries of craftsmanship.',
      'Today, Meenakari has found new expressions — adorning home décor, accessories, and even modern fashion. Yet, its essence remains unchanged: a celebration of color, culture, and creativity.',
      'At Kalanubhuti, we honor this legacy by bringing Meenakari’s brilliance into contemporary art pieces — each one handcrafted with love, echoing the spirit of India’s royal artistry.',
    ],
  },
  {
    slug: 'lippan-art',
    title: 'Lippan Art',
    image: publicUrl('/blog/lippan.jpg'),
    imageAlt: 'Lippan mud and mirror art',
    intro:
      'At Kalanubhuti, we believe that tradition is not just preserved — it is re imagined. Our motto, “Handmade Tradition, Modern Expression,” reflects how India’s timeless crafts continue to inspire contemporary creativity. Among these treasures, Lippan art stands out as a radiant example of how earth, mirror, and imagination come together to create living walls of beauty.',
    heading: 'Lippan Art — Mirrors of the Desert',
    paragraphs: [
      'In the arid landscapes of Kutch, Gujarat, where the desert sun blazes and the nights shimmer under starlight, villagers discovered a way to bring sparkle into their homes: Lippan Kaam, or mud mirror work. Traditionally, artisans used a mixture of clay and camel dung to shape motifs directly onto the walls of their houses. Small mirrors were then embedded into the patterns, catching the light and transforming humble mud walls into dazzling canvases.',
      'The motifs are deeply symbolic — peacocks, camels, elephants, and geometric mandalas — each reflecting the community’s bond with nature and daily life. What makes Lippan art magical is its ability to turn simplicity into grandeur: a handful of earth and a few mirrors become a kaleidoscope of culture.',
      'Over time, Lippan art has moved beyond village walls. Today, it adorns panels, décor pieces, and contemporary installations, bringing the rustic charm of Kutch into modern homes and galleries. Yet, its soul remains unchanged — a celebration of light, reflection, and tradition.',
      'At Kalanubhuti, we honor this craft by presenting Lippan inspired artworks that blend heritage with modern design. Each piece is a reminder that even the simplest materials can shine with extraordinary beauty when touched by human creativity.',
    ],
  },
];

export function findBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
