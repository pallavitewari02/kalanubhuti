import data from './data.json';

export type Product = {
  name: string;
  slug: string;
  image: string;
  price: string;
  featured?: boolean;
};

export type Subcategory = {
  id: string;
  name: string;
  slug: string;
  desc?: string;
  image: string;
  typeOfPainting?: string[];
  products: Product[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  desc?: string;
  image: string;
  price?: string;
  featured?: boolean;
  children?: Subcategory[];
  products?: Product[];
};

export const gallery: Category[] = data;

export const products: Product[] = gallery.flatMap((category) => {
  const featuredChildren = (category.children ?? []).flatMap((child) =>
    child.products.filter((product) => product.featured),
  );
  if (!category.children?.length && category.featured && category.price) {
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
