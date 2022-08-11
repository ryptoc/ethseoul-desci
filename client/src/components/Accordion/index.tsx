import CollapsibleArea from '../CollapsibleArea';

interface AccordionProps {
    question: string;
    answer: string;
    isOpen: boolean;
    toggle: () => void;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer, isOpen, toggle }) => {
    return (
        <div className={`accordion ${isOpen ? 'collapsed' : ''}`}>
            <div className='accordion-question' onClick={toggle}>
                <span>{question}</span>
                <svg
                    width='48'
                    height='48'
                    viewBox='0 0 48 48'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M4 24C4 12.96 12.96 4 24 4C35.04 4 44 12.96 44 24C44 35.04 35.04 44 24 44C12.96 44 4 35.04 4 24ZM16 22L24 30L32 22L16 22Z'
                        fill='#00303F'
                    />
                </svg>
            </div>
            <CollapsibleArea collapsed={isOpen}>
                <div
                    className='accordion-answer'
                    dangerouslySetInnerHTML={{ __html: answer }}
                />
            </CollapsibleArea>
        </div>
    );
};

export default Accordion;
