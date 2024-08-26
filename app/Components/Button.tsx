import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  base: 'relative flex items-center justify-center h-fit disabled:opacity-85 disabled:cursor-not-allowed leading-none text-white',
  variants: {
    colors: {
      primary: 'bg-brand hover:[&:not(:disabled)]:bg-brand/80',
      secondary: 'bg-grayBase hover:bg-grayBase/80'
    },
    padding: {
      sm: 'p-3',
      md: 'py-5 text-lg w-full'
    },
    rounded: {
      md: 'rounded-md',
      lg: 'rounded-lg',
    }
  },
  defaultVariants: {
    color: 'primary',
    padding: 'sm',
    rounded: 'md',
  }
});

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

const Button = ({ ...props }: ButtonProps) => {
  return (
    <button className={button(props)} { ...props } />
  )
}

export default Button;