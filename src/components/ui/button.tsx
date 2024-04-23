import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    'group rounded-md inline-flex items-center justify-center whitespace-nowrap',
    'text-xs font-normal',
    'focus-visible:outline-none focus-visible:ring-1',
    'outline-none transition-all [&>svg]:transition-all duration-200 ease-out',
    'focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&>svg]:fill-foreground'
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        outline: 'border-2 bg-transparent',
        ghost: '',
        link: 'underline-offset-4 hover:underline',
        icon: '',
      },
      size: {
        default: 'size-10 min-w-10 [&>svg]:size-4',
        xs: 'h-6 px-2.5 text-xs [&>svg]:size-3',
        sm: 'h-8 px-3 text-xs  [&>svg]:size-5',
        lg: 'h-10 px-5 text-xs  [&>svg]:size-5',
        xl: 'h-12 px-6 text-sm [&>svg]:size-5',
        full: 'h-10 w-full px-5 text-xs  [&>svg]:size-5',
      },
      color: {
        default: '',
        secondary: '',
        success: '',
        muted: '',
        muted10: '',
        destructive: '',
      },
    },
    compoundVariants: [
      // Default (solid) variants
      {
        variant: 'default',
        color: 'default',
        class: 'bg-primary text-white active:bg-primary/80 [&>svg]:fill-white',
      },
      {
        variant: 'default',
        color: 'success',
        class: 'bg-success text-white hover:bg-success-80  active:bg-success [&>svg]:fill-white',
      },
      {
        variant: 'default',
        color: 'muted',
        class:
          'bg-muted text-foreground-secondary hover:bg-muted-80 active:bg-muted [&>svg]:fill-white',
      },
      {
        variant: 'default',
        color: 'muted10',
        class:
          'bg-muted-10 text-foreground hover:bg-muted-20 [&>svg]:fill-foreground [&>svg]:text-foreground',
      },
      {
        variant: 'default',
        color: 'destructive',
        class:
          'bg-destructive text-white hover:bg-destructive-80  active:bg-destructive [&>svg]:fill-white',
      },
      {
        variant: 'default',
        color: 'secondary',
        class: 'bg-secondary text-foreground hover:bg-secondary-80  [&>svg]:fill-foreground',
      },
      // Outline variants
      {
        variant: 'outline',
        color: 'default',
        class:
          'border-primary-border text-primary-foreground hover:bg-primary-20 active:bg-transparent disabled:text-primary-foreground-50',
      },
      {
        variant: 'outline',
        color: 'success',
        class:
          'border-success-border text-success-foreground hover:bg-success-20 active:bg-transparent disabled:text-success-foreground-50',
      },
      {
        variant: 'outline',
        color: 'destructive',
        class:
          'border-destructive-border text-destructive-foreground hover:bg-destructive-20 active:bg-transparent disabled:text-destructive-foreground-50',
      },
      {
        variant: 'outline',
        color: 'secondary',
        class:
          'border-muted-5 text-foreground hover:bg-secondary-20 active:bg-transparent disabled:text-secondary-foreground-50 [&>svg]:fill-foreground',
      },
      // Ghost variants
      {
        variant: 'ghost',
        color: 'default',
        class:
          'text-primary-foreground hover:bg-primary-20 active:bg-transparent disabled:text-primary-foreground-50',
      },
      {
        variant: 'ghost',
        color: 'success',
        class:
          'text-success-foreground hover:bg-success-20 active:bg-transparent disabled:text-success-foreground-50',
      },
      {
        variant: 'ghost',
        color: 'destructive',
        class:
          'text-destructive-foreground hover:bg-destructive-20 active:bg-transparent disabled:text-destructive-foreground-50',
      },
      {
        variant: 'ghost',
        color: 'secondary',
        class:
          'text-secondary-foreground hover:bg-secondary-20 active:bg-transparent  disabled:text-secondary-foreground-50',
      },
      // Link variants
      {
        variant: 'link',
        color: 'default',
        class: 'text-primary',
      },
      {
        variant: 'link',
        color: 'success',
        class: 'text-success',
      },
      {
        variant: 'link',
        color: 'destructive',
        class: 'text-destructive',
      },
      {
        variant: 'link',
        color: 'secondary',
        class: 'text-secondary hover:text-secondary/90',
      },
      // Icon variants
      {
        variant: 'icon',
        color: 'default',
        class: 'size-10 min-w-10 [&>svg]:size-4 bg-muted-10 text-foreground hover:bg-muted-20 [&>svg]:fill-foreground [&>svg]:text-foreground'
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      color: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?: 'success' | 'destructive' | 'secondary' | 'muted' | 'muted10' | 'default';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, color, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button"

export { Button, buttonVariants }
