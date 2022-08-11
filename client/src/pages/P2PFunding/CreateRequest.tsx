import React, { FormEvent, useContext, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CrossIcon } from '../../assets/icons';
import TextInput from '../../components/TextInput';
import { calculateMargin, preventOverflow, toBigNumber } from '../../web3/utils';
import Button from '../../components/Button';
import Timeline from '../../components/Timeline';
import Dropzone from '../../components/Dropzone';
import modalContext from '../../context/modal/modalContext';
import useUserBalance from '../../hooks/web3/useUserBalance';
import useIsApproved from '../../hooks/web3/useIsApproved';
import { config } from '../../config/config';
import { useWeb3React } from '@web3-react/core';
import { MaxUint256 } from '@ethersproject/constants';
import { parseUnits } from '@ethersproject/units';
import errorContext from '../../context/error/errorContext';
import useWeb3Storage from '../../hooks/web3/useWeb3Storage';
import { getPlatformContract, getTokenContract } from '../../helpers/typechain';
import useProposals from '../../hooks/web3/useProposals';

type FormDataType = {
    title: string;
    description: string;
    minTrustScore: string;
    researchDuration: string;
    timeline: TimelineType[];
};

type TimelineType = {
    milestone: string;
    releaseAmount: string;
    comments: string;
};

const initialState = {
    title: '',
    description: '',
    minTrustScore: '',
    researchDuration: '',
    timeline: [
        {
            milestone: '100',
            releaseAmount: '0',
            comments: '',
        },
    ],
};

