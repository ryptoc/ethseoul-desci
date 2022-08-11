import React, { useContext, useMemo, useState } from 'react';
import modalContext from '../context/modal/modalContext';
import CustomModal from '../components/CustomModal';
import errorContext from '../context/error/errorContext';
import { getPlatformContract } from '../helpers/typechain';
import { useWeb3React } from '@web3-react/core';
import useProposals from '../hooks/web3/useProposals';
import useWeb3Storage from '../hooks/web3/useWeb3Storage';
import moment from 'moment';

const SubmitMilestoneModal: React.FC = () => {
    const { modalData, closeModal, openModal, setModalData } = useContext(modalContext);

    const { setError } = useContext(errorContext);

    const { proposals } = useProposals();

    const { library } = useWeb3React();

    const client = useWeb3Storage();

    const [checked, setChecked] = useState(false);

    const proposalFound = useMemo(
        () =>
            proposals
                ? proposals.find((proposal) => proposal.id.toString() === modalData.data)
                : undefined,
        [proposals, modalData.data]
    );

    const onClose = () => closeModal('submitMilestoneModal');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
    };

    const confirm = async () => {
        if (!client) return;

        try {
            openModal('waitingModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Please wait as your IPFS storage is being created',
            }));

            const platformContract = getPlatformContract(library.getSigner());

            if (!proposalFound) return;

            const isFinalMilestone =
                proposalFound.milestoneIndex.toNumber() ===
                proposalFound.proposalMilestones.length - 1;

            let json = '';

            if (isFinalMilestone) {
                const pictureRes = await client.get(proposalFound.pictureCid);
                const pdfRes = await client.get(proposalFound.researchCid);

                const researchFiles = await Promise.all(
                    proposalFound.proposalMilestones.map(
                        async ({ milestoneResearchCid }) => {
                            const milestoneRes = await client.get(milestoneResearchCid);

                            if (!milestoneRes) return '';

                            const milestonFile = await milestoneRes.files();

                            return milestonFile[0].cid;
                        }
                    )
                );

                if (!pictureRes || !pdfRes) return;

                const pictureFiles = await pictureRes.files();
                const pdfFiles = await pdfRes.files();

                const jsonObj = JSON.stringify({
                    name: `IP NFT: ${proposalFound.title}`,
                    description: proposalFound.description,
                    image: `ipfs://${pictureFiles[0].cid}`,
                    proposal: pdfFiles[0].cid,
                    research: researchFiles,
                    createdOn: moment().unix(),
                });

                const blob = new Blob([jsonObj], { type: 'application/json' });
                const file = new File([blob], 'file.json');

                const jsonCID = await client.put([file]);
                const jsonRes = await client.get(jsonCID);

                if (!jsonRes) return;

                const jsonFile = await jsonRes?.files();

                json = `ipfs://${jsonFile[0].cid}`;
            }

            setModalData((prev) => ({
                ...prev,
                status: 'Please wait as your transaction is being confirmed',
            }));

            const submit = await platformContract.confirmMilestoneCompleted(
                modalData.data,
                proposalFound?.milestoneIndex || 0,
                json
            );

            await submit.wait();

            setModalData((prev) => ({
                ...prev,
                status: 'Success',
                message: isFinalMilestone
                    ? 'Researches has been completed and your NFT has been generated'
                    : 'Escrow has been released and researchers may now began on the next milestone.',
            }));
            openModal('successModal');
            onClose();
        } catch (error) {
            setError(error);
        } finally {
            closeModal('waitingModal');
        }
    };

    return (
        <CustomModal
            modalName='submitMilestoneModal'
            className='status-modal warning-modal submit-milestone'
            overlayClassName='status-modal'
        >
            <div className='content'>
                <div className='status'>Notice</div>
                <div className='message'>
                    You are about to unlock the Milestone Escrow. Please ensure that you
                    have reviewed all documents and the milestone objectives are completed
                    to a sufficient standard. This is a non-reversable decision and your
                    funds will not be returned.
                </div>
                <label>
                    <span>I understand</span>
                    <input type='checkbox' checked={checked} onChange={handleChange} />
                </label>
                <button onClick={confirm} disabled={!checked}>
                    Confirm
                </button>
            </div>
        </CustomModal>
    );
};

export default SubmitMilestoneModal;
