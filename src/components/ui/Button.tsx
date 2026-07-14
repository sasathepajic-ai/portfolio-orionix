import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

/* Sturdy tool buttons: solid ink, small radius, no motion.
   Primary hovers to the working green — never a new color. */
const buttonVariants = cva(
  "inline-flex cursor-pointer select-none items-center justify-center gap-2 font-sans font-bold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:bg-accent",
        outline: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        link: "text-accent underline decoration-1 underline-offset-4 hover:text-accent-deep hover:decoration-2",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-base",
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

export function Button({ className, variant, size, href, children, ...props }: ButtonProps) {
  const cls = cn(buttonVariants({ variant, size, className }));

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
