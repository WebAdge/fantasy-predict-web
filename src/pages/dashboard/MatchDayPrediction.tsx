import { useQuery } from "react-query";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { getMatchesByMatchday } from "../../server/matches";
import { IMatch } from "../../type";
import MatchDayList from "../../components/shared/MatchDayList";
import Loading from "../../components/Loading";
import { format } from "date-fns";
import Button from "../../library/Button";

const MatchDayPrediction = () => {
  const { matchday, competition } = useParams();

  const { data, isLoading } = useQuery(
    ["by-matchday", matchday, competition],
    () => getMatchesByMatchday(String(matchday), String(competition)),
    {
      enabled: !!matchday && !!competition,
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

  const groupedMatches = groupMatchesByDate(data?.matches || []);

  const navigate = useNavigate();

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full mb-20">
            <div className="mt-8">
              <h2 className="text-2xl font-bold">
                {data?.competition?.name || ""}
              </h2>
              <MatchDayList
                matches={data?.matches || []}
                groupedMatches={groupedMatches}
                isFetching={isLoading}
              />
            </div>

            <Button className="mt-10" onClick={() => navigate(`/dashboard/${matchday}/${competition}`) }>
                Pick Round {Number(matchday) + 1}
            </Button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default MatchDayPrediction;
