import "@ant-design/flowchart/dist/index.css";
import { QueryClient, QueryClientProvider } from "react-query";

import PrivateRoutes from "./routing/routes";
import InviteFriend from "./components/modals/InviteFriend";
import Feedback from "./components/modals/Feedback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: true,
    },
  },
});

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PrivateRoutes />
        <InviteFriend />
        <Feedback />
      </QueryClientProvider>
    </>
  );
};

export default App;
