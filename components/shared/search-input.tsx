"use client";

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";

interface Props {
    className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
    const [focused, setFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const ref = useRef(null);

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(
        async () => {
            try {
                setProducts(await Api.products.search(searchQuery));
            } catch(e) {
                console.log(e);
            }
        }, 250, [searchQuery]
    );

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery("");
        setProducts([]);
    };
    
    return <>
        {focused && <div className="fixed inset-0 bg-black/50 z-30"/>}
        <div ref={ref} className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)}>
            <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
            <input
                className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                type="text"
                placeholder="Найти"
                onFocus={() => setFocused(true)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {products.length > 0 && <div className={cn(
                "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
                focused && "visible opacity-100 top-12"
            )}>
                {products.map(product => (
                    <Link
                        key={product.id}
                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 cursor-pointer"
                        href={`/product/${product.id}`}
                        onClick={onClickItem}
                    >
                        <img
                            className="h-8 w-8"
                            src={product.imageUrl}
                            alt={product.name}
                        />
                        <span>{product.name}</span>
                    </Link>
                ))}
            </div>}
        </div>
    </>;
};
