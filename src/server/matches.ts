import { IPrediction } from "../type";
import { instance, next } from "./base"

export const getMatches = async (competition: string) => {
    const { data } = await instance().get('/v1/matches', { params: { competition } }).catch(e => next(e));
    return data?.data;
}

export const fetchUserCompetition = async () => {
    const { data } = await instance().get('/v1/user-competitions').catch(e => next(e));
    return data?.data?.docs;
}

export const addUserCompetition = async (values: { competitionId: string }) => {
    const { data } = await instance().post('/v1/user-competitions', values).catch(e => next(e));
    return data?.data;
}

export const fetchCompetition = async () => {
    const { data } = await instance().get('/v1/competitions').catch(e => next(e));
    return data?.data;
}

export const predict = async (values: Partial<IPrediction>) => {
    const { data } = await instance().post('/v1/predictions', values).catch(e => next(e));
    return data?.data?.docs;
}