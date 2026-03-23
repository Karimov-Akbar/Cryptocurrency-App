export const CoinRowMode = {
    Manage: 'manage',
    Search: 'search',
} as const;

export type CoinRowMode = typeof CoinRowMode[keyof typeof CoinRowMode];
