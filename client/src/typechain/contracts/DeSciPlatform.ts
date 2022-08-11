/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export type ResearchProposalStruct = {
  title: PromiseOrValue<string>;
  description: PromiseOrValue<string>;
  researchCid: PromiseOrValue<string>;
  pictureCid: PromiseOrValue<string>;
  state: PromiseOrValue<BigNumberish>;
  milestoneIndex: PromiseOrValue<BigNumberish>;
  researcher: PromiseOrValue<string>;
  researchAmount: PromiseOrValue<BigNumberish>;
  funder: PromiseOrValue<string>;
};

export type ResearchProposalStructOutput = [
  string,
  string,
  string,
  string,
  number,
  BigNumber,
  string,
  BigNumber,
  string
] & {
  title: string;
  description: string;
  researchCid: string;
  pictureCid: string;
  state: number;
  milestoneIndex: BigNumber;
  researcher: string;
  researchAmount: BigNumber;
  funder: string;
};

export type ProposalMilestoneInputStruct = {
  payoutAmount: PromiseOrValue<BigNumberish>;
  comment: PromiseOrValue<string>;
  percentage: PromiseOrValue<BigNumberish>;
};

export type ProposalMilestoneInputStructOutput = [
  BigNumber,
  string,
  BigNumber
] & { payoutAmount: BigNumber; comment: string; percentage: BigNumber };

export type ProposalMilestoneStruct = {
  payoutAmount: PromiseOrValue<BigNumberish>;
  comment: PromiseOrValue<string>;
  percentage: PromiseOrValue<BigNumberish>;
  state: PromiseOrValue<BigNumberish>;
  milestoneResearchCid: PromiseOrValue<string>;
};

export type ProposalMilestoneStructOutput = [
  BigNumber,
  string,
  BigNumber,
  number,
  string
] & {
  payoutAmount: BigNumber;
  comment: string;
  percentage: BigNumber;
  state: number;
  milestoneResearchCid: string;
};

export type ResearchProposalViewStruct = {
  title: PromiseOrValue<string>;
  description: PromiseOrValue<string>;
  researchCid: PromiseOrValue<string>;
  pictureCid: PromiseOrValue<string>;
  state: PromiseOrValue<BigNumberish>;
  proposalMilestones: ProposalMilestoneStruct[];
  milestoneIndex: PromiseOrValue<BigNumberish>;
  researcher: PromiseOrValue<string>;
  researchAmount: PromiseOrValue<BigNumberish>;
  funder: PromiseOrValue<string>;
  researcherApplications: PromiseOrValue<string>[];
};

export type ResearchProposalViewStructOutput = [
  string,
  string,
  string,
  string,
  number,
  ProposalMilestoneStructOutput[],
  BigNumber,
  string,
  BigNumber,
  string,
  string[]
] & {
  title: string;
  description: string;
  researchCid: string;
  pictureCid: string;
  state: number;
  proposalMilestones: ProposalMilestoneStructOutput[];
  milestoneIndex: BigNumber;
  researcher: string;
  researchAmount: BigNumber;
  funder: string;
  researcherApplications: string[];
};

export interface DeSciPlatformInterface extends utils.Interface {
  functions: {
    "CAPACITY()": FunctionFragment;
    "applyForResearch(uint256)": FunctionFragment;
    "assignResearcher(uint256,address)": FunctionFragment;
    "balance(address)": FunctionFragment;
    "broken()": FunctionFragment;
    "confirmMilestoneCompleted(uint256,uint256,string)": FunctionFragment;
    "createResearchProposal(string,string,address,string,string,(uint256,string,uint256)[])": FunctionFragment;
    "filledCapacity()": FunctionFragment;
    "fundingToken()": FunctionFragment;
    "getProposal(uint256)": FunctionFragment;
    "getProposals()": FunctionFragment;
    "ipNft()": FunctionFragment;
    "proposalResearchApplication(uint256,address)": FunctionFragment;
    "proposalResearchMilestones(uint256,uint256)": FunctionFragment;
    "proposalResearcherApplications(uint256,uint256)": FunctionFragment;
    "proposals(uint256)": FunctionFragment;
    "submitMilestone(uint256,uint256,string)": FunctionFragment;
    "tokensDeposited(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "CAPACITY"
      | "applyForResearch"
      | "assignResearcher"
      | "balance"
      | "broken"
      | "confirmMilestoneCompleted"
      | "createResearchProposal"
      | "filledCapacity"
      | "fundingToken"
      | "getProposal"
      | "getProposals"
      | "ipNft"
      | "proposalResearchApplication"
      | "proposalResearchMilestones"
      | "proposalResearcherApplications"
      | "proposals"
      | "submitMilestone"
      | "tokensDeposited"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "CAPACITY", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "applyForResearch",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "assignResearcher",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "balance",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "broken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "confirmMilestoneCompleted",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createResearchProposal",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      ProposalMilestoneInputStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "filledCapacity",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "fundingToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getProposal",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getProposals",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "ipNft", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proposalResearchApplication",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "proposalResearchMilestones",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "proposalResearcherApplications",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "proposals",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "submitMilestone",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "tokensDeposited",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "CAPACITY", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "applyForResearch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assignResearcher",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "broken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "confirmMilestoneCompleted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createResearchProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "filledCapacity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fundingToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProposals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ipNft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proposalResearchApplication",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proposalResearchMilestones",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proposalResearcherApplications",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "proposals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "submitMilestone",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokensDeposited",
    data: BytesLike
  ): Result;

