import { IPool } from "../type";
import { instance, next } from "./base";

export const createPool = async (values: Partial<IPool>) => {
  const { data } = await instance()
    .post("/v1/pools", values)
    .catch((e) => next(e));
  return data?.data;
};

export const joinPool = async (values: { poolId: string }) => {
  const { data } = await instance()
    .post("/v1/pool-members", values)
    .catch((e) => next(e));
  return data?.data;
};

export const joinPoolWithCode = async (values: { code: string }) => {
  const { data } = await instance()
    .post("/v1/pool-members", values)
    .catch((e) => next(e));
  return data?.data;
};

export const fetchPools = async (search: string) => {
  const { data } = await instance()
    .get("/v1/pools", { params: { name: search } })
    .catch((e) => next(e));
  return data?.data?.docs;
};

export const getSinglePool = async (id: string) => {
  const { data } = await instance()
    .get(`/v1/pools/${id}`,)
    .catch((e) => next(e));
  return data?.data;
};

export const fetchLeaderboard = async (competition: string, pool: string) => {
  const { data } = await instance()
    .get(`/v1/predictions`, { params: { competition, pool } })
    .catch((e) => next(e));
  return data?.data;
};