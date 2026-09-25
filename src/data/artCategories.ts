export type Painting = {
  id: string;
  title: string;
  image: string;
};

export type ArtForm = {
  slug: string;
  name: string;
  image: string;
  paintings: Painting[];
};

export type ArtCategory = {
  id: string;
  name: string;
  coverImage: string;
  forms: ArtForm[];
};

export type CategoryRecord = {
  id: string;
  name: string;
  coverImage: string;
};

export type ArtFormRecord = {
  slug: string;
  name: string;
  image: string;
  categoryId: string;
};

export type PaintingRecord = {
  id: string;
  title: string;
  image: string;
  artFormSlug: string;
};

export const categories: CategoryRecord[] = [
  { id: 'indian-folk-art', name: 'Indian Folk Art', coverImage: '/art/indian-folk-art.jpg' },
  { id: 'texture-painting', name: 'Texture Painting', coverImage: '/art/texture-painting.jpg' },
  { id: 'modern-contemporary', name: 'Modern Contemporary', coverImage: '/art/modern-contemporary.jpg' },
];

export const artForms: ArtFormRecord[] = [
  { slug: 'madhubani', name: 'Madhubani', image: '/art/madhubani.jpg', categoryId: 'indian-folk-art' },
  { slug: 'lippan', name: 'Lippan', image: '/art/lippan.jpg', categoryId: 'indian-folk-art' },
  { slug: 'meenakari', name: 'Meenakari', image: '/art/meenakari.jpg', categoryId: 'indian-folk-art' },
  { slug: 'pichwai', name: 'Pichwai', image: '/art/pichwai.jpg', categoryId: 'indian-folk-art' },
  { slug: 'rajasthani', name: 'Rajasthani', image: '/art/rajasthani.jpg', categoryId: 'indian-folk-art' },
  { slug: 'gond', name: 'Gond', image: '/art/gond.jpg', categoryId: 'indian-folk-art' },
  { slug: 'warli', name: 'Warli', image: '/art/warli.jpg', categoryId: 'indian-folk-art' },
];

export const paintings: PaintingRecord[] = [];

export const artCategories: ArtCategory[] = categories.map((category) => ({
  id: category.id,
  name: category.name,
  coverImage: category.coverImage,
  forms: artForms
    .filter((form) => form.categoryId === category.id)
    .map((form) => ({
      slug: form.slug,
      name: form.name,
      image: form.image,
      paintings: paintings
        .filter((painting) => painting.artFormSlug === form.slug)
        .map(({ id, title, image }) => ({ id, title, image })),
    })),
}));

export function findArtFormBySlug(slug: string): ArtForm | undefined {
  for (const category of artCategories) {
    const form = category.forms.find((item) => item.slug === slug);
    if (form) return form;
  }
  return undefined;
}

export function findCategoryById(id: string): ArtCategory | undefined {
  return artCategories.find((category) => category.id === id);
}
