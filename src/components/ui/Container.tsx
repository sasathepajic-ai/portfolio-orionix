import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
  as?: React.ElementType;
}

export function Container({
  className,
  size = "default",
  as: Component = "div",
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-4xl": size === "narrow",
          "max-w-6xl": size === "default",
          "max-w-7xl": size === "wide",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