  events: {
    "PiggyBankBroken(address)": EventFragment;
    "ResearchProposalApplication(uint256,address)": EventFragment;
    "ResearchProposalCreated(uint256,tuple)": EventFragment;
    "ResearchProposalMilestoneConfirmed(uint256,uint256)": EventFragment;
    "ResearchProposalMilestoneStateChange(uint256,uint256,uint8)": EventFragment;
    "ResearchProposalMilestoneSubmitted(uint256,uint256)": EventFragment;
    "ResearchProposalResearcherAssigned(uint256,address)": EventFragment;
    "ResearchProposalStateChange(uint256,uint8)": EventFragment;
    "TokensDeposited(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PiggyBankBroken"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ResearchProposalApplication"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ResearchProposalCreated"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ResearchProposalMilestoneConfirmed"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ResearchProposalMilestoneStateChange"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ResearchProposalMilestoneSubmitted"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ResearchProposalResearcherAssigned"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ResearchProposalStateChange"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokensDeposited"): EventFragment;
}

export interface PiggyBankBrokenEventObject {
  breaker: string;
}
export type PiggyBankBrokenEvent = TypedEvent<
  [string],
  PiggyBankBrokenEventObject
>;

export type PiggyBankBrokenEventFilter = TypedEventFilter<PiggyBankBrokenEvent>;

export interface ResearchProposalApplicationEventObject {
  proposalId: BigNumber;
  researcher: string;
}
export type ResearchProposalApplicationEvent = TypedEvent<
  [BigNumber, string],
  ResearchProposalApplicationEventObject
>;

export type ResearchProposalApplicationEventFilter =
  TypedEventFilter<ResearchProposalApplicationEvent>;

export interface ResearchProposalCreatedEventObject {
  id: BigNumber;
  researchProposal: ResearchProposalStructOutput;
}
export type ResearchProposalCreatedEvent = TypedEvent<
  [BigNumber, ResearchProposalStructOutput],
  ResearchProposalCreatedEventObject
>;

export type ResearchProposalCreatedEventFilter =
  TypedEventFilter<ResearchProposalCreatedEvent>;

export interface ResearchProposalMilestoneConfirmedEventObject {
  proposalId: BigNumber;
  milestoneIndex: BigNumber;
}
export type ResearchProposalMilestoneConfirmedEvent = TypedEvent<
  [BigNumber, BigNumber],
  ResearchProposalMilestoneConfirmedEventObject
>;

export type ResearchProposalMilestoneConfirmedEventFilter =
  TypedEventFilter<ResearchProposalMilestoneConfirmedEvent>;

export interface ResearchProposalMilestoneStateChangeEventObject {
  proposalId: BigNumber;
  index: BigNumber;
  state: number;
}
export type ResearchProposalMilestoneStateChangeEvent = TypedEvent<
  [BigNumber, BigNumber, number],
  ResearchProposalMilestoneStateChangeEventObject
>;

export type ResearchProposalMilestoneStateChangeEventFilter =
  TypedEventFilter<ResearchProposalMilestoneStateChangeEvent>;

export interface ResearchProposalMilestoneSubmittedEventObject {
  proposalId: BigNumber;
  milestoneIndex: BigNumber;
}
export type ResearchProposalMilestoneSubmittedEvent = TypedEvent<
  [BigNumber, BigNumber],
  ResearchProposalMilestoneSubmittedEventObject
>;

