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
        id: 1257,
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
                id: 12101,
                name: "Cocktails",
                items: [
                    {
                        id: 208741,
                        name: "Mojito",
                        img: IMAGE_COMPONENTS.item1,
                        price: 12,
                        ingredients: ["Rum", "Mint", "Lime", "Soda"],
                        status: "in_stock",
                        description: "Refreshing Cuban cocktail with mint and lime.",
                    },
                    {
                        id: 20242,
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
                id: 108742,
                name: "Beers",
                items: [
                    {
                        id: 301365,
                        name: "Heineken",
                        img:IMAGE_COMPONENTS.item1,
                        price: 8,
                        ingredients: ["Premium Lager"],
                        status: "in_stock",
                        description: "Imported smooth lager beer.",
                    },
                    {
                        id: 48601,
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
                id: 501451,
                name: "Wine",
                items: [
                    {
                        id: 608741,
                        name: "Heineken",
                        img:IMAGE_COMPONENTS.item3,
                        price: 8,
                        ingredients: ["Premium Lager"],
                        status: "in_stock",
                        description: "Imported smooth lager beer.",
                    },
                    {
                        id: 604562,
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
                id: 357545,
                name: "Wine",
                items: [
                    {
                        id: 78553,
                        name: "Heineken",
                        img:IMAGE_COMPONENTS.item5,
                        price: 8,
                        ingredients: ["Premium Lager"],
                        status: "in_stock",
                        description: "Imported smooth lager beer.",
                    },
                    {
                        id: 45454,
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
        id: 100781,
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
                id: 17855,
                name: "Wine",
                items: [
                    {
                        id: 4874,
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
                id: 28755,
                name: "Mocktails",
                items: [
                    {
                        id: 584587,
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
        id: 145002,
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
                        id: 67655468,
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
                id: 2645785,
                name: "Wines",
                items: [
                    {
                        id: 77854,
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
        id: 1003,
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
                id: 14516,
                name: "Premium Spirits",
                items: [
                    {
                        id: 84578,
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
                id: 4542,
                name: "Classic Cocktails",
                items: [
                    {
                        id: 94545,
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
        id: 1004,
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
                id: 1754556,
                name: "Island Specials",
                items: [
                    {
                        id: 108754,
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
                id: 23445,
                name: "Fresh Juices",
                items: [
                    {
                        id: 1741,
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
        id: 1005,
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
                id: 14555,
                name: "Island Specials",
                items: [
                    {
                        id: 14540,
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
                id: 2845,
                name: "Fresh Juices",
                items: [
                    {
                        id: 1123,
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
        id: 77,
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
                id: 1112,
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
                id: 70,
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
                id: 203,
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
                id: 2002,
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