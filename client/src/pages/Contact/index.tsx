import React, { FormEvent, useState } from 'react';
import Button from '../../components/Button';
import JoinDiscord from './JoinDiscord';

const initialState = {
    name: '',
    email: '',
    message: '',
};

const Contact = () => {
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section id='contact'>
            <div className='container'>
                <div className='inner__left'>
                    <h1>Contact</h1>
                    <p>
                        For any enquiries, please fill out the contact form and the
                        DeSciWorld team will get back to you.
                    </p>
                    <JoinDiscord />
                </div>
                <div className='inner__right'>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Name</span>
                            <input
                                type='text'
                                value={formData.name}
                                onChange={handleChange}
                                name='name'
                                placeholder='John Doe'
                                required
                            />
                        </label>
                        <label>
                            <span>Email</span>
                            <input
                                type='email'
                                value={formData.email}
                                onChange={handleChange}
                                name='email'
                                placeholder='john@doe.com'
                                required
                            />
                        </label>
                        <label>
                            <span>Message</span>
                            <textarea
                                value={formData.message}
                                onChange={handleChange}
                                name='message'
                                placeholder='Your message...'
                                required
                            />
                        </label>
                        <Button variant='secondary' type='submit'>
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
