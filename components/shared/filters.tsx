"use client";

import React, { useState } from "react";
import { Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from ".";
import { Input } from "../ui";
import { FilterCheckboxProps } from "./filter-checkbox";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading } = useFilterIngredients();
    const defaultIngredients = ingredients.map(item => ({ text: item.name, value: item.id.toString() })).slice(0,6);
    
    return <div className={className}>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

        <div className="flex flex-col gap-4">
            <FilterCheckbox text="Можно собирать" value="1" />
            <FilterCheckbox text="Новинки" value="2" />
        </div>

        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
                <Input type="number" placeholder="0" min={0} max={5000} defaultValue={0} />
                <Input type="number" placeholder="5000" min={100} max={5000} />

            </div>

            <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
        </div>

        <CheckboxFiltersGroup
            title={"Ингридиенты"}
            limit={6}
            defaultItems={defaultIngredients}
            items={[...defaultIngredients, ...defaultIngredients]}
            loading={loading}
        />
    </div>;
};
