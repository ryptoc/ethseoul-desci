import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CrossIcon, TokenIcons } from '../../assets/icons';
import TextInput from '../../components/TextInput';
import { Tokens } from '../../config/constants';
import { preventOverflow } from '../../web3/utils';
import { useDropzone, FileWithPath } from 'react-dropzone';
import Button from '../../components/Button';
import Timeline from '../../components/Timeline';

type FormDataType = {
    title: string;
    description: string;
    fundingAmount: string;
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
    fundingAmount: '',
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

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const { requestType } = useParams();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section id='create-request'>
            <div className='container'>
                <h1>
                    Create a <span>{requestType ?? ''}</span> Request
                </h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                    porttitor euismod ligula a consequat. Mauris non porta ex. Phasellus
                    pretium tincidunt ornare. Nulla neque nisl, auctor vel orci efficitur,
                    facilisis condimentum nunc.
                </p>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Title</span>
                        <input
                            type='text'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>Short Description</span>
                        <textarea
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>
                    <div className='request-details'>
                        <div className='funding-amount'>
                            <label>
                                <span>Funding Amount</span>
                                <div className='amount'>
                                    {TokenIcons[Tokens.USDC]}
                                    <span>USDC</span>
                                    <TextInput
                                        variant='number'
                                        name='fundingAmount'
                                        value={formData.fundingAmount}
                                        onChange={handleChange}
                                    />
                                </div>
                            </label>
                        </div>
                        <div className='min-trust-score'>
                            <label>
                                <span>Minimum Trust Score</span>
                                <TextInput
                                    variant='number'
                                    name='minTrustScore'
                                    value={formData.minTrustScore}
                                    onChange={handleChange}
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
                                />
                            </label>
                        </div>
                    </div>
                    <div className='milestone-timeline'>
                        <span>Milestone Timeline</span>
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
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                        <aside>
                            <h4>Files</h4>
                            <ul>{files.length ? files : 'No files uploaded...'}</ul>
                        </aside>
                    </div>
                    <div className='action-container'>
                        <Button variant='tertiary'>Cancel</Button>
                        <Button type='submit' variant='tertiary'>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateRequest;
