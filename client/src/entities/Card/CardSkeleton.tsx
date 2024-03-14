const CardSkeleton: React.FC = () => {
  return (
    <div className="w-full relative animate-pulse">
      <div
        onClick={(e) => {
          if ((e.target as HTMLElement).closest(".favorite")) {
            e.preventDefault();
          }
        }}
        className="block w-full h-[380px] max-md:h-[200px] bg-black/40 p-5 max-md:p-2 relative"
      ></div>
      <div className="p-5 max-md:p-0">
        <div className="grid grid-cols-2 grid-rows-1 items-center max-md:justify-items-end max-md:pt-2 justify-items-center">
          <span className="font-bold text-2xl max-md:hidden w-20 h-8 bg-black/40"></span>
          <span className="font-bold text-2xl max-md:hidden w-20 h-8 bg-black/40"></span>
        </div>
      </div>
    </div>
  );
};

export { CardSkeleton };
