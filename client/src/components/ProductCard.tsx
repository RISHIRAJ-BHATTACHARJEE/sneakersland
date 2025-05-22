import { Button } from "./ui/button";

interface Props {
    image: string,
    name: string,
    price: number
}

const ProductCard = ({price, image, name}: Props) => {
  return (
    <div className="flex flex-col justify-between rounded-xl w-[162px] md:w-[200px] border border-zinc-800 drop-shadow-lg shadow-lg pb-1 md:gap-2 md:mb-6">
        <img
          src={image}
          alt={name}
          className="size-32 md:size-42 rounded-lg m-4 drop-shadow-lg shadow-lg"
        />
        <h2 className="font-semibold md:text-xl leading-5 pb-2 text-center uppercase px-1 md:px-2">{name}</h2>
        <Button variant="destructive" className="mx-1 md:text-sm!">VIEW PRODUCT -<span className="text-[#FFA52F]">₹{price}</span></Button>
    </div>
  );
};

export default ProductCard;
