"use client";

import React, { useState } from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input } from "../ui";
import { ItemText } from "@radix-ui/react-select";

type Item = FilterCheckboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
    className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({ title, items, defaultItems, limit = 5, searchInputPlaceholder = "Поиск...", className, onChange, defaultValue }) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const list = showAll
        ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()))
        : defaultItems?.slice(0, limit);

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }
    
    return <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {showAll && <div className="mb-5">
            <Input
                placeholder={searchInputPlaceholder}
                onChange={onChangeSearchInput}
                className="bg-gray-50 border-none" />
        </div>}

        <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
            {list.map( (item, i) => <FilterCheckbox
                key={i}
                text={item.text}
                value={item.value}
                checked={false}
                onCheckedChange={(ids) => console.log(ids)}
                endAdornment={item.endAdornment}
            />)}
        </div>

        {items.length > limit && (
            <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
                <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                    {showAll ? "Скрыть" : "+ Показать всё"}
                </button>
            </div>
        )}
    </div>
};
