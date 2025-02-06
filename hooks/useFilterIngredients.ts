import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react";
import { Api } from "@/services/api-client";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
}

export const useFilterIngredients =  (): ReturnProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);

        Api.ingredients
            .getAll()
            .then(data => {
                setIngredients(data);
            }).catch(e => {
                console.log(e);
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    return { ingredients, loading };
};
