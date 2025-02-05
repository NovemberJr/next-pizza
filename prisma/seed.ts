import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";
import { categories, ingredients, products } from "./constants";
import { Prisma } from "@prisma/client";

const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const generateProductItem = ({ productId, pizzaType, size }: {
    productId: number;
    pizzaType?: number;
    size?: number;
}) => {
    return {
        productId,
        price: randomNumber(19, 60) * 10,
        pizzaType,
        size
    } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {

    await prisma.user.createMany({
        data: [
            {
                fullName: "User",
                email: "user@test.com",
                password: hashSync("123456", 10),
                role: "USER",
                verified: new Date()
            },
            {
                fullName: "Admin",
                email: "admin@test.com",
                password: hashSync("123456", 10),
                role: "ADMIN",
                verified: new Date()
            }
        ]
    })

    await prisma.category.createMany({
        data: categories
    });

    await prisma.ingredient.createMany({
        data: ingredients
    });

    await prisma.product.createMany({
        data: products
    });

    const pizza1 = await prisma.product.create({
        data: {
            name: "Пепперони фреш",
            imageUrl: "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5)
            }
        }
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: "Сырная",
            imageUrl: "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10)
            }
        }
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: "Чоризо фреш",
            imageUrl: "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 15)
            }
        }
    });

    await prisma.productItem.createMany({
        data: [
            generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

            generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

            generateProductItem({ productId: 1 }),
            generateProductItem({ productId: 2 }),
            generateProductItem({ productId: 3 }),
        ]
    });

    await prisma.cart.createMany({
        data: [
            {
                token: crypto.randomUUID(),
                userId: 1,
                totalPrice: 0,
            },
            {
                token: crypto.randomUUID(),
                userId: 2,
                totalPrice: 0
            }
        ]
    });

    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{id: 1}, {id: 2}, {id: 3}]
            }
        }
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
}

async function main() {
    try {
        await down();
        await up();
    } catch(e) {
        console.log(e);
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
});
