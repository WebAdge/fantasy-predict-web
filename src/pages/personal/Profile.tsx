import { useState } from "react";
import { X } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import { appLogout, getCustomerDetails } from "../../utils/shared";
import { getProfileData } from "../../server/user";

import Loading from "../../components/Loading";
import OnboardingLayout from "../../components/OnboardingLayout";
import ChangePassword from "../../components/modals/ChangePassword";
import EditPersonalInfo from "../../components/forms/EditPersonalInfo";
import DeleteAccount from "../../components/modals/DeleteAccount";
import Button from "../../library/Button";

const Profile = () => {
  const navigate = useNavigate();
  const customer = getCustomerDetails();
  const [editSection, setEditSection] = useState("personalInformation");
  const { data, isLoading } = useQuery("user-profile-data", getProfileData);

  // const mutation = useMutation(deactivateAccount, {
  //   onSuccess: () => {
  //     appLogout();
  //     navigate("/");
  //   },
  // });

  return (
    <OnboardingLayout className="sm:grid sm:place-items-center" hide>
      <div className="sm:w-[517px]">
        <div className="flex gap-3 my-5">
          <div
            className="mt-[2px] cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <X color="black" />
          </div>
          <p className="font-bold text-xl text-black">Profile</p>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="flex justify-between">
              <p className="text-black">Personal Information</p>
              <div
                className="flex gap-2 mr-2 cursor-pointer"
                onClick={() => {
                  if (editSection === "personalInformation") {
                    setEditSection("");
                    return;
                  }
                  setEditSection("personalInformation");
                }}
              ></div>
            </div>
            <div className="p-3 mt-3 mb-10 bg-transparent border-[1px] border-[#1d2d50] rounded-lg">
              {editSection === "personalInformation" ? (
                <EditPersonalInfo info={data} />
              ) : (
                <>
                  {data?.record?.map((record: any, index: number) => {
                    return (
                      <div
                        key={record.identifier}
                        className={index === 0 ? "" : "mt-2"}
                      >
                        <p className="truncate">{record.question}</p>
                        <p className="navy-color capitalize">
                          {customer.meta && customer.meta[record.identifier]
                            ? customer.meta[record.identifier]
                            : "NA"}
                        </p>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* <p className="mt-5 navy-color">Security</p>
            <div className="p-3 my-3 bg-transparent border-[1px] border-[#1d2d50] rounded-lg">
              <p className="">
                Email: <span className="navy-color">{customer.email}</span>
              </p>
              <Button
                onClick={() => {
                  useAppStore.setState({
                    modal: { open: true, type: "password" },
                  });
                }}
                color="black"
                className="mt-3"
              >
                Change Password
              </Button>
            </div> */}

            <Button onClick={() => appLogout()} color="danger" className="my-5">
              Log Out
            </Button>
          </div>
        )}
      </div>

      <DeleteAccount />
      <ChangePassword />
    </OnboardingLayout>
  );
};

export default Profile;
