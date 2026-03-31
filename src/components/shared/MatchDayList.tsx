/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar } from "react-feather";
import { IMatch } from "../../type";
import ScoreSelection from "./ScoreSelection";
import MatchdaySummary from "./MatchdaySummary";

type Props = {
  matches: IMatch[];
  isFetching: boolean;
  groupedMatches: {
    title: string;
    data: IMatch;
  }[];
};

function MatchDayList({
  matches,
  groupedMatches,
  isFetching,
}: Props) {

  const hasPick = matches.some((match) => match.prediction);

  return (
    <div className="container">  

      {/* Matches Section */}
      <div style={{ overflowY: "auto" }}>
        {matches?.length ? (
          groupedMatches.map((section: any, secIdx: number) => (
            <div key={secIdx}>
              {/* Section Header */}
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Calendar color="grey" />
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {section.title}
                </span>
              </div>

              {/* Match Items */}
              {section.data.map((item: IMatch, index: number) => (
                <div
                  key={index}
                  className="resultCard bg-[#fff]"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 12,
                    border: "1px solid #eee",
                    margin: "10px 5px",
                    borderRadius: 8,
                  }}
                >
                  {/* Home Team */}
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={item.homeTeam.crest}
                      alt={item.homeTeam.shortName}
                      style={{ width: 50, height: 50 }}
                    />
                    <div
                      style={{ fontSize: 14, color: "#333" }}
                      className="mt-3"
                    >
                      <p className="font-bold">{item.homeTeam.shortName}</p>
                    </div>
                  </div>

                  {/* Prediction */}
                  <ScoreSelection item={item} />
                  

                  {/* Away Team */}
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={item.awayTeam.crest}
                      alt={item.awayTeam.shortName}
                      style={{ width: 50, height: 50 }}
                    />
                    <div
                      style={{ fontSize: 14, color: "#333" }}
                      className="mt-3"
                    >
                      <p className="font-bold text-center">
                        {item.awayTeam.shortName}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", marginTop: 25 }}>
            {isFetching ? "Retrieving matches" : "No Match Available"}
          </div>
        )}
      </div>

      {hasPick && <MatchdaySummary matches={matches} hasPicks={hasPick} />}
    </div>
  );
}

export default MatchDayList;
