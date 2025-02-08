import { useRouter } from "next/navigation";
import { useEffect } from "react";
import qs from "qs";
import { Filters } from "./use-filters";

export const useFiltersQuery = (filters: Filters) => {
    const router = useRouter();

    useEffect(() => {
        const params = {
            ...filters.price,
            pizzaTypes: Array.from(filters.pizzaTypes),
            sizes: Array.from(filters.sizes),
            ingredients: Array.from(filters.selectedIngredients)
        };

        const query = qs.stringify(params, {
            arrayFormat: "comma"
        });

        router.push(`?${query}`, {
            scroll: false
        });
    }, [ filters.selectedIngredients, filters.price, filters.sizes, filters.pizzaTypes, router ]);
};
