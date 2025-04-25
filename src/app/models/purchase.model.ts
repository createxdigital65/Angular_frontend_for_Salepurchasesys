export interface Purchase {
    id: number;
    userId: number;
    purchaseDate: string; // was `createdAt`
    totalAmount: number;
    status: string;

}
