import data from './data.json';

export type Product = {
  name: string;
  image: string;
  price: string;
  featured?: boolean;
};

export type Subcategory = {
  id: string;
  name: string;
  desc?: string;
  image: string;
  typeOfPainting?: string[];
  products: Product[];
};

export type Category = {
  id: string;
  name: string;
  desc?: string;
  image: string;
  price?: string;
  featured?: boolean;
  children?: Subcategory[];
};

export const gallery: Category[] = data;

export const products: Product[] = gallery.flatMap((category) => {
  const featuredChildren = (category.children ?? []).flatMap((child) =>
    child.products.filter((product) => product.featured),
  );
  if (!category.children?.length && category.featured && category.price) {
    featuredChildren.push({
      name: category.name,
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
