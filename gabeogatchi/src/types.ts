export enum pageState {
    "idle",
    "loading",
    "error",
    "success"
}

export interface serverResponse{
    success: boolean,
    payload: any
}

export interface item{
    id: string;
    title: string;
    subtitle: string;
    imgLink: string;
    cost: number;
    owned: boolean;
    isPremium?: boolean;
    rarity?: string;
}

export interface game{
    title: string;
    description: string;
    slug: string;
    imgLink: string;
}
