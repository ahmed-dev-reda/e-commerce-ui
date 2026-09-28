"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
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
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
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
    <motion.section
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex-1 overflow-hidden rounded-2xl border border-gray-200 shadow-lg"
    >
      <div className="border-b p-5">
        <div className="flex items-center gap-2">
          <CreditCard size={20} />

          <div>
            <h2 className="font-semibold">Payment Method</h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter your card details to complete your order.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-5 sm:p-6">
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
            className={`h-11 w-full rounded-xl border px-3 text-sm outline-none transition focus:border-black ${
              errors.cardName ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.cardName && (
            <p className="text-xs text-red-500">
              {errors.cardName.message}
            </p>
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

              setValue("cardNumber", value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            className={`h-11 w-full rounded-xl border px-3 text-sm tracking-wider outline-none transition focus:border-black ${
              errors.cardNumber ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.cardNumber && (
            <p className="text-xs text-red-500">
              {errors.cardNumber.message}
            </p>
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
                let value = e.target.value.replace(/\D/g, "").slice(0, 4);

                if (value.length > 2) {
                  value = `${value.slice(0, 2)}/${value.slice(2)}`;
                }

                setValue("expiryDate", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              className={`h-11 w-full rounded-xl border px-3 text-sm outline-none transition focus:border-black ${
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
                const value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 4);

                setValue("cvv", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              className={`h-11 w-full rounded-xl border px-3 text-sm outline-none transition focus:border-black ${
                errors.cvv ? "border-red-500" : "border-gray-200"
              }`}
            />

            {errors.cvv && (
              <p className="text-xs text-red-500">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="flex-1 rounded-2xl bg-black text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Place Order"}
            <ArrowRight size={16} />
          </Button>
        </div>
      </form>
    </motion.section>
  );
}
