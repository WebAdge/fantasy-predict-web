/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigate } from "react-router-dom";
import { appLogout } from "../utils/shared";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { LogOut, User, Home, UserCheck } from "react-feather";

const ChatHeader = () => {
  const navigate = useNavigate();
  const popUpRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOutside = (event: ChangeEvent<HTMLElement>) => {
    if (
      popUpRef.current &&
      // @ts-ignore
      !popUpRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    // @ts-ignore
    document.addEventListener("click", handleClickOutside);
    return () => {
      // @ts-ignore
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`grid grid-cols-12 items-center w-full`}>
      <div>
        <div className="">
          <div className="relative" ref={popUpRef}>
            <div
              className="cursor-pointer rounded-full bg-white flex gap-[3px] p-3 items-start"
              // onClick={() => setOpen((prev) => !prev)}
              onClick={() => navigate("/profile")}
            >
              <UserCheck color="#000" className="opacity-80" size={30} />
            </div>
            {open ? (
              <div className="flyover-menu right-auto top-[50px] rounded-md w-[250px]">
                <ul>
                  <li
                    className="flex gap-2 cursor-pointer hover:opacity-70 py-1"
                    onClick={() => navigate("/dashboard")}
                  >
                    <Home color="#1D2D50" className="mt-[1px]" size={20} />
                    <p className="text-[#1D2D50]">Home</p>
                  </li>
                  <li
                    className="flex gap-2 cursor-pointer hover:opacity-70 py-1"
                    onClick={() => navigate("/contest")}
                  >
                    <User color="#1D2D50" className="mt-[1px]" size={20} />
                    <p className="text-[#1D2D50]">Contests</p>
                  </li>
                  <li
                    className="flex gap-2 cursor-pointer hover:opacity-70 py-1"
                    onClick={() => navigate("/profile")}
                  >
                    <User color="#1D2D50" className="mt-[1px]" size={20} />
                    <p className="text-[#1D2D50]">Profile</p>
                  </li>
                  <li
                    className="flex gap-2 cursor-pointer hover:opacity-70 py-1"
                    onClick={appLogout}
                  >
                    <LogOut color="#1D2D50" className="mt-[1px]" size={20} />
                    <p className="text-[#1D2D50]">Logout</p>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
