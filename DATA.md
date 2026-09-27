# How to update gallery and shop data

Edit only `src/data/data.json`. The site reads that file for **My Gallery** and **Shop: Featured Products**. You do not need to change any other code.

The file is a list of categories. A category is either a group that contains subcategories, or a single item with its own price.

## Where images go

Put image files in `public/art/`, then use a path that starts with `/art/`.

Example: the file `public/art/warli.jpg` is written in the data as `"/art/warli.jpg"`.

A full web address also works, for example a Pexels link. Use one image string, not a list.

## Category

A category is one entry in the top-level list.

| Field | Required | What it does |
| --- | --- | --- |
| `id` | yes | Unique text id, such as `"4"`. Used in the page address `/category/4`. |
| `name` | yes | Name shown on the gallery card. |
| `image` | yes | Cover image. |
| `desc` | no | Short description. Safe to leave out. |
| `children` | no | List of subcategories. Leave this out when the category is a single piece. |
| `price` | no | Price shown on the category page, such as `"₹1,200"`. |
| `featured` | no | Puts this category in the shop. Used only when the category has no `children`. |

### Add a category that has subcategories

Copy this into the top-level list. Give it a new `id` that is not already used. The comma before this block matters: every category except the last one needs a comma after its closing `}`.

```json
{
  "id": "4",
  "name": "New Category",
  "image": "/art/new-category.jpg",
  "children": []
}
```

This category shows in My Gallery. Clicking or hovering it opens the subcategory slider. It does not go to the shop, even if you add `"featured": true`, because it has `children`.

### Add a category with no subcategories

Use this when the category is one piece you can price on its own, like Texture Painting.

```json
{
  "id": "4",
  "name": "New Category",
  "image": "/art/new-category.jpg",
  "price": "₹1,200"
}
```

To also show it under Shop: Featured Products, add `"featured": true`. Both `featured` and `price` are required for the shop card. `featured` is optional. If you leave it out, the category stays in the gallery only.

```json
{
  "id": "4",
  "name": "New Category",
  "image": "/art/new-category.jpg",
  "price": "₹1,200",
  "featured": true
}
```

## Subcategory

A subcategory goes inside a category’s `children` list. Indian Folk Art is a category. Madhubani, Lippan, and Warli are subcategories.

| Field | Required | What it does |
| --- | --- | --- |
| `id` | yes | Unique id, such as `"1.8"`. Used in the page address `/art/1.8`. |
| `name` | yes | Name shown in the slider and on the art page. |
| `image` | yes | Image shown in the slider. |
| `desc` | no | Short description. Safe to leave out. |
| `products` | yes | List of products. Use `[]` when there are none yet. |

### Add a subcategory

Put this object inside the parent category’s `children` array. Use the parent id plus the next number. If Indian Folk Art is `"1"` and the last child is `"1.7"`, the next id is `"1.8"`.

```json
{
  "id": "1.8",
  "name": "Kalamkari",
  "image": "/art/kalamkari.jpg",
  "products": []
}
```

The new name shows in the Indian Folk Art slider. Opening it shows the subcategory image. It does not show in the shop until you add a product with `"featured": true`.

## Product

A product goes inside a subcategory’s `products` list.

| Field | Required | What it does |
| --- | --- | --- |
| `name` | yes | Name on the product card and on the buy page. |
| `image` | yes | Product photo. |
| `price` | yes | Price text, such as `"₹2,500"`. Keep the rupee sign inside the quotes. |
| `featured` | no | `true` shows this product in Shop: Featured Products. Leave it out, or set `false`, to keep it off the shop. |

### Add a product

```json
{
  "name": "Peacock Madhubani",
  "image": "/art/peacock-madhubani.jpg",
  "price": "₹3,000",
  "featured": true
}
```

Place that object inside the right subcategory, for example Madhubani:

```json
{
  "id": "1.1",
  "name": "Madhubani",
  "image": "/art/madhubani.jpg",
  "products": [
    {
      "name": "Peacock Madhubani",
      "image": "/art/peacock-madhubani.jpg",
      "price": "₹3,000",
      "featured": true
    }
  ]
}
```

What you will see:

- The Madhubani page shows the subcategory image and this product.
- The shop shows the product because `featured` is `true`.
- Buy now opens the order form with this product name.

To keep a product on the art page but hide it from the shop, delete `featured` or set it to `false`.

## What shows in the shop

The shop lists two kinds of records:

1. A product whose `featured` is `true`.
2. A category that has no `children`, has a `price`, and has `"featured": true`.

Indian Folk Art has children, so the shop uses the products inside those children. Texture Painting has no children, so the shop can use `featured` on the category itself.

## Checklist

- Each `id` is unique across categories and subcategories.
- Every object except the last one in a list has a comma after it.
- Image paths start with `/art/` and match a file in `public/art/`, or they are a full `https://` address.
- Prices are text in quotes: `"₹2,500"`.
- A subcategory always has `"products": []` when it has no products yet.
- Save `data.json`. The dev site reloads on its own.
