import { cn } from "@/lib/utils";
import React from "react";
import { IngredientItem, Title } from ".";
import { Button } from "../ui/button";
import { useSet } from "react-use";

interface Props {
    name: string;
    imageUrl: string;
    onClickAdd?: VoidFunction;
    className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({ name, imageUrl, onClickAdd, className }) => {
    const textDetails = "30см тесто тонкое 590г";
    const price = 350;

    const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

    return <div className={cn("flex flex-1", className)}>
        <div className="flex items-center justify-center flex-1 relative w-full">
            <img
                src={imageUrl}
                alt={name}
                className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
            />
        </div>

        <div className="w-[490px] bg-[#F7F6F5] p-7">
            <Title text={name} size="md" className="font-extrabold mb-1" />

            <p className="text-gray-400">{textDetails}</p>

            <Button className="h-[55px] px-10 text-base rounded-[18px] w-full">Добавить в корзину за {price} ₽</Button>
        </div>
    </div>;
}
