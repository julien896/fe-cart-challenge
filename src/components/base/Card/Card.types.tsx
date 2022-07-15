export interface CardProps {
    image: string;
    title: string;
    text: string;
    price: number;
    event: () => void;
    disabled: boolean;
}