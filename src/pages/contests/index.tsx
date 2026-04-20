/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Button from "../../library/Button";
import { useQuery } from "react-query";
import { IPool } from "../../type";
import { currencyFormatter, getCustomerDetails } from "../../utils/shared";
import Loading from "../../components/Loading";
import Input from "../../library/Input";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import JoinContest from "../../components/modals/JoinContest";
import { fetchPools } from "../../server/pools";

const Challenges = () => {
  const navigate = useNavigate();
  const customer = getCustomerDetails();
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery<IPool[]>(["contest", search], () =>
    fetchPools(search, 'personal')
  );

  const debouncedSearch = useCallback(
    debounce((val: string) => {
      setSearch(val);
    }, 300), // Adjust the debounce delay as needed
    []
  );

  const onSearch = (val: string) => {
    debouncedSearch(val);
  };

  return (
    <Layout>
      <div className="flex justify-between">
        <h3 className="text-[22px] leading-[28px] font-bold mb-10">Pools</h3>
        <div className="flex gap-3">
          <Button
            size="small"
            color="orange"
            onClick={() => navigate("/create-pool")}
            className="w-[120px]"
          >
            Create Pool
          </Button>
        </div>
      </div>

      <div className="my-7">
        <Input
          value={search}
          placeholder="Search by name"
          // placeholder="Search by name or invitation code"
          className="h-[50px] bg-white"
          onChange={(val) => onSearch(val.target.value)}
        />      
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-10 mb-20">
            {data?.map((contest) => (
              <div className="rounded-3xl p-5 bg-white my-5 border-[1px] border-gray-200" key={contest._id}>
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-xl text-black">{contest.name}</h2>
                    <p className="text-xs italic text-black">
                      {contest.config.amount
                        ? `Join with ${currencyFormatter(
                            contest.config.amount,
                            "NGN"
                          )}`
                        : "Join for free"}
                    </p>
                  </div>

                  {String(contest.createdBy._id) === String(customer._id) && (
                    <Button
                      size="small"
                      color="danger"
                      className="sm:w-[90px] w-[65px]"
                      onClick={() => navigate(`/pool-view/${contest.name}/${contest._id}`)}
                    >
                      View
                    </Button>
                  )}
                </div>
                <p className="mt-4 text-black text-sm">
                  {contest.description ||
                    "No description provided for this contest."}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <JoinContest />
    </Layout>
  );
};

export default Challenges;
