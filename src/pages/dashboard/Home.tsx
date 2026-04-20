/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";

import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { fetchUserCompetition, getMatches } from "../../server/matches";
import { useEffect, useState } from "react";
import MatchList from "../../components/shared/MatchList";
import { format } from "date-fns";
import WorldCupBanner from "../../assets/feature-image.png";
import { ICompetition, IMatch } from "../../type";
import AddCompetition from "../../components/modals/AddCompetition";
import Livescores from "../../components/shared/Livescores";
import WorldCupIncentive from "../../components/modals/WorldCupIncentive";
import useAppStore from "../../utils/appStore";

const Home = () => {
  const [competitionId, setCompetitionId] = useState(
    "6913e827e79d97136980f773",
  );

  const [competition, setCompetition] = useState(0);
  const { data: competitions } = useQuery<ICompetition[]>(
    "competition",
    fetchUserCompetition,
  );

  useEffect(() => {
    if (competitions?.length) {
      setCompetitionId(String(competitions[competition || 0]._id));
    }
  }, [competition, competitions]);

  const { data: matches, isLoading: isFetching } = useQuery<IMatch[]>(
    ["match", competitionId],
    () => getMatches(competitionId),
    {
      enabled: !!competitionId, // only run when competitionId is truthy
    },
  );

  const groupMatchesByDate = (matches: IMatch[]) => {
    const grouped = {} as any;

    if (matches.length) {
      matches.forEach((match) => {
        const dateKey = format(new Date(match.date), "EEEE, dd MMM yyyy"); // e.g., Saturday, 14 Jun 2025
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(match);
      });
    }

    return grouped
      ? Object.keys(grouped).map((key) => ({
          title: key,
          data: grouped[key],
        }))
      : [];
  };

  const groupedMatches = groupMatchesByDate(matches || []);

  return (
    <Layout>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <WorldCupIncentive />
          <div className="w-full mb-20">            
            <img
              src={WorldCupBanner}
              alt="banner"
              className="w-full h-[500px] sm:hidden object-cover rounded-lg"
            />
            <div className="text-center">
              <h3 className="text-[22px] leading-[28px] font-bold mb-3 mt-5">
                World Cup Tornament
              </h3>
              <p className="text-gray-300">
                Predict the scores of the matches and climb up the leaderboard!
              </p>
              <div
                className="rounded-xl p-5 bg-blue-50 cursor-pointer mt-5 inline-block"
                onClick={() =>
                  useAppStore.setState({
                    modal: { type: "worldcup-incentive", open: true },
                  })
                }
              >
                <p className="text-gray-600">See What You Can Win!</p>
              </div>
            </div>
            <div className="mt-8 grid sm:grid-cols-3 grid-cols-1 sm:gap-5">
              <div className="sm:col-span-2">
                <div className="sm:p-10">
                  <MatchList
                    competitions={competitions || []}
                    competition={competition}
                    setCompetition={setCompetition}
                    matches={matches || []}
                    groupedMatches={groupedMatches}
                    isFetching={isFetching}
                    isScore={false}
                  />
                </div>
              </div>

              <div className="sm:block hidden">
                <h3 className="font-bold text-lg mb-5">LiveScores</h3>
                <Livescores
                  competitions={competitions || []}
                  competition={competition}
                  setCompetition={setCompetition}
                  matches={matches || []}
                  groupedMatches={groupedMatches}
                  isFetching={isFetching}
                  isScore
                />
              </div>
            </div>
          </div>
        </>
      )}

      <AddCompetition />
    </Layout>
  );
};

export default Home;
