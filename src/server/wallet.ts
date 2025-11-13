import { instance, next } from "./base"

export const getWallet = async () => {
    const { data } = await instance().get('/v1/wallets').catch(e => next(e));
    return data?.data?.wallet;
}

export const verifyTransaction = async (values: { reference: string }) => {
    const { data } = await instance().post('/v1/wallets/verify-payment', values).catch(e => next(e));
    return data?.data;
}

export const getTransactions = async () => {
    const { data } = await instance().get('/v1/transactions', { params: { limit: 20, page: 1 }  }).catch(e => next(e));
    return data?.data;
}

export const fundAccount = async (values: { amount: string }) => {
    const { data } = await instance().post('/v1/wallets', values).catch(e => next(e));
    return data?.data;
}