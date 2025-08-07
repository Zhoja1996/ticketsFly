export interface Itickets {
    total: number;
    remaining: number;
}

export interface Iflight {
    id: string;
    airline: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    terminal: string;
    gate: string;
    tickets: Itickets;
}

export interface Seat {
    id: string;
    row: number;
    column: string;
    status: "free" | "occupied" | "selected";
}

export interface CartItem {
    id: string;
    flight: Iflight;
    selectedSeats: Seat[];
}

export interface Seat {
    id: string;
    row: number;
    column: string;
    status: "free" | "occupied" | "selected";
}

export type Cart = Iflight[];
