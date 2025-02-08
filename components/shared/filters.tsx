"use client";

import React, { useState } from "react";
import { Title, RangeSlider, CheckboxFiltersGroup } from ".";
import { Input } from "../ui";
import { useIngredients, useFilters, useFiltersQuery } from "@/hooks";

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading } = useIngredients();
    const items = ingredients.map(item => ({ text: item.name, value: item.id.toString() }));
    const limit = 6;

    const filters = useFilters();
    useFiltersQuery(filters);

    const updatePrice = ([ from, to ]: number[]) => {
        filters.updatePrice("from", from);
        filters.updatePrice("to", to);
    }

    return <div className={className}>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

        <CheckboxFiltersGroup
            title={"Тип теста"}
            name="pizzaTypes"
            items={[
                { text: "Тонкое", value: "1" },
                { text: "Традиционное", value: "2" },
            ]}
            onClickCheckbox={filters.togglePizzaType}
            selected={filters.pizzaTypes}
            className="mb-5"
        />

        <CheckboxFiltersGroup
            title={"Размеры"}
            name="sizes"
            items={[
                { text: "20 см", value: "20" },
                { text: "30 см", value: "30" },
                { text: "40 см", value: "40" },
            ]}
            onClickCheckbox={filters.toggleSize}
            selected={filters.sizes}
            className="mb-5"
        />

        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
                <Input
                    type="number"
                    placeholder="0"
                    min={0}
                    max={5000}
                    value={filters.price.from}
                    onChange={(e) => filters.updatePrice("from", Number(e.target.value))}
                />
                <Input
                    type="number"
                    placeholder="5000"
                    min={100}
                    max={5000}
                    value={filters.price.to}
                    onChange={(e) => filters.updatePrice("to", Number(e.target.value))}
                />
            </div>

            <RangeSlider
                min={0}
                max={5000}
                step={10}
                value={[filters.price.from, filters.price.to]}
                onValueChange={updatePrice}
            />
        </div>

        <CheckboxFiltersGroup
            title={"Ингридиенты"}
            name="ingredients"
            limit={limit}
            defaultItems={items.slice(0, limit)}
            items={items}
            loading={loading}
            onClickCheckbox={filters.toggleIngredient}
            selected={filters.selectedIngredients}
        />
    </div>;
};
