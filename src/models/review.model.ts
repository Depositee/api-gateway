export interface Review {
    id: string;
    depositorId: string;
    depositeeId: string;
    rating: number;
    reviewText: string;
    createdAt: Date;
    updatedAt?: Date;
 }