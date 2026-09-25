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

const pexels = (id: number, h = 650, w = 940) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&h=${h}&w=${w}`;

function gallery(slug: string, name: string, ids: number[]): Painting[] {
  return ids.map((id, index) => ({
    id: `${slug}-${index + 1}`,
    title: `${name} ${index + 1}`,
    image: pexels(id),
  }));
}

export const artCategories: ArtCategory[] = [
  {
    id: 'indian-folk-art',
    name: 'Indian Folk Art',
    coverImage: pexels(29625840),
    forms: [
      {
        slug: 'madhubani',
        name: 'Madhubani',
        image: pexels(29625840),
        paintings: gallery('madhubani', 'Madhubani', [29625840, 22820070, 22820069, 22820076, 368727, 9609267]),
      },
      {
        slug: 'warli',
        name: 'Warli',
        image: pexels(22820070),
        paintings: gallery('warli', 'Warli', [22820070, 29625840, 368727, 22820069, 9609267, 22820076]),
      },
      {
        slug: 'lippan',
        name: 'Lippan',
        image: pexels(22820076),
        paintings: gallery('lippan', 'Lippan', [22820076, 22820069, 29625840, 9609267, 22820070, 368727]),
      },
      {
        slug: 'gond',
        name: 'Gond',
        image: pexels(22820069),
        paintings: gallery('gond', 'Gond', [22820069, 368727, 22820076, 29625840, 22820070, 9609267]),
      },
      {
        slug: 'rajasthani',
        name: 'Rajasthani',
        image: pexels(368727),
        paintings: gallery('rajasthani', 'Rajasthani', [368727, 22820070, 29625840, 22820076, 22820069, 9609267]),
      },
      {
        slug: 'pichwai',
        name: 'Pichwai',
        image: pexels(9609267),
        paintings: gallery('pichwai', 'Pichwai', [9609267, 22820076, 22820069, 368727, 29625840, 22820070]),
      },
      {
        slug: 'meenakari',
        name: 'Meenakari',
        image: pexels(22820069),
        paintings: gallery('meenakari', 'Meenakari', [22820069, 29625840, 9609267, 22820070, 22820076, 368727]),
      },
    ],
  },
  {
    id: 'texture-painting',
    name: 'Texture Painting',
    coverImage: pexels(9609267),
    forms: [],
  },
  {
    id: 'modern-contemporary',
    name: 'Modern Contemporary Painting',
    coverImage: pexels(368727),
    forms: [],
  },
];

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
