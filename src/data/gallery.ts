import data from './data.json';
import { publicUrl } from '../lib/publicUrl';

export type Product = {
  name: string;
  slug: string;
  image: string;
  price: string;
  featured?: boolean;
  size?: string;
  paintingType?: string;
};

export type Subcategory = {
  id: string;
  name: string;
  slug: string;
  desc?: string;
  detail?: string;
  image: string;
  typeOfPainting?: string[];
  products: Product[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  desc?: string;
  detail?: string;
  image: string;
  price?: string;
  featured?: boolean;
  children?: Subcategory[];
  products?: Product[];
};

export const gallery: Category[] = data.map((category) => ({
  ...category,
  image: publicUrl(category.image),
  children: category.children?.map((child) => ({
    ...child,
    image: publicUrl(child.image),
    products: child.products.map((product) => ({ ...product, image: publicUrl(product.image) })),
  })),
  products: category.products?.map((product) => ({ ...product, image: publicUrl(product.image) })),
}));

export const products: Product[] = gallery.flatMap((category) => {
  const featuredChildren = (category.children ?? []).flatMap((child) =>
    child.products.filter((product) => product.featured),
  );
  const featuredDirect = (category.products ?? []).filter((product) => product.featured);
  featuredChildren.push(...featuredDirect);
  if (!category.children?.length && featuredDirect.length === 0 && category.featured && category.price) {
    featuredChildren.push({
      name: category.name,
      slug: category.slug,
      image: category.image,
      price: category.price,
      featured: true,
    });
  }
  return featuredChildren;
});

export type GallerySlide = {
  name: string;
  image: string;
  artForm: string;
  detail: string;
  paintingType: string;
  price: string;
  size?: string;
};

export function gallerySlides(): GallerySlide[] {
  const buckets = new Map<string, GallerySlide[]>();
  const add = (slide: GallerySlide) => {
    const list = buckets.get(slide.artForm) ?? [];
    list.push(slide);
    buckets.set(slide.artForm, list);
  };
  for (const category of gallery) {
    if (category.id === '2') continue;
    for (const child of category.children ?? []) {
      if (!child.image) continue;
      for (const product of child.products) {
        if (!product.image) continue;
        add({
          name: product.name,
          image: product.image,
          artForm: child.name,
          detail: child.detail ?? '',
          paintingType: product.paintingType ?? '',
          price: product.price,
          size: product.size,
        });
      }
    }
    for (const product of category.products ?? []) {
      if (!product.image) continue;
      add({
        name: product.name,
        image: product.image,
        artForm: category.name,
        detail: category.detail ?? '',
        paintingType: product.paintingType ?? '',
        price: product.price,
        size: product.size,
      });
    }
  }
  const madhubani = buckets.get('Madhubani') ?? [];
  const firstIndex = madhubani.findIndex((slide) => slide.name === 'Lord Ganesha');
  const first = firstIndex >= 0 ? madhubani.splice(firstIndex, 1)[0] : undefined;
  const order = ['Madhubani', 'Lippan', 'Pichwai', 'Gond', 'Modern Contemporary'];
  const mixed: GallerySlide[] = [];
  let added = true;
  while (added) {
    added = false;
    for (const artForm of order) {
      const next = buckets.get(artForm)?.shift();
      if (!next) continue;
      mixed.push(next);
      added = true;
    }
  }
  return first ? [first, ...mixed] : mixed;
}

export function subcategoriesForType(typeName: string): Subcategory[] {
  return gallery.flatMap((category) =>
    (category.children ?? []).filter((child) => child.typeOfPainting?.includes(typeName)),
  );
}

export function pathSlug(name: string) {
  return name.replace(/[^A-Za-z0-9]/g, '');
}

export function categoryPath(category: Category) {
  return `/${category.slug}`;
}

export function artFormPath(category: Category, child: Subcategory) {
  return `${categoryPath(category)}/${child.slug}`;
}

export function paintingPath(category: Category, product: Product, child?: Subcategory) {
  return child ? `${artFormPath(category, child)}/${product.slug}` : `${categoryPath(category)}/${product.slug}`;
}

export function findCategoryBySlug(slug: string) {
  return gallery.find((category) => category.slug === slug);
}

export function findArtForm(categorySlug: string, artSlug: string) {
  const category = findCategoryBySlug(categorySlug);
  const child = category?.children?.find((item) => item.slug === artSlug);
  return category && child ? { category, child } : undefined;
}

export function findChildPainting(categorySlug: string, artSlug: string, paintingSlug: string) {
  const match = findArtForm(categorySlug, artSlug);
  const product = match?.child.products.find((item) => item.slug === paintingSlug);
  return match && product ? { ...match, product } : undefined;
}

export function findCategoryPainting(categorySlug: string, paintingSlug: string) {
  const category = findCategoryBySlug(categorySlug);
  const product = category?.products?.find((item) => item.slug === paintingSlug);
  return category && product ? { category, product } : undefined;
}

export function categoryPathById(id: string) {
  const category = gallery.find((item) => item.id === id);
  return category ? categoryPath(category) : '/';
}

export function artFormPathById(id: string) {
  for (const category of gallery) {
    const child = category.children?.find((item) => item.id === id);
    if (child) return artFormPath(category, child);
  }
  return '/';
}

export function findGallery(id: string, items: Array<Category | Subcategory> = gallery): Category | Subcategory | undefined {
  for (const item of items) {
    if (item.id === id) return item;
    if ('children' in item && item.children) {
      const match = findGallery(id, item.children);
      if (match) return match;
    }
  }
  return undefined;
}
