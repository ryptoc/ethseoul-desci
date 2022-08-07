import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TokenIcons } from '../../assets/icons';
import TextInput from '../../components/TextInput';
import { Tokens } from '../../config/constants';
import { preventOverflow } from '../../web3/utils';
import { useDropzone, FileWithPath } from 'react-dropzone';
import Button from '../../components/Button';

type FormDataType = {
    title: string;
    description: string;
    fundingAmount: string;
    minTrustScore: number | undefined;
    researchDuration: number | undefined;
};

type TimelineType = {
    progress: number;
};

const initialState = {
    title: '',
    description: '',
    fundingAmount: '',
    minTrustScore: undefined,
    researchDuration: undefined,
};

const CreateRequest = () => {
    const [formData, setFormData] = useState(initialState);

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
                                    name='researchDuration'
                                    value={formData.researchDuration}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className='milestone-timeline'>
                        <span>Milestone Timeline</span>
                        <div className='timeline-container'>
                            <div className='header row'>
                                <div>Percent Completion</div>
                                <div>USDC to be released</div>
                                <div>Comments</div>
                            </div>
                            <div className='row'>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div className='row'>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className='proposed-timeline'>
                        <span>Your Proposed Timeline</span>
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
