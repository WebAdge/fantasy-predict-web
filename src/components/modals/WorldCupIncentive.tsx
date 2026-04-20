import { Modal } from "antd";
import useAppStore from "../../utils/appStore";

const WorldCupIncentive = () => {
  const modalOpen = useAppStore((state) => state.modal);

  const closeModal = () => 
    useAppStore.setState({ modal: { open: false, type: "" } });

  return (
    <Modal
      open={modalOpen.open && modalOpen.type === "worldcup-incentive"}
      footer={null}
      onCancel={closeModal}
      width={1000}
      centered
      // We target the antd modal body specifically for the background color
    //   style={{ body: { backgroundColor: '#CADEF0', padding: '24px', borderRadius: '8px' } }}
      closable={true}
    >
      <div className="flex flex-col gap-6 font-sans">      

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 2: Description */}
          <div className="bg-white/60 p-5 rounded-xl border border-white/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#005C9E] rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 className="font-bold text-[#004070] uppercase tracking-tight">Description</h2>
            </div>
            
            <p className="text-xs leading-relaxed text-gray-700">
              The World Cup is the best tournament of the summer, in fact of the whole calendar year. Not only are countries vying for the top prize — <strong>The World Cup</strong> — but so are the players.
            </p>
            
            <div className="my-3 py-2 bg-blue-50/50 rounded-lg text-center">
               <span className="text-2xl">🏆</span>
            </div>

            <p className="text-xs leading-relaxed text-gray-700">
              That's where you come in. Fantasy Predict gives you the chance to show how good you're at correctly predicting matches and <strong>winning big.</strong>
            </p>
            
            <div className="mt-4 text-center font-bold text-[#005C9E] text-[10px] uppercase tracking-widest">
              Embrace the Challenge!
            </div>
          </div>

          {/* Column 1: Scoring */}
          <div className="bg-white/60 p-5 rounded-xl border border-white/40 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#005C9E] rounded-lg">
                 <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h2 className="font-bold text-[#004070] uppercase tracking-tight">How it works: Scoring</h2>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center bg-white/40 p-2 rounded">
                <span className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> Exact Prediction:</span>
                <span className="font-bold text-[#005C9E]">+3 pts</span>
              </div>
              <div className="flex justify-between items-center bg-white/40 p-2 rounded">
                <span className="flex items-center gap-2"><span className="text-orange-500 font-bold">●</span> Close Prediction:</span>
                <span className="font-bold text-[#005C9E]">+2 pts</span>
              </div>
              <div className="flex justify-between items-center bg-white/40 p-2 rounded">
                <span className="flex items-center gap-2"><span className="text-yellow-600 font-bold">★</span> Correct Result:</span>
                <span className="font-bold text-[#005C9E]">+1 pt</span>
              </div>
              <div className="flex justify-between items-center bg-white/40 p-2 rounded text-gray-400">
                <span className="flex items-center gap-2"><span>✕</span> Wrong Result:</span>
                <span className="font-bold">0 pt</span>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-gray-600 italic border-t border-black/5 pt-3">
              The higher your score, the higher you rank on the leaderboard. So, predict as many matches as you can.
            </p>
          </div>          

          {/* Column 3: Prizes */}
          <div className="bg-white/60 p-5 rounded-xl border border-white/40 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#005C9E] rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 className="font-bold text-[#004070] uppercase tracking-tight">Distribution</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-yellow-500 w-8">1</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase">1st Place</span>
                  <span className="font-bold text-lg text-[#004070]">₦200,000</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-slate-400 w-8">2</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase">2nd Place</span>
                  <span className="font-bold text-lg text-[#004070]">₦100,000</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-amber-700 w-8">3</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase">3rd Place</span>
                  <span className="font-bold text-lg text-[#004070]">₦50,000</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-gray-300 w-8">4</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase">4th Place</span>
                  <span className="font-bold text-lg text-[#004070]">₦25,000</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default WorldCupIncentive;