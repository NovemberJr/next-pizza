"use client";

import React, { useState } from "react";
import { Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from ".";
import { Input } from "../ui";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";

interface Props {
    className?: string;
}

interface PriceRange {
    from: number;
    to: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading, selectedIds, onAddingId } = useFilterIngredients();
    const [price, setPrice] = useState<PriceRange>({ from: 0, to: 5000 });
    
    const items = ingredients.map(item => ({ text: item.name, value: item.id.toString() }));
    const limit = 6;

    const updatePrice = (key: keyof PriceRange, value: number) => {
        setPrice({ ...price, [key]: value });
    }

    return <div className={className}>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

        <div className="flex flex-col gap-4">
            <FilterCheckbox text="Можно собирать" value="1" name="" />
            <FilterCheckbox text="Новинки" value="2" name="" />
        </div>

        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
                <Input type="number" placeholder="0" min={0} max={5000} defaultValue={0} value={price.from} onChange={(e) => updatePrice("from", Number(e.target.value))} />
                <Input type="number" placeholder="5000" min={100} max={5000} value={price.to} onChange={(e) => updatePrice("to", Number(e.target.value))} />
            </div>

            <RangeSlider min={0} max={5000} step={10} value={[price.from, price.to]} onValueChange={([from, to]) => setPrice({ from, to })} />
        </div>

        <CheckboxFiltersGroup
            title={"Ингридиенты"}
            name="ingredients"
            limit={limit}
            defaultItems={items.slice(0, limit)}
            items={items}
            loading={loading}
            onClickCheckbox={onAddingId}
            selectedIds={selectedIds}
        />
    </div>;
};
