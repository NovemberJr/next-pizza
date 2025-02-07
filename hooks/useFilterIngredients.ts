import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react";
import { Api } from "@/services/api-client";
import { useSet } from "react-use";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIds: Set<string>;
    onAddingId: (id: string) => void;
}

export const useFilterIngredients =  (): ReturnProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedIds, { toggle }] = useSet(new Set<string>([]));
    
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

    return { ingredients, loading, selectedIds, onAddingId: toggle };
};
