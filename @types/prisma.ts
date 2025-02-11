import { Product, ProductItem, Ingredient } from "@prisma/client";

export type ProductWithRelations = Product & { items: ProductItem[]; ingredients: Ingredient[] };
