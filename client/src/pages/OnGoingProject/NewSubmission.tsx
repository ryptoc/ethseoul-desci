import { useWeb3React } from '@web3-react/core';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Dropzone from '../../components/Dropzone';
import errorContext from '../../context/error/errorContext';
import modalContext from '../../context/modal/modalContext';
import { getPlatformContract } from '../../helpers/typechain';
import useProposals from '../../hooks/web3/useProposals';
import useWeb3Storage from '../../hooks/web3/useWeb3Storage';

const NewSubmission = () => {
    const [pdf, setPdf] = useState<File[]>([]);

    const { setError } = useContext(errorContext);
    const { openModal, setModalData, closeModal } = useContext(modalContext);

    const { library } = useWeb3React();

    const client = useWeb3Storage();

    const { projectID } = useParams();

    const { proposals } = useProposals();

    const submit = async () => {
        if (!client || !proposals || !projectID) return;

        const proposalFound = proposals.find(
            (proposal) => proposal.id.toString() === projectID
        );

        try {
            openModal('waitingModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Please wait as your IPFS storage is being created',
            }));

            const submissionCID = await client.put(pdf);

            setModalData((prev) => ({
                ...prev,
                status: 'Please wait as your transaction is being confirmed',
            }));

            const platformContract = getPlatformContract(library.getSigner());

            const submitMilestone = await platformContract.submitMilestone(
                projectID,
                proposalFound?.milestoneIndex || 0,
                submissionCID
            );

            await submitMilestone.wait();

            openModal('successModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Success!',
                message: 'Your file has been submitted',
            }));
        } catch (error) {
            setError(error);
        } finally {
            closeModal('waitingModal');
        }
    };

    return (
        <div className='tab-content new-submission'>
            <span>
                Note: By submitting, you will replace the previous submission with this
                one.
            </span>

            <Dropzone
                title='Insert files here:'
                files={pdf}
                setFiles={(file) => setPdf(file)}
                accept={{
                    'application/pdf': ['.pdf'],
                }}
                multiple={false}
            />
            <Button variant='tertiary' onClick={submit}>
                Submit Files
            </Button>
        </div>
    );
};

export default NewSubmission;
