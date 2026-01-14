interface DefaultAttributes {
  id?: string;
  _id?: string;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IAdmin extends DefaultAttributes {
  email: string;
  fullName: string;
  password: string;
  isActive: boolean;
}

interface IMatch extends DefaultAttributes {
  status: "ongoing" | "finished" | "scheduled" | string;
  homeTeam: {
    name: string;
    shortName: string;
    crest: string;
    score: number | null;
  };
  awayTeam: {
    name: string;
    shortName: string;
    crest: string;
    score: number | null;
  };
  matchday: string;
  date: Date;
  competition: string;
  stage: string;
  matchId: string;
}

interface ICompetition extends DefaultAttributes {
  name: string;
  type: string;
  code: string;
  filters: [{ name: string; value: string }];
  default: boolean;
}
interface IUser extends DefaultAttributes {
  otp: string;
  meta: Meta;
  email: string;
  verifiedAt: Date;
  password: string;
  otpExpiredAt: Date;
  accountType: string;
  phoneNumber: string;
  countryCode: string;
  isVerified: boolean;
}

type TransactionStatus = "pending" | "successful" | "failed";
type TransactionType = "credit" | "debit";

interface ITransaction extends DefaultAttributes {
  user: string;
  fee: number;
  amount: number;
  wallet: string;
  status: TransactionStatus;
  type: TransactionType;
  reference: string;
  currency: string;
  wasReverted?: boolean;
  wasRefunded?: boolean;
  dateReverted?: Date;
  dateRefunded?: Date;
  dateInitiated: Date;
  dateCompleted?: Date;
  meta?: Record<string, string>;
}

interface IStore {
  chatMessage: string;
  fromTrending: boolean;
  fundAccount: boolean;
  voteSelection: { reference: string; voteType: string };
  pendingWeeklyAnswer: { topicName: string; link: string };
  setChatMessage: (msg: string) => void;
  setOnboarding: (e: { name: string; value: string }) => void;
  setWeeklyQuiz: (e: { name: string; value: string }) => void;
  onboarding: any;
  weeklyQuiz: any[];
  modal: { open: boolean; type: string };
  slider: { show: boolean; id: string };
}
type TopicStatus = "draft" | "scheduled" | "published" | "completed";

interface ITopic extends DefaultAttributes {
  endDate: Date;
  title: string;
  image: string;
  adminId: string;
  startDate: Date;
  category: string;
  hasStory: boolean;
  questionId: string;
  status: TopicStatus;
  hasAnswered: boolean;
}

type DashboardData = {
  storiesNumber: number;
  currentTopic: ITopic[];
  completedTopics: ITopic[];
  comingSoonTopics: ITopic[];
  systemChatMessage: string;
};

interface IGallery extends DefaultAttributes {
  image: string;
  position: number;
}

type QuizResultMeta = {
  question: string;
  answer: string;
};

interface IQuizResult extends DefaultAttributes {
  userId: string;
  quizId: string;
  topicId: string;
  tags: string[];
  feedback?: string;
  meta: QuizResultMeta[];
}

interface IFeedback extends DefaultAttributes {
  userId: string;
  message: string;
}

type ConfigMeta = {
  question: string;
  identifier: string;
  multiselect: boolean;
  answerType:
    | "select"
    | "input"
    | "textarea"
    | "calender"
    | "dropdown"
    | "tag"
    | "checkbox"
    | "tag-onboarding"
    | "search"
    | "address"
    | "textarea";
  subQuestion: string;
  list: Array<{ name: string; desc: string }>;
  triggerValue: string;
  options: string[];
};

interface IVoteTopic extends DefaultAttributes {
  title: string;
  userId: string;
  isVotingTopic: boolean;
  topicVotedId: string;
}

interface IQuiz extends DefaultAttributes {
  tags: string[];
  topicId: string;
  meta: ConfigMeta;
  nextTopic: NextTopic[];
}

type NextTopic = {
  name: string;
  numberOfVoters: number;
  voters: {
    date: Date;
    userId: string;
  };
};

interface IStories extends DefaultAttributes {
  image: string;
  color: string;
  header: string;
  userId: string;
  quizId: string;
  position: string;
  topicId: string;
  promptId: string;
  approvedAt?: string;
  status: Omit<TopicStatus, "scheduled">;
  contents: Array<string>;
}

type SendMessage = {
  message: string;
  systemMessage: string;
  instruction: string;
  isPlayground: boolean;
  isFirstMessage: boolean;
  sessionId: string;
  previousMessages: Array<{ role: string; content: string }> | [];
};

export interface ICompetition extends DefaultAttributes {
  name: string;
  type: string;
  code: string;
  logo: string;
  description: string;
  default: boolean;
  filters: [{ name: string; value: string; current: boolean }];
}

export interface ITransaction extends DefaultAttributes {
  user: string;
  fee: number;
  amount: number;
  wallet: string;
  status: TransactionStatus;
  type: TransactionType;
  reference: string;
  currency: string;
  wasReverted?: boolean;
  wasRefunded?: boolean;
  dateReverted?: Date;
  dateRefunded?: Date;
  dateInitiated: Date;
  dateCompleted?: Date;
  meta?: Record<string, any>;
}

export interface INewsDetails {
  url: string;
  title: string;
  author: string;
  content: string;
  urlToImage: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
}

export interface IUserCompetition extends ICompetition {
  user: string;
  competition: string;
}

type GameWeek = { week: number; point: number };

export interface IPoolMember extends DefaultAttributes {
  pool: string;
  user: string;
  gameWeeksParticipated: GameWeek[];
  totalAmountSpent: number;
}

export interface IPool extends DefaultAttributes {
    name: string
    description: string
    privacy: "public" | "private"
    config: {
        amount: number
        paid: boolean
        poolSharing?: "first-take-all" | "top-three"
        endDate?: Date
        code?: string
    }
    totalMembers: number
    competition: string
    isActive: boolean
    createdBy: {
      _id: string;
      name: string;
    }
    icon?: string
}

export interface IPrediction extends DefaultAttributes {
  user: string;
  match: string;
  outcome: string;
  point: number;
  pool: string;
  status: string
  competition: string;
}

export interface ILeaderboard extends IUser {
  predictions: { totalPoints: number };
}

export interface IMatch extends DefaultAttributes {
  status: "ongoing" | "finished" | "scheduled" | string;
  homeTeam: {
    name: string;
    shortName: string;
    crest: string;
    score: number | null;
  };
  awayTeam: {
    name: string;
    shortName: string;
    crest: string;
    score: number | null;
  };
  matchday: number;
  date: Date;
  competition: string;
  stage: string;
  prediction: IPrediction[];
}

interface IContest extends DefaultAttributes {
  user: string;
  title: string;
  endDate: string;
  amount: number;
  startDate: string;
  description: string;
  competition: string;
  isCreator: boolean;
  totalUsersJoined: number;
  type: "public" | "private";
  winType: {
    first: number; // perecentage
    second: number;
    third: number;
  };
  invitationCode: string;
}

type IBankList = {
  id: number;
  name: string;
  code: string;
};

interface IBank extends DefaultAttributes {
    user: string;
    bankName: string;
    bankCode: string;
    accountName: string;
    accountNumber: string;
}
