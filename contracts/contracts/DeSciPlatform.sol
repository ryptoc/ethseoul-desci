// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "./interfaces/IIpNFT.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/* ========== STRUCTS ========== */

enum ProposalState {
    SUBMITTED,
    IN_RESEARCH,
    RESEARCHED,
    DISCARDED
}

enum ProposalMilestoneStage {
    NONE,
    IN_PROGRESS,
    UNDER_REVIEW,
    RESEARCHED,
    DISCARDED
}

/**
 * @notice Research proposal struct.
 * @dev This struct is used in the contract storage.
 * 
 * @member title Proposal title.
 * @member description Proposal description.
 * @member researchCid CID to the proposal description.
 * @member pictureCid CID to the proposal image.
 * @member state State of the current proposal.
 * @member milestoneIndex Index of the current milestone in progress.
 * @member researcher Address of the assigned researcher.
 * @member researchAmount Research proposal total funding amount.
 * @member funder Research proposal funder.
 */
struct ResearchProposal {
    string title;
    string description;
    string researchCid;
    string pictureCid;
    ProposalState state;
    uint256 milestoneIndex;
    address researcher;
    uint256 researchAmount;
    address funder;
}

/**
 * @notice Research proposal struct for viewing.
 * @dev This struct is used in the external view functions.
 * 
 * @member title Proposal title.
 * @member description Brief proposal description.
 * @member researchCid CID to the proposal document.
 * @member pictureCid CID to the proposal image.
 * @member state State of the current proposal.
 * @member proposalMilestones Array of milestone details.
 * @member milestoneIndex Index of the current milestone in progress.
 * @member researcher Address of the assigned researcher.
 * @member researchAmount Research proposal total funding amount.
 * @member funder Research proposal funder.
 * @member researcherApplications Array of researcher applicant addresses.
 */
struct ResearchProposalView {
    string title;
    string description;
    string researchCid;
    string pictureCid;
    ProposalState state;
    ProposalMilestone[] proposalMilestones;
    uint256 milestoneIndex;
    address researcher;
    uint256 researchAmount;
    address funder;
    address[] researcherApplications;
}

/**
 * @notice Research proposal milestone details struct.
 * 
 * @member payoutAmount Payout amount for completed milestone.
 * @member comment Milestone comment, short description.
 * @member percentage Percentage of the completed research at this milestone.
 * @member state State of the current milestone.
 * @member milestoneResearchCid CID to the research document for this milestone.
 */
struct ProposalMilestone {
    uint256 payoutAmount;
    string comment;
    uint256 percentage;
    ProposalMilestoneStage state;
    string milestoneResearchCid;
}

/**
 * @notice Research proposal milestone details struct.
 * @dev This struct is used for the calldata function input.
 * 
 * @member payoutAmount Payout amount for completed milestone.
 * @member comment Milestone comment, short description.
 * @member percentage Percentage of the completed research at this milestone.
 */
struct ProposalMilestoneInput {
    uint256 payoutAmount;
    string comment;
    uint256 percentage;
}

/* ========== CONTRACTS ========== */

/**
 * @title DeSci Platform contract.
 * @notice A platform for decentralized science research funding.
 * @dev
 * This contracts acts as a state machine. It allows funders to fund
 * the research and researchers ro apply for the research. The research
 * consists of milestones that have to be completed by the researcher
 * and approved by the funder. After the funder approves the work of
 * the researcher, the researcher is rewarded by the preconfigured reward.
 * After the research is complete an IP NFT is minted which grants the IP
 * rights if the research to the funder.
 */
