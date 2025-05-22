import SneakerCategoryCard from "@/components/SneakerCategoryCard";
import { categories } from "@/lib/constants";
import { useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const SneakerCategoriesCarousel = () => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handleNext = () => {
    if ((page + 1) * itemsPerPage < categories.length) {
      setDirection("right");
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setDirection("left");
      setPage((prev) => prev - 1);
    }
  };

  const currentItems = categories.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const variants = {
    enter: ({
      direction,
      index,
    }: {
      direction: "left" | "right";
      index: number;
    }) => ({
      x:
        direction === "right"
          ? index % 2 === 0
            ? 100
            : -100
          : index % 2 === 0
          ? -100
          : 100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: ({
      direction,
      index,
    }: {
      direction: "left" | "right";
      index: number;
    }) => ({
      x:
        direction === "right"
          ? index % 2 === 0
            ? -100
            : 100
          : index % 2 === 0
          ? 100
          : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="bg-gradient-to-t from-slate-400 to-slate-900 w-full pt-6 pb-12">
      <div className="flex items-center justify-between py-4 pl-7 pr-3 md:my-6">
        <h2 className="font-bold text-gray-300 text-3xl md:text-5xl">CATEGORIES</h2>
        <div className="flex gap-1 md:gap-3">
          <button onClick={handlePrev} disabled={page === 0}>
            <FiArrowLeftCircle className="md:hidden" size={36} fill="#ffffff" strokeWidth={1} />
            <FiArrowLeftCircle className="hidden md:block" size={46} fill="#ffffff" strokeWidth={1} />
          </button>
          <button
            onClick={handleNext}
            disabled={(page + 1) * itemsPerPage >= categories.length}
          >
            <FiArrowRightCircle className="md:hidden" size={36} fill="#ffffff" strokeWidth={1} />
            <FiArrowRightCircle className="hidden md:block" size={46} fill="#ffffff" strokeWidth={1} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={page}
            className="flex flex-col gap-4"
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
          >
            {currentItems.map((cat, index) => (
              <motion.div
                key={cat.id}
                custom={{ direction, index }}
                variants={variants}
                transition={{ duration: 0.6 }}
                className="my-3"
              >
                <SneakerCategoryCard {...cat} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SneakerCategoriesCarousel;
