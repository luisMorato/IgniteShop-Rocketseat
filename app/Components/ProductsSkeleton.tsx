const ProductsSkeleton = () => {
  return (
    Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="flex flex-col gap-6 bg-transparent h-[20rem] w-[24rem] rounded-lg overflow-hidden md:h-[41rem] md:w-[43.5rem]">
        <div className="bg-grayBase animate-pulse h-[37.5rem] w-full rounded-lg"></div>
        <div className="flex items-center justify-between h-8 max-md: gap-5">
          <div className="bg-grayBase animate-pulse w-80 h-full rounded-lg"></div>
          <div className="bg-grayBase animate-pulse w-24 h-full rounded-lg"></div>
        </div>
      </div>
    ))
  )
}

export default ProductsSkeleton;