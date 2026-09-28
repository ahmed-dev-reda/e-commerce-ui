"use client";

import { useAppSelector } from "@/lib/hooks";

import EmptyCart from "./(components)/empty";
import ProductsInCart from "./(components)/products";
import ShippingAddress from "./(components)/customer-details";
import Steps from "./(components)/steps";
import CartDetails from "./(components)/cart-details";
import PaymentMethod from "./(components)/payment";


type CartPageClientProps = {
  step?: string;
};

export default function CartPageClient({ step = "cart" }: CartPageClientProps) {
  const cart = useAppSelector((state) => state.cart);

  if (cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="container mx-auto py-12">
      <Steps currentStep={step} />
      <div className="flex  flex-col gap-12 md:flex-row xl:justify-center">
        {step === "cart" && <ProductsInCart />}

        {step === "shipping" && <ShippingAddress />}
        {step === "payment" && <PaymentMethod />}
        <CartDetails step={step} />
      </div>
    </section>
  );
}
