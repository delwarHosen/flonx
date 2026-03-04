import { ImageSourcePropType } from "react-native";
import { IMAGE_COMPONENTS } from "../image.index";

/* ---------- Types ---------- */

export type OrderStatus = "Queued" | "Preparing" | "Served" | "Completed";

interface Order {
    name: string
    id: number
    price: number
    quantity: number
    image: string
}

export interface OrderItem {
    id: number;
    name: string;
    img: ImageSourcePropType;
    price: number;
    status: OrderStatus;
    date?: string;
    time?: string;
    quantity: number;
    orders?: Order[]
}

export interface OrderCategory {
    id: number;
    categoryName: "Current Orders" | "Past Orders";
    items?: OrderItem[];
}

/* ---------- Data ---------- */

export const orders: OrderCategory[] = [
    {
        id: 1,
        categoryName: "Current Orders",
        items: [
            {
                id: 101,
                name: "Mojito",
                img: IMAGE_COMPONENTS.item1,
                price: 13,
                status: "Queued",
                quantity: 1,

            },
            {
                id: 102,
                name: "Mojito",
                img: IMAGE_COMPONENTS.item2,
                price: 13,
                status: "Queued",
                quantity: 1,
            }
        ]
    },
    {
        id: 2,
        categoryName: "Past Orders",
        items: [
            {
                id: 201,
                name: "Mojito",
                img: IMAGE_COMPONENTS.item1,
                price: 13,
                status: "Completed",
                date: "Feb 9, 2026",
                time: "9:30 PM",
                quantity: 1,
                orders: [
                    {
                        name: "Old Fashioned",
                        id: 301,
                        price: 13,
                        quantity: 1,
                        image: IMAGE_COMPONENTS.item2,
                    },
                    {
                        name: "Old mujito",
                        id: 302,
                        price: 15,
                        quantity: 2,
                        image: IMAGE_COMPONENTS.item5,
                    },
                    {
                        name: "Old Fashion",
                        id: 303,
                        price: 18,
                        quantity: 1,
                        image: IMAGE_COMPONENTS.item5,
                    },
                ]

            },
            {
                id: 202,
                name: "Mojito",
                img: IMAGE_COMPONENTS.item2,
                price: 13,
                status: "Completed",
                date: "Feb 9, 2026",
                time: "9:30 PM",
                quantity: 1,
            },
            {
                id: 203,
                name: "Old Fashioned",
                img: IMAGE_COMPONENTS.item3,
                price: 26,
                status: "Completed",
                date: "Feb 8, 2026",
                time: "10:15 PM",
                quantity: 2,
            }
        ]
    }
];