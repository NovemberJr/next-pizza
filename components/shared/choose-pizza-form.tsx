"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { PizzaImage, Title, IngredientItem } from "./";
import { Button } from "../ui/button";
import { ProductVariants } from "./product-variants";
import { Ingredient, ProductItem } from "@prisma/client";
import { useSet } from "react-use";

interface Props {
    name: string;
    imageUrl: string;
    ingredients?: Ingredient[];
    items?: ProductItem[];
    onClickAdd?: VoidFunction;
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({ name, imageUrl, ingredients = [], items, onClickAdd, className }) => {
    const [size, setSize] = useState(20);
    const [type, setType] = useState(1);

    const item = items?.find(item => item.pizzaType === type && item.size === size);

    const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

    const pizzaSizes = [
        { name: "Маленькая", value: 20 },
        { name: "Средняя", value: 30 },
        { name: "Большая", value: 40 }
    ];

    const pizzaTypes = [
        { name: "Тонкая", value: 1 },
        { name: "Традиционная", value: 2 },
    ];

    useEffect(() => {
        if (!items?.some(items => items.pizzaType === type && items.size === size)) {
            const newType = items?.find(item => item.size === size)!.pizzaType;
            setType(newType || 1);
        }
    }, [size]);

    const textDetails = "30см тесто тонкое 590г";
    const totalPrice = (item?.price || 0)
        + ingredients
            .filter(item => selectedIngredients.has(item.id))
            .reduce((total, item) => total + item.price, 0);

    return <div className={cn("flex flex-1", className)}>
        <PizzaImage imageUrl={imageUrl} size={30} />

        <div className="w-[490px] bg-[#F7F6F5] p-7">
            <Title text={name} size="md" className="font-extrabold mb-1" />

            <p className="text-gray-400">{textDetails}</p>

            <div className="flex flex-col gap-4 mt-4">
                <ProductVariants
                    items={pizzaSizes}
                    value={size}
                    onClick={value => setSize(value)}
                />
                <ProductVariants
                    items={pizzaTypes.map(type => ({...type, disabled: !items?.some(item => item.pizzaType === type.value && item.size === size) }))}
                    value={type}
                    onClick={value => setType(value)}
                />
            </div>

            <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-4">
                <div className="grid grid-cols-3 gap-3">
                    {ingredients?.map((item) => (
                        <IngredientItem
                            key={item.id}
                            name={item.name}
                            imageUrl={item.imageUrl}
                            price={item.price}
                            onClick={() => toggleIngredient(item.id)}
                            active={selectedIngredients.has(item.id)}
                        />
                    ))}
                </div>
            </div>

            <Button className="h-[55px] px-10 text-base rounded-[18px] w-full">Добавить в корзину за {totalPrice} ₽</Button>
        </div>
    </div>;
}
