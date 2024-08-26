import { ComponentProps } from "react";

import { tv, VariantProps } from "tailwind-variants";

const div = tv({
    base: 'group relative flex items-center justify-center bg-gradient-to-b from-lightGreen to-lightPurple overflow-hidden',

    variants: {
        size: {
            sm: 'h-fit',
            md: 'h-[41rem] max-w-[43.5rem] max-md:h-fit',
        },
        rounded: {
          lg: 'rounded-lg',
          full: 'rounded-full'
        }
    },

    defaultVariants: {
      rounded: 'lg'
    }
});

type imageBoxProps = ComponentProps<'div'> & VariantProps<typeof div>

const ImageBox = ({ ...props }: imageBoxProps) => {
  return (
    <div {...props} className={div(props)}/>
  )
}

export default ImageBox;