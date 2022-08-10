import React, { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CrossIcon } from '../../assets/icons';
import TextInput from '../../components/TextInput';
import { preventOverflow } from '../../web3/utils';
import Button from '../../components/Button';
import Timeline from '../../components/Timeline';
import Dropzone from '../../components/Dropzone';

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

    const [pdfs, setPdfs] = useState<File[]>([]);
    const [images, setImages] = useState<File[]>([]);

    const handleSubmit = (e: FormEvent) => {
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
                    <div className='proposal-file-uploads'>
                        <Dropzone
                            title='Insert detailed proposal here:'
                            description='Drag and drop in PDF Form or'
                            files={pdfs}
                            setFiles={(files) => setPdfs(files)}
                            accept={{
                                'application/pdf': ['.pdf'],
                            }}
                        />
                        <Dropzone
                            title='Insert images for proposal gallery here:'
                            description='Drag and drop in PNG/JPG Form:'
                            files={images}
                            setFiles={(files) => setImages(files)}
                            accept={{
                                'image/png': ['.png', '.jpeg', '.jpg'],
                            }}
                        />
                    </div>
                    <div className='action-container'>
                        <Button type='submit' onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateRequest;
