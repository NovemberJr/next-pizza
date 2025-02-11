"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChoosePizzaForm, ChooseProductForm } from "../";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
    let isPizza;
    try {
        isPizza = Boolean(product.items[0].pizzaType);
    } catch(e) {
        isPizza = product.categoryId === 1;
    }

    return <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}>
            {isPizza ? (
                <ChoosePizzaForm name={product.name} imageUrl={product.imageUrl} ingredients={product.ingredients} />
            ) : (
                <ChooseProductForm name={product.name} imageUrl={product.imageUrl} />
            )}
        </DialogContent>
    </Dialog>;
};
