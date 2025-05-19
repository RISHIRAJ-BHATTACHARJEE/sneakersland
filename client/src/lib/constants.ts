export const newDrops = [
  {
    image: "/products/Airforce-1.jpg",
    name: "NIKE AIRFORCE 1",
    price: 1260,
  },
  {
    image: "/products/Jordan-4-Coffee-Mocha.jpg",
    name: "Jordan 4 Coffee Mocha",
    price: 1260,
  },
  {
    image: "/products/Jordan-4-Pine-Green-RM.jpg",
    name: "Jordan 4 Pine Green RM",
    price: 1260,
  },
  {
    image: "/products/Dunk-A896.jpg",
    name: "Dunk A896",
    price: 1260,
  },
  {
    image: "/products/Airforce-1.jpg",
    name: "NIKE AIRFORCE 1",
    price: 1260,
  },
  {
    image: "/products/Sb-Dunk-X-Coca-Cola.jpg",
    name: "Sb Dunk X Coca Cola",
    price: 1260,
  },
]


export interface SneakerCategoryProps {
  id: number;
  label: string;
  image: string;
  imageAlt: string;
  align: "left" | "right";
}

export const categories: SneakerCategoryProps[] = [
  {
    id: 1
,    label: "HIGH TOPS",
    image: "/products/high-tops.png",
    imageAlt: "high-tops",
    align: "left",
  },
  {
    id: 2
,    label: "MID TOPS",
    image: "/products/mid-tops.jpg",
    imageAlt: "mid-tops",
    align: "right",
  },
  {
    id: 3
,    label: "LOW TOPS",
    image: "/products/low-tops.jpg",
    imageAlt: "low-tops",
    align: "left",
  },
  {
    id: 4
,    label: "CLASSIC\nSNEAKERS",
    image: "/products/classic-sneakers.jpg",
    imageAlt: "classic-sneakers",
    align: "right",
  },
  {
    id: 5
,    label: "PLATFORM SNEAKERS",
    image: "/products/platform-sneakers.jpg",
    imageAlt: "platform-sneakers",
    align: "left",
  },
  {
    id: 6
,    label: "LEATHER SNEAKERS",
    image: "/products/leather-sneakers.jpg",
    imageAlt: "leather-sneakers",
    align: "right",
  },
  {
    id: 7
,    label: "CANVAS SNEAKERS",
    image: "/products/canvas-sneakers.jpg",
    imageAlt: "canvas-sneakers",
    align: "left",
  },
  {
    id: 8
,    label: "MESH\nSNEAKERS",
    image: "/products/mesh-sneakers.jpg",
    imageAlt: "mesh-sneakers",
    align: "right",
  },
  {
    id: 9
,    label: "SUEDE\n SNEAKERS",
    image: "/products/suede-sneakers.jpg",
    imageAlt: "suede-sneakers",
    align: "left",
  },
  {
    id: 10,
    label: "KNIT SNEAKERS",
    image: "/products/knit-sneakers.jpg",
    imageAlt: "knit-sneakers",
    align: "right",
  },
  {
    id: 11,
    label: "HIGH TOPS",
    image: "/products/high-tops.png",
    imageAlt: "high-tops",
    align: "left",
  },
  {
    id: 12,
    label: "MID TOPS",
    image: "/products/mid-tops.jpg",
    imageAlt: "mid-tops",
    align: "right",
  },
];