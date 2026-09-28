"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CreditCard } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { paymentSchema } from "@/data/schemas";
import { resetCart } from "@/lib/features/cart/cart";

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentMethod() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.selectedQuantity,
    0,
  );

  const shipping = subtotal > 0 ? 5 : 0;
  const total = subtotal + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = async (data: PaymentFormData) => {
    console.log({
      payment: data,
      items: cart.items,
      subtotal,
      shipping,
      total,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(resetCart());
    router.push("/cart?step=completed");
  };

  return (
    <section className="w-full border border-gray-200 rounded-2xl shadow-lg overflow-hidden flex-1">
      <div className="p-5 border-b">
        <div className="flex items-center gap-2">
          <CreditCard size={20} />

          <div>
            <h2 className="font-semibold">Payment Method</h2>

            <p className="text-sm text-gray-500 mt-1">
              Enter your card details to complete your order.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-6 space-y-6">
        {/* Cardholder Name */}
        <div className="space-y-2">
          <label htmlFor="cardName" className="text-sm font-medium">
            Cardholder Name
          </label>

          <input
            id="cardName"
            type="text"
            placeholder="John Doe"
            {...register("cardName")}
            className={`w-full h-11 px-3 border rounded-xl outline-none text-sm transition focus:border-black ${
              errors.cardName ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.cardName && (
            <p className="text-xs text-red-500">{errors.cardName.message}</p>
          )}
        </div>

        {/* Card Number */}
        <div className="space-y-2">
          <label htmlFor="cardNumber" className="text-sm font-medium">
            Card Number
          </label>

          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            maxLength={19}
            placeholder="1234 5678 9012 3456"
            {...register("cardNumber")}
            onChange={(e) => {
              const value = e.target.value
                .replace(/\D/g, "")
                .slice(0, 16)
                .replace(/(.{4})/g, "$1 ")
                .trim();

              e.target.value = value;
            }}
            className={`w-full h-11 px-3 border rounded-xl outline-none text-sm tracking-wider transition focus:border-black ${
              errors.cardNumber ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.cardNumber && (
            <p className="text-xs text-red-500">{errors.cardNumber.message}</p>
          )}
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-2 gap-4">
          {/* Expiry */}
          <div className="space-y-2">
            <label htmlFor="expiryDate" className="text-sm font-medium">
              Expiry Date
            </label>

            <input
              id="expiryDate"
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="MM/YY"
              {...register("expiryDate")}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");

                if (value.length > 2) {
                  value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                }

                e.target.value = value;
              }}
              className={`w-full h-11 px-3 border rounded-xl outline-none text-sm transition focus:border-black ${
                errors.expiryDate ? "border-red-500" : "border-gray-200"
              }`}
            />

            {errors.expiryDate && (
              <p className="text-xs text-red-500">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          {/* CVV */}
          <div className="space-y-2">
            <label htmlFor="cvv" className="text-sm font-medium">
              CVV
            </label>

            <input
              id="cvv"
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="123"
              {...register("cvv")}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
              }}
              className={`w-full h-11 px-3 border rounded-xl outline-none text-sm transition focus:border-black ${
                errors.cvv ? "border-red-500" : "border-gray-200"
              }`}
            />

            {errors.cvv && (
              <p className="text-xs text-red-500">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-2xl bg-black text-white hover:bg-gray-800"
          >
            Place Order
            <ArrowRight size={16} />
          </Button>
        </div>
      </form>
    </section>
  );
}
