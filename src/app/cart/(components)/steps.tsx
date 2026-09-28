"use client";

import { Check } from "lucide-react";

const steps = [
  {
    id: "cart",
    name: "Shopping Cart",
  },
  {
    id: "shipping",
    name: "Shipping Address",
  },
  {
    id: "payment",
    name: "Payment Method",
  },
];

export type StepsProps = {
  currentStep: string;
};

export default function Steps({ currentStep }: StepsProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="w-full mb-8 sm:mb-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-center w-full ">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div
              key={step.id}
              className="flex items-center flex-1 last:flex-none"
            >
              {/* Step */}
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
                <div
                  className={`size-7 sm:size-8 md:size-9 rounded-full flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-medium transition shrink-0 ${
                    isCompleted || isActive
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="size-3 sm:size-3.5 md:size-4" />
                  ) : (
                    index + 1
                  )}
                </div>

                <span
                  className={`text-[10px] sm:text-xs md:text-sm whitespace-nowrap ${
                    isActive || isCompleted
                      ? "text-black font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {step.name}
                </span>
              </div>

              {/* Line */}
              {index < steps.length - 1 && (
                <div
                  className={`h-px flex-1 mx-2 sm:mx-3 md:mx-4 ${
                    index < currentIndex ? "bg-black" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
