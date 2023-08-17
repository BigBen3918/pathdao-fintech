declare interface AccountSchema {
    address: string;
    balance: Record<string> | null;
    ens: { name: string | undefined; avatar: string | undefined };
}

declare interface UserDataSchema {
    email: string;
    pass: string;
}