const CreateRequest = () => {
    const [formData, setFormData] = useState<FormDataType>(initialState);

    const { requestType } = useParams();

    const { library, account } = useWeb3React();

    const { update } = useProposals();

    const { openModal, closeModal, setModalData } = useContext(modalContext);
    const { setError } = useContext(errorContext);

    const client = useWeb3Storage();

    const [pdfs, setPdfs] = useState<File[]>([]);
    const [images, setImages] = useState<File[]>([]);

    const totalAmountRequired = useMemo(
        () =>
            formData.timeline.reduce(
                (total, { releaseAmount }) => (total += +releaseAmount),
                0
            ),
        [formData.timeline]
    );

    const navigate = useNavigate();

    const userBalance = useUserBalance(config.addresses.mockToken);

    const { isApproved, mutate } = useIsApproved(
        config.addresses.mockToken,
        config.addresses.platform,
        totalAmountRequired.toString()
    );

    const approve = async () => {
        try {
            setModalData((prev) => ({
                ...prev,
                status: 'Please wait as your approval is being confirmed',
            }));
            openModal('waitingModal');

            const contract = getTokenContract(library.getSigner());

            let useExact = false;

            const estimatedGas = await contract.estimateGas
                .approve(config.addresses.platform, MaxUint256)
                .catch(() => {
                    // general fallback for tokens who restrict approval amounts
                    useExact = true;

                    return contract.estimateGas.approve(
                        config.addresses.platform,
                        parseUnits(totalAmountRequired.toString())
                    );
                });

            const approve = await contract.approve(
                config.addresses.platform,
                useExact ? parseUnits(totalAmountRequired.toString()) : MaxUint256,
                {
                    gasLimit: calculateMargin(estimatedGas),
                }
            );

            await approve.wait();

            await mutate();
        } catch (error) {
            setError(error);
        } finally {
            closeModal('waitingModal');
        }
    };

    const validate = () => {
        if (!pdfs.length) {
            openModal('warningModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Notice',
                message: 'Proposal PDF is required',
            }));
            return false;
        }

        if (!images.length) {
            openModal('warningModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Notice',
                message: 'Proposal Gallery is required',
            }));
            return false;
        }

        if (totalAmountRequired <= 0) {
            openModal('warningModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Notice',
                message: 'USDC to be released cannot be zero',
            }));
            return false;
        }

        if (userBalance && toBigNumber(totalAmountRequired.toString()).gt(userBalance)) {
            openModal('warningModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Notice',
                message: 'Insufficient USDC',
            }));
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (validate() && process.env.REACT_APP_WEB3_STORAGE_API && client && account) {
            try {
                openModal('waitingModal');
                setModalData((prev) => ({
                    ...prev,
                    status: 'Please wait as your IPFS storage is being created',
                }));

                const pdfCID = await client.put(pdfs);
                const imagesCID = await client.put(images);

                setModalData((prev) => ({
                    ...prev,
                    status: 'Please wait as your transaction is being confirmed',
                }));

                const platformContract = getPlatformContract(library.getSigner());

                const proposal = await platformContract.createResearchProposal(
                    formData.title,
                    formData.description,
                    account,
                    pdfCID,
                    imagesCID,
                    formData.timeline
                        .sort((a, b) => +a.milestone - +b.milestone)
                        .map(({ comments, releaseAmount, milestone }) => ({
                            comment: comments,
                            payoutAmount: parseUnits(releaseAmount),
                            percentage: milestone,
                        }))
                );

                await proposal.wait();

                await update();

                openModal('successModal');
                setModalData((prev) => ({
                    ...prev,
                    status: 'Success!',
                    message:
                        'Your proposal has been submitted. Registered researchers can now apply to contribute. Review applications on the Proposal page.',
                }));

                navigate('/ongoing-requests');
            } catch (error) {
                setError(error);
            } finally {
                closeModal('waitingModal');
            }
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === 'fundingAmount' ? preventOverflow(value) : value,
        }));
    };

    const handleTimelineChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        timelineIndex: number
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            timeline: prev.timeline.map((prevTimeline, index) =>
                index === timelineIndex
                    ? { ...prevTimeline, [name]: value }
                    : prevTimeline
            ),
        }));
    };

    const handleAddTimeline = () => {
        setFormData((prev) => ({
            ...prev,
            timeline: [
                ...prev.timeline,
                {
                    milestone: '',
                    releaseAmount: '',
                    comments: '',
                },
            ],
        }));
    };

    const removeTimeline = (timelineIndex: number) => {
        setFormData((prev) => ({
            ...prev,
            timeline: prev.timeline.filter((_, index) => index !== timelineIndex),
        }));
    };

    return (
        <section id='create-request'>
            <div className='container'>
                <h1>
                    Create a <span>{requestType ?? ''}</span> Request
                </h1>
                <p>
                    This form will be published on the Research Request page where
                    registered Researchers can apply to win the right to carry out this
                    research goal. The Milestones are each secured by an escrow vault that
                    only you have the capacity to unlock.
                </p>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Title</span>
                        <input
                            type='text'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        <span>Short Description</span>
                        <textarea
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            maxLength={64}
                            required
                        />
                    </label>
                    <div className='request-details'>
                        <div className='min-trust-score'>
                            <label>
                                <span>Minimum Trust Score</span>
                                <TextInput
                                    variant='number'
                                    name='minTrustScore'
                                    value={formData.minTrustScore}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className='research-duration'>
                            <label>
                                <span>Research Duration</span>
                                <TextInput
                                    variant='number'
                                    name='researchDuration'
                                    value={formData.researchDuration}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                    </div>
                    <div className='milestone-timeline'>
                        <span>
                            Milestone Timeline (Required USDC :{' '}
                            {formData.timeline.reduce(
                                (total, timeline) => (total += +timeline.releaseAmount),
                                0
                            )}
                            )
                        </span>
                        <div className='timelines'>
                            {formData.timeline.map((data, index) => (
                                <div
                                    className={`timeline ${index === 0 ? 'default' : ''}`}
                                    key={index}
                                >
                                    <label className='percent-completion'>
                                        <span>Milestone (%)</span>
                                        <TextInput
                                            variant='number'
                                            name='milestone'
                                            min={0}
                                            max={100}
                                            value={data.milestone}
                                            onChange={(e) =>
                                                handleTimelineChange(e, index)
                                            }
                                            readOnly={index === 0}
                                            required
                                        />
                                    </label>
                                    <label className='release-amount'>
                                        <span>USDC to be released</span>
                                        <TextInput
                                            variant='number'
                                            name='releaseAmount'
                                            value={data.releaseAmount}
                                            onChange={(e) =>
                                                handleTimelineChange(e, index)
                                            }
                                            required
                                        />
                                    </label>
                                    <label className='comments'>
                                        <span>Comments</span>
                                        <textarea
                                            name='comments'
                                            value={data.comments}
                                            onChange={(e) =>
                                                handleTimelineChange(e, index)
                                            }
                                            maxLength={64}
                                            required
                                        />
                                    </label>
                                    <div className='cross-icon'>
                                        {index !== 0 && (
                                            <CrossIcon
                                                onClick={() => removeTimeline(index)}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                            <Button variant='tertiary' onClick={handleAddTimeline}>
                                Add row
                            </Button>
                        </div>
                    </div>
                    <div className='proposed-timeline'>
                        <span>Your Proposed Timeline</span>
                        <Timeline data={formData.timeline} />
                    </div>
                    <div className='proposal-file-uploads'>
                        <Dropzone
                            title='Insert detailed proposal here:'
                            description='Drag and drop in PDF Form or'
                            files={pdfs}
                            setFiles={(files) => setPdfs(files)}
                            accept={{
                                'application/pdf': ['.pdf'],
                            }}
                            multiple={false}
                        />
                        <Dropzone
                            title='Insert proposal display image for ipNFT:'
                            description='Drag and drop in PNG/JPG Form:'
                            files={images}
                            setFiles={(files) => setImages(files)}
                            accept={{
                                'image/png': ['.png', '.jpeg', '.jpg'],
                            }}
                            multiple={false}
                        />
                    </div>
                    <div className='action-container'>
                        {isApproved ? (
                            <Button type='submit'>Submit</Button>
                        ) : (
                            <Button onClick={approve}>Approve</Button>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateRequest;
