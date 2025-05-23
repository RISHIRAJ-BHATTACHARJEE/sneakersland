import type { SneakerCategoryProps } from "@/lib/constants";
import { CgArrowTopRightR } from "react-icons/cg";

const SneakerCategoryCard = ({
  label,
  image,
  imageAlt,
  align,
}: SneakerCategoryProps) => {
  const isLeft = align === "left";

  return (
    <div
      className={`bg-white shadow-xl pb-3 flex flex-col items-center border-t-8 border-zinc-500 justify-between ${
        isLeft
          ? "ml-16 md:ml-86 rounded-bl-3xl rounded-tl-[72px]"
          : "mr-16 md:mr-86 rounded-br-3xl rounded-tr-[72px]"
      }`}
    >
      <img src={image} alt={imageAlt} className="size-48 md:size-68 md:my-12" />
      <div className="flex items-center justify-between w-full px-4">
        {isLeft ? (
          <>
            <h2 className="font-semibold italic text-2xl md:text-4xl md:p-4 whitespace-pre-line">
              {label}
            </h2>
            <CgArrowTopRightR className="size-10 md:size-12" fill="#000000" />
          </>
        ) : (
          <>
            <CgArrowTopRightR className="size-10 md:size-12" fill="#000000" />
            <h2 className="font-semibold italic text-2xl md:text-4xl md:p-4 text-end whitespace-pre-line">
              {label}
            </h2>
          </>
        )}
      </div>
    </div>
  );
};

export default SneakerCategoryCard;
