import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    variant?: 'text' | 'number';
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    min?: number;
    max?: number;
}

const TextInput: React.FC<Props> = ({
    className,
    variant = 'text',
    onChange = () => {},
    name,
    min,
    max,
    ...rest
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if ((min && +value < min) || (max && +value > max)) return;

        if (
            (value !== '.' &&
                +value < Number.MAX_SAFE_INTEGER &&
                value.match('^[0-9]*[.]?[0-9]*$')) ||
            variant === 'text'
        ) {
            onChange(event);
        }
    };

    return (
        <input
            type='text'
            inputMode={variant === 'number' ? 'decimal' : 'text'}
            pattern='^[0-9]*[.]?[0-9]*$'
            name={name}
            onChange={handleChange}
            className={`text-input ${className}`}
            {...rest}
        />
    );
};

export default TextInput;
