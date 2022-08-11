import React, { ReactNode, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { ChevronIcon } from '../../assets/icons';
import Button from '../Button';
import Dropdown, { DropdownItem } from '../Dropdown';

interface Props<TOption> {
    options: TOption[];
    optionKey: keyof TOption;
    isOpen?: boolean;
    className?: string;
    onChange?: (option: TOption, optionKey: keyof TOption) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>, selectedOption: TOption) => void;
    renderOption?: (option: TOption) => ReactNode;
    renderSelected?: (selectedOption: TOption) => ReactNode;
    setIsOpen?: (open: boolean) => void;
}

const Select = <TOption,>({
    options,
    optionKey,
    isOpen,
    className = '',
    onChange,
    onClick,
    renderOption,
    renderSelected,
    setIsOpen,
}: Props<TOption>) => {
    const [active, setActive] = useState(options[0]);
    const [open, setOpen] = useState(false);

    const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e, active);
        }

        if (setIsOpen) {
            setIsOpen(!isOpen);
            return;
        }

        setOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        if (setIsOpen && isOpen) {
            setIsOpen(false);
            return;
        }

        if (open) {
            setOpen(false);
        }
    };

    const handleOptionChange = (option: TOption) => {
        onChange && onChange(option, optionKey);
        setActive(option);
        closeDropdown();
    };

    return (
        <ClickAwayListener onClickAway={closeDropdown}>
            <div className={`select-custom ${className}`}>
                <Button
                    variant='tertiary'
                    className='selected-label'
                    onClick={toggleDropdown}
                >
                    {renderSelected ? renderSelected(active) : `${active[optionKey]}`}
                </Button>
                <Dropdown open={isOpen ?? open}>
                    {options.map((option, index) => (
                        <DropdownItem
                            key={index}
                            active={active[optionKey] === option[optionKey]}
                            onClick={() => handleOptionChange(option)}
                        >
                            {renderOption ? renderOption(option) : `${option[optionKey]}`}
                        </DropdownItem>
                    ))}
                </Dropdown>
                <ChevronIcon />
            </div>
        </ClickAwayListener>
    );
};

export default Select;
