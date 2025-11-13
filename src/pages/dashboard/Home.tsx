/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";

import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { fetchUserCompetition, getMatches } from "../../server/matches";
import { useEffect, useState } from "react";
import MatchList from "../../components/shared/MatchList";
import { format } from "date-fns";
import { ICompetition, IMatch } from "../../type";
import Leaderboard from "../../components/shared/Leaderboard";
import AddCompetition from "../../components/modals/AddCompetition";

const Home = () => {
  const [competitionId, setCompetitionId] = useState("6913e827e79d97136980f773");

  const [competition, setCompetition] = useState(0);
  const { data: competitions } = useQuery<ICompetition[]>(
    "competition",
    fetchUserCompetition
  );

  useEffect(() => {
    if (competitions?.length) {
      setCompetitionId(String(competitions[competition || 0]._id));
    }
  }, [competition, competitions]);

  const {
    data: matches,
    isLoading: isFetching,
  } = useQuery<IMatch[]>(
    ["match", competitionId],
    () => getMatches(competitionId),
    {
      enabled: !!competitionId, // only run when competitionId is truthy
    }
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
          <div className="">
            <Leaderboard />
            <div className="mt-8">
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
        </>
      )}

      <AddCompetition />
    </Layout>
  );
};

export default Home;
