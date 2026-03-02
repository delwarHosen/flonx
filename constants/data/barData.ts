import { ImageSourcePropType } from "react-native";
import { IMAGE_COMPONENTS } from "../image.index";

/* ---------- Types ---------- */

export type BarStatus = "open" | "close";
export type ItemStatus = "in_stock" | "out_of_stock";

export interface OwnerInfo {
    name: string;
    email: string;
    phone: string;
}

export interface Item {
    id: number;
    name: string;
    img: ImageSourcePropType;
    price: number;
    ingredients: string[];
    status: ItemStatus;
    description: string;
}

export interface Category {
    id: number;
    name: string;
    items: Item[];
}

export interface Bar {
    id: number;
    name: string;
    logo: ImageSourcePropType;
    status: BarStatus;
    location: string;
    description: string;
    owner: OwnerInfo;
    categories: Category[];
}

/* ---------- Data ---------- */

export const bars: Bar[] = [
    {
        id: 1,
        name: "Midnight Lounge",
        logo: IMAGE_COMPONENTS.copperAlleyBar,
        status: "open",
        location: "Austin, Texas, USA",
        description: "Premium rooftop lounge with handcrafted cocktails.",
        owner: {
            name: "Daniel Roberts",
            email: "daniel@midnightlounge.com",
            phone: "+1 (512) 555-0199",
        },
        categories: [
            {
                id: 1,
                name: "Cocktails",
                items: [
                    {
                        id: 1,
                        name: "Mojito",
                        img: IMAGE_COMPONENTS.item1,
                        price: 12,
                        ingredients: ["Rum", "Mint", "Lime", "Soda"],
                        status: "in_stock",
                        description: "Refreshing Cuban cocktail with mint and lime.",
                    },
                    {
                        id: 2,
                        name: "Black Russian",
                        img: IMAGE_COMPONENTS.item3,
                        price: 14,
                        ingredients: ["Vodka", "Coffee Liqueur"],
                        status: "out_of_stock",
                        description: "Strong and bold coffee-flavored cocktail.",
                    },
                ],
            },
            {
                id: 2,
                name: "Beers",
                items: [
                    {
                        id: 3,
                        name: "Heineken",
                        img:IMAGE_COMPONENTS.item1,
                        price: 8,
                        ingredients: ["Premium Lager"],
                        status: "in_stock",
                        description: "Imported smooth lager beer.",
                    },
                    {
                        id: 4,
                        name: "Heineken",
                        img: IMAGE_COMPONENTS.item5,
                        price: 8,
                        ingredients: ["Premium Lager"],
                        status: "in_stock",
                        description: "Imported smooth lager beer.",
                    },
                ],
            },
            {
                id: 4,
                name: "Wine",
                items: [
                    {
                        id: 3,
                        name: "Heineken",
                        img:IMAGE_COMPONENTS.item3,
                        price: 8,
                        ingredients: ["Premium Lager"],
                        status: "in_stock",
                        description: "Imported smooth lager beer.",
                    },
                    {
                        id: 4,
                        name: "Heineken",
                        img: IMAGE_COMPONENTS.item1,
                        price: 8,
                        ingredients: ["Premium Lager"],
                        status: "in_stock",
                        description: "Imported smooth lager beer.",
                    },
                ],
            },
            {
                id: 3,
                name: "Wine",
                items: [
                    {
                        id: 3,
                        name: "Heineken",
                        img:IMAGE_COMPONENTS.item5,
                        price: 8,
                        ingredients: ["Premium Lager"],
                        status: "in_stock",
                        description: "Imported smooth lager beer.",
                    },
                    {
                        id: 4,
                        name: "Heineken",
                        img: IMAGE_COMPONENTS.item2,
                        price: 8,
                        ingredients: ["Premium Lager"],
                        status: "in_stock",
                        description: "Imported smooth lager beer.",
                    },
                ],
            },
        ],
    },

    {
        id: 2,
        name: "Sky Lounge Bar",
        logo: IMAGE_COMPONENTS.copperAlleyBar1,
        status: "close",
        location: "Dhaka, Bangladesh",
        description: "Luxury sky-high bar with city view.",
        owner: {
            name: "Rahim Ahmed",
            email: "rahim@skylounge.com",
            phone: "+880 1712-345678",
        },
        categories: [
            {
                id: 1,
                name: "Wine",
                items: [
                    {
                        id: 4,
                        name: "Blue Lagoon",
                        img: IMAGE_COMPONENTS.item4,
                        price: 10,
                        ingredients: ["Vodka", "Blue Curacao", "Lemon"],
                        status: "in_stock",
                        description: "Bright blue refreshing citrus cocktail.",
                    },
                ],
            },
            {
                id: 2,
                name: "Mocktails",
                items: [
                    {
                        id: 5,
                        name: "Virgin Mojito",
                        img: IMAGE_COMPONENTS.item5,
                        price: 6,
                        ingredients: ["Mint", "Lime", "Soda"],
                        status: "in_stock",
                        description: "Non-alcoholic fresh mint drink.",
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        name: "Ocean Breeze Bar",
        logo: IMAGE_COMPONENTS.copperAlleyBar,
        status: "open",
        location: "Miami, Florida, USA",
        description: "Beachside bar with tropical vibes and fresh cocktails.",
        owner: {
            name: "Carlos Martinez",
            email: "carlos@oceanbreeze.com",
            phone: "+1 (305) 555-2233",
        },
        categories: [
            {
                id: 1,
                name: "Tropical Cocktails",
                items: [
                    {
                        id: 6,
                        name: "Pina Colada",
                        img: IMAGE_COMPONENTS.item1,
                        price: 15,
                        ingredients: ["Rum", "Coconut Cream", "Pineapple Juice"],
                        status: "in_stock",
                        description: "Sweet tropical cocktail with coconut and pineapple.",
                    },
                ],
            },
            {
                id: 2,
                name: "Wines",
                items: [
                    {
                        id: 7,
                        name: "Chardonnay",
                        img: IMAGE_COMPONENTS.item2,
                        price: 18,
                        ingredients: ["White Wine"],
                        status: "in_stock",
                        description: "Dry white wine with fruity aroma.",
                    },
                ],
            },
        ],
    },
    {
        id: 4,
        name: "Royal Velvet Lounge",
        logo: IMAGE_COMPONENTS.copperAlleyBar1,
        status: "close",
        location: "London, UK",
        description: "Elegant luxury lounge with premium spirits.",
        owner: {
            name: "Oliver Smith",
            email: "oliver@royalvelvet.com",
            phone: "+44 7700 900123",
        },
        categories: [
            {
                id: 1,
                name: "Premium Spirits",
                items: [
                    {
                        id: 8,
                        name: "Macallan 18",
                        img: IMAGE_COMPONENTS.item5,
                        price: 40,
                        ingredients: ["Single Malt Scotch"],
                        status: "out_of_stock",
                        description: "Rich and smooth aged Scotch whisky.",
                    },
                ],
            },
            {
                id: 2,
                name: "Classic Cocktails",
                items: [
                    {
                        id: 9,
                        name: "Old Fashioned",
                        img: IMAGE_COMPONENTS.item2,
                        price: 16,
                        ingredients: ["Bourbon", "Sugar", "Bitters"],
                        status: "in_stock",
                        description: "Classic whiskey cocktail with bitters.",
                    },
                ],
            },
        ],
    },
    {
        id: 5,
        name: "Sunset Paradise Bar",
        logo: IMAGE_COMPONENTS.copperAlleyBar,
        status: "open",
        location: "Bali, Indonesia",
        description: "Relaxing sunset view bar with island drinks.",
        owner: {
            name: "Adi Putra",
            email: "adi@sunsetparadise.com",
            phone: "+62 812-3456-7890",
        },
        categories: [
            {
                id: 1,
                name: "Island Specials",
                items: [
                    {
                        id: 10,
                        name: "Mai Tai",
                        img: IMAGE_COMPONENTS.item3,
                        price: 13,
                        ingredients: ["Rum", "Orange Curacao", "Lime Juice"],
                        status: "in_stock",
                        description: "Popular tropical rum-based cocktail.",
                    },
                ],
            },
            {
                id: 2,
                name: "Fresh Juices",
                items: [
                    {
                        id: 11,
                        name: "Mango Smoothie",
                        img: IMAGE_COMPONENTS.item4,
                        price: 7,
                        ingredients: ["Fresh Mango", "Milk", "Ice"],
                        status: "in_stock",
                        description: "Freshly blended tropical mango drink.",
                    },
                ],
            },
        ],
    },
    {
        id: 6,
        name: "Sunset Paradise Bar",
        logo: IMAGE_COMPONENTS.copperAlleyBar,
        status: "open",
        location: "Bali, Indonesia",
        description: "Relaxing sunset view bar with island drinks.",
        owner: {
            name: "Adi Putra",
            email: "adi@sunsetparadise.com",
            phone: "+62 812-3456-7890",
        },
        categories: [
            {
                id: 1,
                name: "Island Specials",
                items: [
                    {
                        id: 10,
                        name: "Mai Tai",
                        img: IMAGE_COMPONENTS.item3,
                        price: 13,
                        ingredients: ["Rum", "Orange Curacao", "Lime Juice"],
                        status: "in_stock",
                        description: "Popular tropical rum-based cocktail.",
                    },
                ],
            },
            {
                id: 2,
                name: "Fresh Juices",
                items: [
                    {
                        id: 11,
                        name: "Mango Smoothie",
                        img: IMAGE_COMPONENTS.item4,
                        price: 7,
                        ingredients: ["Fresh Mango", "Milk", "Ice"],
                        status: "in_stock",
                        description: "Freshly blended tropical mango drink.",
                    },
                ],
            },
        ],
    },
    {
        id: 7,
        name: "Sunset Paradise Bar",
        logo: IMAGE_COMPONENTS.copperAlleyBar,
        status: "open",
        location: "Bali, Indonesia",
        description: "Relaxing sunset view bar with island drinks.",
        owner: {
            name: "Adi Putra",
            email: "adi@sunsetparadise.com",
            phone: "+62 812-3456-7890",
        },
        categories: [
            {
                id: 1,
                name: "Island Specials",
                items: [
                    {
                        id: 10,
                        name: "Mai Tai",
                        img: IMAGE_COMPONENTS.item3,
                        price: 13,
                        ingredients: ["Rum", "Orange Curacao", "Lime Juice"],
                        status: "in_stock",
                        description: "Popular tropical rum-based cocktail.",
                    },
                ],
            },
            {
                id: 2,
                name: "Fresh Juices",
                items: [
                    {
                        id: 11,
                        name: "Mango Smoothie",
                        img: IMAGE_COMPONENTS.item4,
                        price: 7,
                        ingredients: ["Fresh Mango", "Milk", "Ice"],
                        status: "in_stock",
                        description: "Freshly blended tropical mango drink.",
                    },
                ],
            },
        ],
    },
    {
        id: 8,
        name: "Sunset Paradise Bar",
        logo: IMAGE_COMPONENTS.copperAlleyBar,
        status: "open",
        location: "Bali, Indonesia",
        description: "Relaxing sunset view bar with island drinks.",
        owner: {
            name: "Adi Putra",
            email: "adi@sunsetparadise.com",
            phone: "+62 812-3456-7890",
        },
        categories: [
            {
                id: 1,
                name: "Island Specials",
                items: [
                    {
                        id: 10,
                        name: "Mai Tai",
                        img: IMAGE_COMPONENTS.item3,
                        price: 13,
                        ingredients: ["Rum", "Orange Curacao", "Lime Juice"],
                        status: "in_stock",
                        description: "Popular tropical rum-based cocktail.",
                    },
                ],
            },
            {
                id: 2,
                name: "Fresh Juices",
                items: [
                    {
                        id: 11,
                        name: "Mango Smoothie",
                        img: IMAGE_COMPONENTS.item4,
                        price: 7,
                        ingredients: ["Fresh Mango", "Milk", "Ice"],
                        status: "in_stock",
                        description: "Freshly blended tropical mango drink.",
                    },
                ],
            },
        ],
    },
];