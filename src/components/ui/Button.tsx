"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { forwardRef, useState } from "react";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const springPress = { type: "spring" as const, stiffness: 500, damping: 28, mass: 0.75 };

interface RippleItem { id: number; x: number; y: number }

function RippleLayer({ ripples }: { ripples: RippleItem[] }) {
  return (
    <>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          aria-hidden
          className="absolute pointer-events-none rounded-full"
          style={{
            left: r.x,
            top: r.y,
            transform: "translate(-50%,-50%)",
            background: "rgba(255,255,255,0.18)",
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 260, height: 260, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </>
  );
}

const buttonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none group",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent shadow-sm hover:shadow-md",
        secondary:
          "bg-navy text-text-inverse hover:bg-navy-light focus-visible:ring-navy shadow-sm hover:shadow-md dark:bg-text-primary dark:text-bg dark:hover:bg-text-primary/90 dark:focus-visible:ring-text-primary",
        outline:
          "border-2 border-border-light text-text-primary hover:border-navy hover:bg-navy hover:text-text-inverse focus-visible:ring-navy dark:hover:border-border dark:hover:bg-bg-card dark:hover:text-text-primary",
        ghost:
          "text-text-secondary hover:text-text-primary hover:bg-bg-alt focus-visible:ring-navy",
        teal:
          "bg-teal text-white hover:bg-teal-hover focus-visible:ring-teal shadow-sm hover:shadow-md",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-full gap-1.5",
        md: "h-11 px-6 text-sm rounded-full gap-2",
        lg: "h-12 px-8 text-[0.9375rem] rounded-full gap-2",
        xl: "h-13 px-9 text-base rounded-full gap-2",
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

/**
 * React's HTML drag/animation event handler types conflict with Framer Motion's
 * overloaded signatures for the same event names. Strip them so motion.button
 * accepts the spread without TypeScript errors.
 */
type MotionSafeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
  | "onAnimationStartCapture" | "onAnimationEndCapture" | "onAnimationIterationCapture"
  | "onDrag" | "onDragCapture" | "onDragStart" | "onDragStartCapture"
  | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture"
  | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture"
  | "onDragOver" | "onDragOverCapture"
>;

// Only solid-colour variants get the lift + ripple treatment
const SOLID_VARIANTS = new Set(["primary", "secondary", "teal"]);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...allProps }, ref) => {
    // Cast away the event handler types that conflict with Framer Motion's signatures
    const props = allProps as MotionSafeButtonProps;
    const [ripples, setRipples] = useState<RippleItem[]>([]);
    const cls = cn(buttonVariants({ variant, size, className }));
    const isSolid = SOLID_VARIANTS.has(variant ?? "primary");

    function addRipple(e: React.MouseEvent<HTMLElement>) {
      if (!isSolid) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const id = performance.now();
      setRipples((prev) => [
        ...prev,
        { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
      ]);
      setTimeout(
        () => setRipples((prev) => prev.filter((r) => r.id !== id)),
        650
      );
    }

    // Use a hover state to control y so it doesn't drop down while hovered
    const motionProps = {
      whileTap: { scale: 0.96 },
      transition: springPress,
    };

    if (href) {
      if (href.startsWith("http")) {
        return (
          <motion.a
            href={href}
            className={cls}
            target="_blank"
            rel="noopener noreferrer"
            onMouseDown={addRipple}
            {...motionProps}
          >
            {isSolid && <RippleLayer ripples={ripples} />}
            {children}
          </motion.a>
        );
      }
      return (
        <MotionLink
          href={href}
          className={cls}
          onMouseDown={addRipple}
          {...motionProps}
        >
          {isSolid && <RippleLayer ripples={ripples} />}
          {children}
        </MotionLink>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={cls}
        onMouseDown={addRipple}
        {...motionProps}
        {...props}
      >
        {isSolid && <RippleLayer ripples={ripples} />}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
