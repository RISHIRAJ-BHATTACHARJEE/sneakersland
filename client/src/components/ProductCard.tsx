import { Button } from "./ui/button";

interface Props {
    image: string,
    name: string,
    price: number
}

const ProductCard = ({price, image, name}: Props) => {
  return (
    <div className="flex flex-col justify-between rounded-xl w-[162px] border border-zinc-800 drop-shadow-lg shadow-lg pb-1">
        <img
          src={image}
          alt="airorce-1"
          className="size-32 rounded-lg m-4 drop-shadow-lg shadow-lg"
        />
        <h2 className="font-semibold leading-5 pb-2 text-center uppercase px-1">{name}</h2>
        <Button variant="destructive" className="mx-1">VIEW PRODUCT -<span className="text-[#FFA52F]">₹{price}</span></Button>
    </div>
  );
};

export default ProductCard;
