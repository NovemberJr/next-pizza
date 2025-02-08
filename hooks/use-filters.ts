import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";

interface PriceRange {
    from: number;
    to: number;
}

export interface Filters {
    pizzaTypes: Set<string>;
    sizes: Set<string>;
    price: PriceRange;
    selectedIngredients: Set<string>;
}

interface ReturnProps extends Filters {
    togglePizzaType: (key: string) => void;
    toggleSize: (key: string) => void;
    updatePrice: (key: keyof PriceRange, value: number) => void;
    toggleIngredient: (key: string) => void;
}


export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams();

    const [ pizzaTypes, { toggle: togglePizzaType } ] = useSet(
        new Set<string>(searchParams.get("pizzaTypes")?.split(",") ?? [])
    );

    const [ sizes, { toggle: toggleSize } ] = useSet(
        new Set<string>(searchParams.get("sizes")?.split(",") ?? [])
    );

    const [ price, setPrice ] = useState<PriceRange>({
        from: Number(searchParams.get("from")) || 0,
        to: Number(searchParams.get("to")) || 5000,
    });

    const [ selectedIngredients, { toggle: toggleIngredient } ] = useSet(
        new Set<string>(searchParams.get("ingredients")?.split(",") ?? [])
    );

    const updatePrice = (key: keyof PriceRange, value: number) => {
        setPrice(prev => ({ ...prev, [key]: value }));
    };

    return {
        pizzaTypes,
        sizes,
        price,
        selectedIngredients,
        togglePizzaType,
        toggleSize,
        updatePrice,
        toggleIngredient
    };
};
