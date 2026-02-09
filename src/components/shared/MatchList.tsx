/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle, Calendar, PlusCircle } from "react-feather";
import { ICompetition, IMatch } from "../../type";
import { Dispatch, SetStateAction } from "react";
import useAppStore from "../../utils/appStore";
import ScoreDisplay from "./ScoreDisplay";
import { useNavigate } from "react-router-dom";

type Props = {
  competitions: ICompetition[];
  competition: number;
  setCompetition: Dispatch<SetStateAction<number>>;
  matches: IMatch[];
  isFetching: boolean;
  groupedMatches: {
    title: string;
    data: IMatch;
  }[];
  isScore: boolean
};

function MatchList({
  competitions,
  competition,
  setCompetition,
  matches,
  groupedMatches,
  isFetching,
  isScore
}: Props) {

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="w-full flex gap-1">
      <div className="flex border-[1px] border-[#f2f2f2] gap-2 p-[5px] overflow-x-auto w-[95%] text-center">
        {competitions
          ?.sort((a, b) => b.name.localeCompare(a.name))
          ?.map((league, index) => (
            <div
              key={index}
              onClick={() => setCompetition(index)}
              style={{
                backgroundColor:
                  competition === index ? "#FFA500" : "rgba(0, 0, 0, 0.40)",
              }}
              className="text-white border-[0] rounded-[10px] cursor-pointer text-center px-5 py-3 w-[190px] shrink-0"
            >
              {league.name}
            </div>
          ))}
      </div>

      <div 
      onClick={() => {
        useAppStore.setState({ modal: { open: true, type: "competition" } });
      }}
      className="w-[10%] flex justify-center items-center cursor-pointer">
        <PlusCircle />
      </div>
      </div>

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
                  className="resultCard"
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
                  {isScore ? 
                  <div onClick={() => navigate(`/dashboard/${item.matchday}/${item.competition}`) }>
                  <ScoreDisplay item={item} /> 
                  </div>:
                  <div onClick={() => navigate(`/dashboard/${item.matchday}/${item.competition}`) }>
                    <AlertTriangle color="red" size={30} />
                    <p className="text-center text-red-700 font-bold">Pick</p>
                    
                  </div>
                  // <ScoreSelection item={item} />
                  }

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
    </div>
  );
}

export default MatchList;
