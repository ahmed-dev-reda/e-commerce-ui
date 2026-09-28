"use client";

import { useRouter } from "next/navigation";
import { BiRightArrowAlt } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { customerSchema } from "@/data/schemas";
import { motion } from "motion/react";

type CustomerFormData = z.infer<typeof customerSchema>;

export default function CustomerDetails() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
    },
  });

  const onSubmit = (data: CustomerFormData) => {
    console.log("Customer Details:", data);

    router.push("/cart?step=payment");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 100, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 lg:w-7/12 shadow-lg border border-gray-200 p-8 rounded-2xl flex flex-col gap-8"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-xs text-gray-500 font-medium">
            Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className={`border-b py-2 outline-none text-sm ${
              errors.name ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-xs text-gray-500 font-medium">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
            {...register("email")}
            className={`border-b py-2 outline-none text-sm ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-xs text-gray-500 font-medium">
            Phone
          </label>

          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            placeholder="1234567890"
            {...register("phone")}
            className={`border-b py-2 outline-none text-sm ${
              errors.phone ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="address"
            className="text-xs text-gray-500 font-medium"
          >
            Address
          </label>

          <input
            id="address"
            type="text"
            placeholder="123 Main St, Anytown"
            {...register("address")}
            className={`border-b py-2 outline-none text-sm ${
              errors.address ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.address && (
            <p className="text-xs text-red-500">{errors.address.message}</p>
          )}
        </div>

        {/* City */}
        <div className="flex flex-col gap-1">
          <label htmlFor="city" className="text-xs text-gray-500 font-medium">
            City
          </label>

          <input
            id="city"
            type="text"
            placeholder="New York"
            {...register("city")}
            className={`border-b py-2 outline-none text-sm ${
              errors.city ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.city && (
            <p className="text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>

        {/* Continue */}
        <button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-3 rounded-2xl cursor-pointer flex items-center justify-center gap-2 mt-2"
        >
          Continue
          <BiRightArrowAlt size={20} />
        </button>
      </form>
    </motion.section>
  );
}
