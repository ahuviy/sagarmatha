export interface Client {
    id: string;
    firstName: string;
    lastName: string;
}

export interface ClientToAdd {
    firstName: string;
    lastName: string;
}

export interface Order {
    id: string;
    clientId: string;
    description: string;
}

export interface OrderToAdd {
    clientId: string;
    description: string;
}

export interface Db {
    clients: Client[];
    orders: Order[];
}
