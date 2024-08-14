export interface StatusMapping {
    success: string | undefined;
    error: string | undefined;
    loading: boolean;
}

export interface ContactType {
    id: number;
    name: string;
    phoneNumber: string;
}
