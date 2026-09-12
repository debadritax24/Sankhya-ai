import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#080D2B] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#080D2B] text-text-inverse hover:bg-primary-light",
        destructive: "bg-[#9B3B3B] text-text-inverse hover:bg-red-700",
        outline: "border border-[#8D837A] bg-white hover:bg-[#FCFBF8] text-[#77746F]",
        secondary: "bg-[#F7F6F3] text-[#080D2B] hover:bg-[#DDDAD4]",
        ghost: "hover:bg-[#F7F6F3] text-[#77746F]",
        link: "text-[#080D2B] underline-offset-4 hover:underline",
        accent: "bg-accent text-text-inverse hover:bg-accent-dark",
        success: "bg-[#4A7C59] text-text-inverse hover:bg-success-dark",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