export type ResearchProposalMilestoneSubmittedEventFilter =
  TypedEventFilter<ResearchProposalMilestoneSubmittedEvent>;

export interface ResearchProposalResearcherAssignedEventObject {
  proposalId: BigNumber;
  assignedResearcher: string;
}
export type ResearchProposalResearcherAssignedEvent = TypedEvent<
  [BigNumber, string],
  ResearchProposalResearcherAssignedEventObject
>;

export type ResearchProposalResearcherAssignedEventFilter =
  TypedEventFilter<ResearchProposalResearcherAssignedEvent>;

export interface ResearchProposalStateChangeEventObject {
  proposalId: BigNumber;
  state: number;
}
export type ResearchProposalStateChangeEvent = TypedEvent<
  [BigNumber, number],
  ResearchProposalStateChangeEventObject
>;

export type ResearchProposalStateChangeEventFilter =
  TypedEventFilter<ResearchProposalStateChangeEvent>;

export interface TokensDepositedEventObject {
  token: string;
  amount: BigNumber;
}
export type TokensDepositedEvent = TypedEvent<
  [string, BigNumber],
  TokensDepositedEventObject
>;

export type TokensDepositedEventFilter = TypedEventFilter<TokensDepositedEvent>;

export interface DeSciPlatform extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DeSciPlatformInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    CAPACITY(overrides?: CallOverrides): Promise<[BigNumber]>;

    applyForResearch(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    assignResearcher(
      proposalId: PromiseOrValue<BigNumberish>,
      researcher: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    balance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    broken(overrides?: CallOverrides): Promise<[boolean]>;

    confirmMilestoneCompleted(
      proposalId: PromiseOrValue<BigNumberish>,
      milestoneIndex: PromiseOrValue<BigNumberish>,
      nftMetadataCid: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createResearchProposal(
      title: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      funder: PromiseOrValue<string>,
      researchCid: PromiseOrValue<string>,
      pictureCid: PromiseOrValue<string>,
      milestones: ProposalMilestoneInputStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    filledCapacity(overrides?: CallOverrides): Promise<[BigNumber]>;

    fundingToken(overrides?: CallOverrides): Promise<[string]>;

    getProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[ResearchProposalViewStructOutput]>;

    getProposals(
      overrides?: CallOverrides
    ): Promise<[ResearchProposalViewStructOutput[]]>;

    ipNft(overrides?: CallOverrides): Promise<[string]>;

    proposalResearchApplication(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    proposalResearchMilestones(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, number, string] & {
        payoutAmount: BigNumber;
        comment: string;
        percentage: BigNumber;
        state: number;
        milestoneResearchCid: string;
      }
    >;

    proposalResearcherApplications(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    proposals(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        string,
        string,
        number,
        BigNumber,
        string,
        BigNumber,
        string
      ] & {
        title: string;
        description: string;
        researchCid: string;
        pictureCid: string;
        state: number;
        milestoneIndex: BigNumber;
        researcher: string;
        researchAmount: BigNumber;
        funder: string;
      }
    >;

    submitMilestone(
      proposalId: PromiseOrValue<BigNumberish>,
      milestoneIndex: PromiseOrValue<BigNumberish>,
      milestoneResearchCid: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tokensDeposited(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  CAPACITY(overrides?: CallOverrides): Promise<BigNumber>;

  applyForResearch(
    proposalId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  assignResearcher(
    proposalId: PromiseOrValue<BigNumberish>,
    researcher: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  balance(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  broken(overrides?: CallOverrides): Promise<boolean>;

  confirmMilestoneCompleted(
    proposalId: PromiseOrValue<BigNumberish>,
    milestoneIndex: PromiseOrValue<BigNumberish>,
    nftMetadataCid: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createResearchProposal(
    title: PromiseOrValue<string>,
    description: PromiseOrValue<string>,
    funder: PromiseOrValue<string>,
    researchCid: PromiseOrValue<string>,
    pictureCid: PromiseOrValue<string>,
    milestones: ProposalMilestoneInputStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  filledCapacity(overrides?: CallOverrides): Promise<BigNumber>;

  fundingToken(overrides?: CallOverrides): Promise<string>;

  getProposal(
    proposalId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<ResearchProposalViewStructOutput>;

  getProposals(
    overrides?: CallOverrides
  ): Promise<ResearchProposalViewStructOutput[]>;

  ipNft(overrides?: CallOverrides): Promise<string>;

  proposalResearchApplication(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  proposalResearchMilestones(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, BigNumber, number, string] & {
      payoutAmount: BigNumber;
      comment: string;
      percentage: BigNumber;
      state: number;
      milestoneResearchCid: string;
    }
  >;

  proposalResearcherApplications(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  proposals(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      string,
      string,
      string,
      number,
      BigNumber,
      string,
      BigNumber,
      string
    ] & {
      title: string;
      description: string;
      researchCid: string;
      pictureCid: string;
      state: number;
      milestoneIndex: BigNumber;
      researcher: string;
      researchAmount: BigNumber;
      funder: string;
    }
  >;

  submitMilestone(
    proposalId: PromiseOrValue<BigNumberish>,
    milestoneIndex: PromiseOrValue<BigNumberish>,
    milestoneResearchCid: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tokensDeposited(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    CAPACITY(overrides?: CallOverrides): Promise<BigNumber>;

    applyForResearch(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    assignResearcher(
      proposalId: PromiseOrValue<BigNumberish>,
      researcher: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    balance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    broken(overrides?: CallOverrides): Promise<boolean>;

    confirmMilestoneCompleted(
      proposalId: PromiseOrValue<BigNumberish>,
      milestoneIndex: PromiseOrValue<BigNumberish>,
      nftMetadataCid: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    createResearchProposal(
      title: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      funder: PromiseOrValue<string>,
      researchCid: PromiseOrValue<string>,
      pictureCid: PromiseOrValue<string>,
      milestones: ProposalMilestoneInputStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    filledCapacity(overrides?: CallOverrides): Promise<BigNumber>;

    fundingToken(overrides?: CallOverrides): Promise<string>;

    getProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<ResearchProposalViewStructOutput>;

    getProposals(
      overrides?: CallOverrides
    ): Promise<ResearchProposalViewStructOutput[]>;

    ipNft(overrides?: CallOverrides): Promise<string>;

    proposalResearchApplication(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    proposalResearchMilestones(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, number, string] & {
        payoutAmount: BigNumber;
        comment: string;
        percentage: BigNumber;
        state: number;
        milestoneResearchCid: string;
      }
    >;

    proposalResearcherApplications(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    proposals(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        string,
        string,
        number,
        BigNumber,
        string,
        BigNumber,
        string
      ] & {
        title: string;
        description: string;
        researchCid: string;
        pictureCid: string;
        state: number;
        milestoneIndex: BigNumber;
        researcher: string;
        researchAmount: BigNumber;
        funder: string;
      }
    >;

    submitMilestone(
      proposalId: PromiseOrValue<BigNumberish>,
      milestoneIndex: PromiseOrValue<BigNumberish>,
      milestoneResearchCid: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    tokensDeposited(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "PiggyBankBroken(address)"(
      breaker?: PromiseOrValue<string> | null
    ): PiggyBankBrokenEventFilter;
    PiggyBankBroken(
      breaker?: PromiseOrValue<string> | null
    ): PiggyBankBrokenEventFilter;

    "ResearchProposalApplication(uint256,address)"(
      proposalId?: PromiseOrValue<BigNumberish> | null,
      researcher?: PromiseOrValue<string> | null
    ): ResearchProposalApplicationEventFilter;
    ResearchProposalApplication(
      proposalId?: PromiseOrValue<BigNumberish> | null,
      researcher?: PromiseOrValue<string> | null
    ): ResearchProposalApplicationEventFilter;

    "ResearchProposalCreated(uint256,tuple)"(
      id?: PromiseOrValue<BigNumberish> | null,
      researchProposal?: null
    ): ResearchProposalCreatedEventFilter;
    ResearchProposalCreated(
      id?: PromiseOrValue<BigNumberish> | null,
      researchProposal?: null
    ): ResearchProposalCreatedEventFilter;

    "ResearchProposalMilestoneConfirmed(uint256,uint256)"(
      proposalId?: PromiseOrValue<BigNumberish> | null,
      milestoneIndex?: PromiseOrValue<BigNumberish> | null
    ): ResearchProposalMilestoneConfirmedEventFilter;
    ResearchProposalMilestoneConfirmed(
      proposalId?: PromiseOrValue<BigNumberish> | null,
      milestoneIndex?: PromiseOrValue<BigNumberish> | null
    ): ResearchProposalMilestoneConfirmedEventFilter;

    "ResearchProposalMilestoneStateChange(uint256,uint256,uint8)"(
      proposalId?: PromiseOrValue<BigNumberish> | null,
      index?: PromiseOrValue<BigNumberish> | null,
      state?: PromiseOrValue<BigNumberish> | null
    ): ResearchProposalMilestoneStateChangeEventFilter;
    ResearchProposalMilestoneStateChange(
      proposalId?: PromiseOrValue<BigNumberish> | null,
      index?: PromiseOrValue<BigNumberish> | null,
      state?: PromiseOrValue<BigNumberish> | null
    ): ResearchProposalMilestoneStateChangeEventFilter;

    "ResearchProposalMilestoneSubmitted(uint256,uint256)"(
      proposalId?: PromiseOrValue<BigNumberish> | null,
      milestoneIndex?: PromiseOrValue<BigNumberish> | null
    ): ResearchProposalMilestoneSubmittedEventFilter;
    ResearchProposalMilestoneSubmitted(
      proposalId?: PromiseOrValue<BigNumberish> | null,
      milestoneIndex?: PromiseOrValue<BigNumberish> | null
    ): ResearchProposalMilestoneSubmittedEventFilter;

    "ResearchProposalResearcherAssigned(uint256,address)"(
      proposalId?: PromiseOrValue<BigNumberish> | null,
      assignedResearcher?: PromiseOrValue<string> | null
    ): ResearchProposalResearcherAssignedEventFilter;
    ResearchProposalResearcherAssigned(
      proposalId?: PromiseOrValue<BigNumberish> | null,
      assignedResearcher?: PromiseOrValue<string> | null
    ): ResearchProposalResearcherAssignedEventFilter;

    "ResearchProposalStateChange(uint256,uint8)"(
      proposalId?: PromiseOrValue<BigNumberish> | null,
      state?: PromiseOrValue<BigNumberish> | null
    ): ResearchProposalStateChangeEventFilter;
    ResearchProposalStateChange(
      proposalId?: PromiseOrValue<BigNumberish> | null,
      state?: PromiseOrValue<BigNumberish> | null
    ): ResearchProposalStateChangeEventFilter;

    "TokensDeposited(address,uint256)"(
      token?: PromiseOrValue<string> | null,
      amount?: null
    ): TokensDepositedEventFilter;
    TokensDeposited(
      token?: PromiseOrValue<string> | null,
      amount?: null
    ): TokensDepositedEventFilter;
  };

  estimateGas: {
    CAPACITY(overrides?: CallOverrides): Promise<BigNumber>;

    applyForResearch(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    assignResearcher(
      proposalId: PromiseOrValue<BigNumberish>,
      researcher: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    balance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    broken(overrides?: CallOverrides): Promise<BigNumber>;

    confirmMilestoneCompleted(
      proposalId: PromiseOrValue<BigNumberish>,
      milestoneIndex: PromiseOrValue<BigNumberish>,
      nftMetadataCid: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createResearchProposal(
      title: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      funder: PromiseOrValue<string>,
      researchCid: PromiseOrValue<string>,
      pictureCid: PromiseOrValue<string>,
      milestones: ProposalMilestoneInputStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    filledCapacity(overrides?: CallOverrides): Promise<BigNumber>;

    fundingToken(overrides?: CallOverrides): Promise<BigNumber>;

    getProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getProposals(overrides?: CallOverrides): Promise<BigNumber>;

    ipNft(overrides?: CallOverrides): Promise<BigNumber>;

    proposalResearchApplication(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proposalResearchMilestones(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proposalResearcherApplications(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proposals(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    submitMilestone(
      proposalId: PromiseOrValue<BigNumberish>,
      milestoneIndex: PromiseOrValue<BigNumberish>,
      milestoneResearchCid: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tokensDeposited(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    CAPACITY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    applyForResearch(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    assignResearcher(
      proposalId: PromiseOrValue<BigNumberish>,
      researcher: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    balance(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    broken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    confirmMilestoneCompleted(
      proposalId: PromiseOrValue<BigNumberish>,
      milestoneIndex: PromiseOrValue<BigNumberish>,
      nftMetadataCid: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createResearchProposal(
      title: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      funder: PromiseOrValue<string>,
      researchCid: PromiseOrValue<string>,
      pictureCid: PromiseOrValue<string>,
      milestones: ProposalMilestoneInputStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    filledCapacity(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fundingToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getProposals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ipNft(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposalResearchApplication(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proposalResearchMilestones(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proposalResearcherApplications(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proposals(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    submitMilestone(
      proposalId: PromiseOrValue<BigNumberish>,
      milestoneIndex: PromiseOrValue<BigNumberish>,
      milestoneResearchCid: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tokensDeposited(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
