import { useState } from 'react';
import Accordion from '../../components/Accordion';

const faqList = [
    {
        question: 'What is the P2P Research Funding Marketplace?',
        answer: `<p>The DeSciWorld peer-to-peer (P2P) marketplace is designed to connect researchers, scientists and experts to decentralised funding channels. By providing an alternative to traditional institutional funding channels, new and innovative research can flourish like never before. The renaissance of science can occur once again.</p><p>Too often research grants are refused or funding is bottlenecked behind beaurocracy and regulations. Whilst there are valid reasons for this, it undoubtedly hampers progress in the field of science. Further, the institutions that exist today often act as a gatekeeper against those exploring a passion in research. Impoverished peoples are given fewer opportunities and elitist cultures within the research community can discourage potential geniuses from pursuing their ideas.</p>`,
    },
    {
        question: 'What is a “Trust Score”?',
        answer: `<p>An integral part of the decentralised research process is verifiability of data and of contributions. In traditional science and academia, qualifications and working experience are used to deteremine the ability and legitimacy of a researcher. In DeSci, traditional infrastructures and ideas are being rewritten in favour of open and egalistarian access to the tools of science. However, it is essential that all parties can confidently spend their time or money on research that they know will be completed to a certain standard.</p><p>The Trust Score allows a researcher to compile a standardised, yet anonymised form of academic identy</p>`,
    },
    {
        question: 'What is “Funding Escrow”?',
        answer: `<p>The DeSciWorld peer-to-peer (P2P) marketplace is designed to connect researchers, scientists and experts to decentralised funding channels. By providing an alternative to traditional institutional funding channels, new and innovative research can flourish like never before. The renaissance of science can occur once again.</p><p>Too often research grants are refused or funding is bottlenecked behind beaurocracy and regulations. Whilst there are valid reasons for this, it undoubtedly hampers progress in the field of science. Further, the institutions that exist today often act as a gatekeeper against those exploring a passion in research. Impoverished peoples are given fewer opportunities and elitist cultures within the research community can discourage potential geniuses from pursuing their ideas.</p>`,
    },
    {
        question: 'What is the “Review Committee”?',
        answer: `<p>The DeSciWorld peer-to-peer (P2P) marketplace is designed to connect researchers, scientists and experts to decentralised funding channels. By providing an alternative to traditional institutional funding channels, new and innovative research can flourish like never before. The renaissance of science can occur once again</p>`,
    },
    {
        question: 'What is an ipNFT?',
        answer: `<p>The DeSciWorld peer-to-peer (P2P) marketplace is designed to connect researchers, scientists and experts to decentralised funding channels. By providing an alternative to traditional institutional funding channels, new and innovative research can flourish like never before. The renaissance of science can occur once again.</p><p>Too often research grants are refused or funding is bottlenecked behind beaurocracy and regulations. Whilst there are valid reasons for this, it undoubtedly hampers progress in the field of science. Further, the institutions that exist today often act as a gatekeeper against those exploring a passion in research. Impoverished peoples are given fewer opportunities and elitist cultures within the research community can discourage potential geniuses from pursuing their ideas.</p>`,
    },
];

const Faq = () => {
    const [selectedAccordion, setSelectedAccordion] = useState<number | undefined>();

    const toggleAccordion = (selected: number) => {
        setSelectedAccordion((prev) => (prev === selected ? undefined : selected));
    };

    return (
        <section id='faq'>
            <div className='container'>
                <h2>FAQs</h2>
                <div className='faq-container'>
                    {faqList.map(({ question, answer }, index) => (
                        <Accordion
                            key={index}
                            question={question}
                            answer={answer}
                            isOpen={selectedAccordion === index}
                            toggle={() => toggleAccordion(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