contract DeSciPlatform {
    using SafeERC20 for IERC20;

    /* ========== EVENTS ========== */

    /**
     * @notice Event emitted when tokens are deposited into the PiggyBank.
     * @dev Emitted when `depositTokens` is called.
     * @param token Deposited token.
     * @param amount Deposited amount.
     */
    event TokensDeposited(IERC20 indexed token, uint256 amount);

    /**
     * @notice Research proposal created.
     * @param researchProposal Research proposal.
     * @param id Research proposal id.
     */
    event ResearchProposalCreated(uint256 indexed id, ResearchProposal researchProposal);

    /**
     * @notice Research proposal state changed.
     * @dev Emitted when the research proposal changes state.
     * @param proposalId Research proposal id.
     * @param state New proposal state.
     */
    event ResearchProposalStateChange(
        uint256 indexed proposalId,
        ProposalState indexed state
    );

    /**
     * @notice Research proposal milestone state changed.
     * @dev Emitted when the research proposal milestone changes state.
     * @param proposalId Research proposal id.
     * @param milestoneIndex Milestone index.
     * @param state New milestone proposal state.
     */
    event ResearchProposalMilestoneStateChange(
        uint256 indexed proposalId,
        uint256 indexed milestoneIndex,
        ProposalMilestoneStage indexed state
    );

    /**
     * @notice Researcher applied to research the research proposal.
     *
     * @param proposalId Research proposal id.
     * @param researcher Researcher address.
     */
    event ResearchProposalApplication(
        uint256 indexed proposalId,
        address indexed researcher
    );

    /**
     * @notice Researcher applied to research the research proposal.
     * 
     * @param proposalId Research proposal id.
     * @param assignedResearcher Assigned researcher address.
     */
    event ResearchProposalResearcherAssigned(
        uint256 indexed proposalId,
        address indexed assignedResearcher
    );

    /**
     * @notice Researcher milestone submitted.
     * 
     * @param proposalId Research proposal id.
     * @param milestoneIndex Milestone index.
     */
    event ResearchProposalMilestoneSubmitted(
        uint256 indexed proposalId,
        uint256 indexed milestoneIndex
    );

    /**
     * @notice Researcher milestone confirmed by the funder.
     * @param proposalId Research proposal id.
     * @param milestoneIndex Milestone index.
     */
    event ResearchProposalMilestoneConfirmed(
        uint256 indexed proposalId,
        uint256 indexed milestoneIndex
    );

    /* ========== STATE VARIABLES ========== */

    /// @notice IP NFT contract.
    IIpNFT public immutable ipNft;

    /// @notice Token to fund the research with.
    IERC20 public immutable fundingToken;

    /// @notice Array of research proposals.
    ResearchProposal[] public proposals;

    /// @notice Proposal research applications.
    mapping(uint256 => mapping(address => bool)) public proposalResearchApplication;

    /// @notice Proposal research milestone details.
    mapping(uint256 => ProposalMilestone[]) public proposalResearchMilestones;

    /// @notice Array of researchers applied for the proposaed research.
    mapping(uint256 => address[]) public proposalResearcherApplications;

    /* ========== CONSTRUCTOR ========== */

    /**
     * @notice Sets the contract immutable values.
     * 
     * @param _ipNft IP NFT contract address.
     * @param _fundingToken Research funding token.
     */
    constructor(IIpNFT _ipNft, IERC20 _fundingToken) {
        ipNft = _ipNft;
        fundingToken = _fundingToken;
    }

    /* ========== VIEW FUNCTIONS ========== */

    /**
     * @notice Gets all the proposals with details.
     * 
     * @return Array of research proposals with details 
     */
    function getProposals() external view returns (ResearchProposalView[] memory) {
        ResearchProposalView[] memory researchProposals = new ResearchProposalView[](
            proposals.length
        );

        for (uint256 i = 0; i < researchProposals.length; i++) {
            researchProposals[i] = getProposal(i);
        }

        return researchProposals;
    }

    /**
     * @notice Gets the proposal with details.
     * 
     * @param proposalId Proposal id.
     * @return Research proposals with details.
     */
    function getProposal(uint256 proposalId)
        public
        view
        returns (ResearchProposalView memory)
    {
        ResearchProposal storage proposal = proposals[proposalId];

        ResearchProposalView memory researchProposalView;
        researchProposalView.title = proposal.title;
        researchProposalView.description = proposal.description;
        researchProposalView.researchCid = proposal.researchCid;
        researchProposalView.pictureCid = proposal.pictureCid;
        researchProposalView.state = proposal.state;
        researchProposalView.milestoneIndex = proposal.milestoneIndex;
        researchProposalView.researcher = proposal.researcher;
        researchProposalView.researchAmount = proposal.researchAmount;
        researchProposalView.funder = proposal.funder;

        ProposalMilestone[]
            storage proposalMilestonesStorage = proposalResearchMilestones[proposalId];

        uint256 milestonesCount = proposalMilestonesStorage.length;

        ProposalMilestone[] memory proposalMilestones = new ProposalMilestone[](
            milestonesCount
        );

        for (uint256 i = 0; i < milestonesCount; i++) {
            proposalMilestones[i] = proposalMilestonesStorage[i];
        }

        researchProposalView.proposalMilestones = proposalMilestones;
        researchProposalView.researcherApplications = proposalResearcherApplications[proposalId];

        return researchProposalView;
    }

    /* ========== MUTABLE FUNCTIONS ========== */

    /**
     * @notice Create research proposal.
     * @dev By creating a proposal, caller transfers the proposed funds to the contracts.
     * 
     * @param title Proposal title.
     * @param description Brief proposal description.
     * @param funder Research proposal funder.
     * @param researchCid CID to the proposal document.
     * @param pictureCid CID to the proposal image.
     * @param milestones Array of milestone details.
     * 
     * @return Proposal id.
     */
    function createResearchProposal(
        string calldata title,
        string calldata description,
        address funder,
        string calldata researchCid,
        string calldata pictureCid,
        ProposalMilestoneInput[] calldata milestones
    ) external returns (uint256) {
        uint256 proposalId = proposals.length;

        ProposalMilestone[] storage proposalMilestones = proposalResearchMilestones[
            proposalId
        ];
        require(
            milestones.length > 0,
            "DeSciPlatform::createResearchProposal: Proposal must have at least one milestone"
        );

        uint256 totalResearchAmount;

        {
            uint256 lastPercentage;
            for (uint256 i = 0; i < milestones.length; i++) {
                totalResearchAmount += milestones[i].payoutAmount;

                ProposalMilestone memory proposalMilestone;
                proposalMilestone.payoutAmount = milestones[i].payoutAmount;
                proposalMilestone.comment = milestones[i].comment;

                require(
                    milestones[i].percentage > lastPercentage,
                    "DeSciPlatform::createResearchProposal: Milestone percentage must be more than previous"
                );

                proposalMilestone.percentage = milestones[i].percentage;
                lastPercentage = milestones[i].percentage;

                proposalMilestones.push(proposalMilestone);
            }

            require(
                lastPercentage == 100,
                "DeSciPlatform::createResearchProposal: Milestone last percentage mustbe 100"
            );
        }

        {
            ResearchProposal memory proposal;
            proposal.title = title;
            proposal.description = description;
            proposal.researchCid = researchCid;
            proposal.pictureCid = pictureCid;
            proposal.researchAmount = totalResearchAmount;
            proposal.funder = funder;

            proposals.push(proposal);

            fundingToken.safeTransferFrom(msg.sender, address(this), totalResearchAmount);

            emit ResearchProposalCreated(proposalId, proposal);
        }

        return proposalId;
    }

    /**
     * @notice Apply to proposal as a researcher.
     * 
     * @param proposalId Proposal id.
     */
    function applyForResearch(uint256 proposalId)
        external
        verifyProposalState(proposalId, ProposalState.SUBMITTED)
    {
        if (!proposalResearchApplication[proposalId][msg.sender]) {
            proposalResearchApplication[proposalId][msg.sender] = true;
            proposalResearcherApplications[proposalId].push(msg.sender);
        }
        

        emit ResearchProposalApplication(proposalId, msg.sender);
    }

    /**
     * @notice Assign researcher to the proposed research.
     * @dev
     * The researcher must apply beforehand.
     * Only funder can assign a researcher
     * 
     * @param proposalId Proposal id.
     * @param researcher Address of the researcher.
     */
    function assignResearcher(uint256 proposalId, address researcher)
        external
        verifyProposalState(proposalId, ProposalState.SUBMITTED)
        onlyFunder(proposalId)
    {
        require(
            proposalResearchApplication[proposalId][researcher],
            "DeSciPlatform::assignResearcher: Researcher did not apply."
        );

        proposals[proposalId].researcher = researcher;

        emit ResearchProposalResearcherAssigned(proposalId, msg.sender);

        // transition research proposal to IN_PROGRESS
        _transitionProposal(proposalId, ProposalState.IN_RESEARCH);

        // transition proposal milestone to IN_PROGRESS
        _transitionProposalMilestone(
            proposalId,
            proposals[proposalId].milestoneIndex,
            ProposalMilestoneStage.IN_PROGRESS
        );
    }

    /**
     * @notice Submit a proposal milestone as a researcher.
     * @dev
     * The milestone index must be in progress.
     * Only researcher can submit a milestone.
     * 
     * @param proposalId Proposal id.
     * @param milestoneIndex Index of the milestone to submit.
     * @param milestoneResearchCid CID of the milestone research document.
     */
    function submitMilestone(
        uint256 proposalId,
        uint256 milestoneIndex,
        string calldata milestoneResearchCid
    )
        external
        onlyResearcher(proposalId)
        verifyProposalMilestoneIndexState(
            proposalId,
            milestoneIndex,
            ProposalMilestoneStage.IN_PROGRESS
        )
        nonEmptyCid(milestoneResearchCid)
    {
        // verify this milestone index is the current one
        proposalResearchMilestones[proposalId][milestoneIndex]
            .milestoneResearchCid = milestoneResearchCid;
        proposalResearchMilestones[proposalId][milestoneIndex]
            .milestoneResearchCid = milestoneResearchCid;

        // transition proposal milestone to UNDER_REVIEW
        _transitionProposalMilestone(
            proposalId,
            milestoneIndex,
            ProposalMilestoneStage.UNDER_REVIEW
        );

        emit ResearchProposalMilestoneSubmitted(proposalId, milestoneIndex);
    }

    /**
     * @notice Confirm the milestone submission.
     * @dev
     * The milestone index must be under review.
     * Only funder can confirm a milestone research.
     * 
     * @param proposalId Proposal id.
     * @param milestoneIndex Index of the milestone to submit.
     * @param nftMetadataCid CID of the ipNFT metadata (only for the last milestone).
     */
    function confirmMilestoneCompleted(
        uint256 proposalId,
        uint256 milestoneIndex,
        string calldata nftMetadataCid
    )
        external
        onlyFunder(proposalId)
        verifyProposalMilestoneIndexState(
            proposalId,
            milestoneIndex,
            ProposalMilestoneStage.UNDER_REVIEW
        )
    {
        ResearchProposal storage proposal = proposals[proposalId];

        // pay researcher
        fundingToken.safeTransfer(
            proposal.researcher,
            proposalResearchMilestones[proposalId][milestoneIndex].payoutAmount
        );

        // transition to the new milestone
        _transitionProposalMilestone(
            proposalId,
            milestoneIndex,
            ProposalMilestoneStage.RESEARCHED
        );
        proposal.milestoneIndex++;

        emit ResearchProposalMilestoneConfirmed(proposalId, milestoneIndex);

        // if last milestone is researched, mark proposal as researched
        if (proposalResearchMilestones[proposalId].length == proposal.milestoneIndex) {
            _transitionProposal(proposalId, ProposalState.RESEARCHED);

            // mint an ipNFT
            _nonEmptyCid(nftMetadataCid);
            ipNft.mint(proposal.funder, proposalId, nftMetadataCid);

            _transitionProposal(proposalId, ProposalState.RESEARCHED);
        } else {
            // if there are more milestones start the next one
            _transitionProposalMilestone(
                proposalId,
                proposals[proposalId].milestoneIndex,
                ProposalMilestoneStage.IN_PROGRESS
            );
        }
    }

    /* ========== PRIVATE FUNCTIONS ========== */

    /**
     * @notice Transition research proposal to the specified state.
     * 
     * @param proposalId Proposal id.
     * @param state Transition to the specified state.
     */
    function _transitionProposal(uint256 proposalId, ProposalState state) private {
        proposals[proposalId].state = state;
        emit ResearchProposalStateChange(proposalId, state);
    }

    /**
     * @notice Transition research proposal milestone state.
     * 
     * @param proposalId Proposal id.
     * @param index Milestone index.
     * @param milestoneState Transition to the specified milestone state.
     */
    function _transitionProposalMilestone(
        uint256 proposalId,
        uint256 index,
        ProposalMilestoneStage milestoneState
    ) private {
        proposalResearchMilestones[proposalId][index].state = milestoneState;
        emit ResearchProposalMilestoneStateChange(proposalId, index, milestoneState);
    }

    /* ========== RESTRICTION FUNCTIONS ========== */

    function _onlyResearcher(uint256 proposalId) private view {
        require(
            proposals[proposalId].researcher == msg.sender,
            "DeSciPlatform::_onlyResearcher: Only proposal researcher."
        );
    }

    function _onlyFunder(uint256 proposalId) private view {
        require(
            proposals[proposalId].funder == msg.sender,
            "DeSciPlatform::_onlyFunder: Only proposal funder."
        );
    }

    function _nonEmptyCid(string calldata cid) private pure {
        require(
            bytes(cid).length > 0,
            "DeSciPlatform::_nonEmptyCid: Only proposal funder."
        );
    }

    function _verifyProposalState(uint256 proposalId, ProposalState state) private view {
        require(
            proposals[proposalId].state == state,
            "DeSciPlatform::_verifyProposalState: Proposal is in the wrong state."
        );
    }

    function _verifyProposalMilestoneIndexState(
        uint256 proposalId,
        uint256 index,
        ProposalMilestoneStage state
    ) private view {
        require(
            proposals[proposalId].milestoneIndex == index &&
                proposalResearchMilestones[proposalId][index].state == state,
            "DeSciPlatform::_verifyProposalMilestoneIndex: Proposal milestone index is wrong."
        );
    }

    /* ========== MODIFIERS ========== */

    /**
     * @notice Throws if caller is not a proposal researcher.
     */
    modifier onlyResearcher(uint256 proposalId) {
        _onlyResearcher(proposalId);
        _;
    }

    /**
     * @notice Throws if caller is not a proposal funder.
     */
    modifier onlyFunder(uint256 proposalId) {
        _onlyFunder(proposalId);
        _;
    }

    /**
     * @notice Throws if the `cid` is not an empty string.
     */
    modifier nonEmptyCid(string calldata cid) {
        _nonEmptyCid(cid);
        _;
    }

    /**
     * @notice Throws if proposal state is wrong.
     */
    modifier verifyProposalState(uint256 proposalId, ProposalState state) {
        _verifyProposalState(proposalId, state);
        _;
    }

    /**
     * @notice Throws if proposal milestone state is wrong.
     */
    modifier verifyProposalMilestoneIndexState(
        uint256 proposalId,
        uint256 index,
        ProposalMilestoneStage state
    ) {
        _verifyProposalMilestoneIndexState(proposalId, index, state);
        _;
    }
}
