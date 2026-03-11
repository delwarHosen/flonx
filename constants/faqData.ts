export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export const FAQ_DATA_STORE = {
    customer: [
        { id: '1', question: 'Do I need an account to place an order?', answer: "No. You can place an order as a guest by scanning a bar's QR code." },
        { id: '2', question: 'How do tips work?', answer: 'Tips are added at checkout. You can choose a percentage or enter a custom amount.' },
        { id: '3', question: 'Can I cancel my order?', answer: 'Orders can be cancelled within 2 minutes of placing them.' },
    ],
    bartender: [
        { id: '1', question: 'How do I accept an order?', answer: 'New orders appear in your dashboard; just tap "Accept" to start.' },
        { id: '2', question: 'How to manage inventory?', answer: 'Go to the inventory tab to toggle drink availability.' },
        { id: '3', question: 'Where can I see my earnings?', answer: 'Your total tips and earnings are available in the "Earnings" section.' },
    ]
};