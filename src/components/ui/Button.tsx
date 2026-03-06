import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98] group",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent shadow-sm hover:shadow-md hover:-translate-y-px",
        secondary:
          "bg-navy text-text-inverse hover:bg-navy-light focus-visible:ring-navy shadow-sm hover:shadow-md hover:-translate-y-px",
        outline:
          "border-2 border-navy/20 text-text-primary hover:border-navy hover:bg-navy hover:text-text-inverse focus-visible:ring-navy",
        ghost:
          "text-text-secondary hover:text-text-primary hover:bg-bg-alt focus-visible:ring-navy",
        teal:
          "bg-teal text-white hover:bg-teal-hover focus-visible:ring-teal shadow-sm hover:shadow-md hover:-translate-y-px",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded gap-1.5",
        md: "h-11 px-6 text-sm rounded gap-2",
        lg: "h-12 px-8 text-[0.9375rem] rounded gap-2",
        xl: "h-13 px-9 text-base rounded gap-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    if (href) {
      const isExternal = href.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            className={cn(buttonVariants({ variant, size, className }))}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
