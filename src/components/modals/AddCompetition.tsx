import { Modal } from "antd";
import useAppStore from "../../utils/appStore";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addUserCompetition,
  fetchCompetition,
  fetchUserCompetition,
} from "../../server/matches";
import { useEffect, useState } from "react";
import { ICompetition } from "../../type";
import Button from "../../library/Button";

const AddCompetition = () => {
  const queryClient = useQueryClient();
  const modalOpen = useAppStore((state) => state.modal);
  const [availableCompetitions, setAvailableCompetitions] = useState<
    ICompetition[]
  >([]);
  const [currentCompetition, setCurrentCompetition] = useState<string | null>(
    null
  );

  const { data } = useQuery<ICompetition[]>("competitions", fetchCompetition);
  const { data: competitions } = useQuery<ICompetition[]>(
    "competition",
    fetchUserCompetition
  );

  useEffect(() => {
    if (data && competitions) {
      const userCompetitionIds = competitions.map((c) => c._id);
      const filtered = data.filter((c) => !userCompetitionIds.includes(c._id));
      setAvailableCompetitions(filtered);
    } else {
      setAvailableCompetitions(data || []);
    }
  }, [data, competitions]);

  const mutation = useMutation(addUserCompetition, {
    onSuccess: () => {
      setCurrentCompetition(null);
      queryClient.invalidateQueries("competition");
      queryClient.invalidateQueries("competitions");
    },
    onError: (error: Error) => {
      console.error("Error adding competition:", error.message);
    },
  });

  return (
    <Modal
      title="Add Competition"
      open={modalOpen.open && modalOpen.type === "competition"}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
      className="bg-[#]"
    >
      <div className="mt-5">
        {availableCompetitions.length ? (
          availableCompetitions.map((competition) => (
            <div
              className="flex justify-between gap-5 mt-5"
              key={competition._id}
            >
              <p>{competition.name}</p>
              <Button
                className="w-[100px]"
                onClick={() => {
                  setCurrentCompetition(competition._id || "");
                  mutation.mutate({ competitionId: String(competition._id) });
                }}
                loading={
                  mutation.isLoading && currentCompetition === competition._id
                }
              >
                Add
              </Button>
            </div>
          ))
        ) : (
          <>
            <p>No available competitions to add.</p>
          </>
        )}
      </div>
    </Modal>
  );
};

export default AddCompetition;
