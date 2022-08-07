import { AddressZero } from '@ethersproject/constants';
import { TimeConversions } from '../config/constants';

export const formatAccount = (address: string) =>
    `${(address || AddressZero).slice(0, 6)}...${(address || AddressZero).slice(-4)}`;

export const formatUSD = (value: number | string, maxDecimals = 2, minDecimals = 2) => {
    if (!value && value !== 0) {
        console.error('formatUSD: Value is not defined');
        return 0;
    }

    if (isNaN(+value)) {
        console.error('formatUSD: Value is not a number');
        return 0;
    }

    return (+value).toLocaleString('en-US', {
        minimumFractionDigits: minDecimals,
        maximumFractionDigits: maxDecimals,
    });
};

export const formatPercentages = (value: number | string, decimals: number = 2) => {
    if (!value && value !== 0) {
        console.error('formatPercentages: Value is not defined');
        return (0).toFixed(decimals);
    }

    if (isNaN(+value)) {
        console.error('formatPercentages: Value is not a number');
        return (0).toFixed(decimals);
    }

    return (+value).toFixed(decimals);
};

export const formatAmountWithSuffix = (
    value: number | string,
    decimals: number = 2,
    minumumValue?: number
) => {
    if (!value && value !== 0) {
        console.error('formatAmountWithSuffix: Value is not defined');
        return 0;
    }

    if (isNaN(+value)) {
        console.error('formatAmountWithSuffix: Value is not a number');
        return 0;
    }

    const parsedValue = +value;

    if (minumumValue && parsedValue < minumumValue) {
        return parsedValue.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: decimals,
        });
    }

    switch (true) {
        case parsedValue >= 1000000000:
            return `${(parsedValue / 1000000000).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: decimals,
            })}B`;
        case parsedValue >= 1000000:
            return `${(parsedValue / 1000000).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: decimals,
            })}M`;
        case parsedValue >= 1000:
            return `${(parsedValue / 1000).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: decimals,
            })}K`;
        default:
            return parsedValue.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: decimals,
            });
    }
};

export const formatRemainingTime = (
    remainingTime: number | string
): { time: number; unit: string; timeAndUnit: string } => {
    const daysRemaining = Math.floor(+remainingTime / TimeConversions.SECONDS_PER_DAY);

    if (daysRemaining) {
        return {
            time: daysRemaining,
            unit: 'days',
            timeAndUnit: `${daysRemaining} day${daysRemaining > 1 ? 's' : ''}`,
        };
    }

    const hoursRemaining = Math.floor(+remainingTime / TimeConversions.SECONDS_PER_HOUR);

    if (hoursRemaining) {
        return {
            time: hoursRemaining,
            unit: 'hours',
            timeAndUnit: `${hoursRemaining} hour${hoursRemaining > 1 ? 's' : ''}`,
        };
    }

    const minutesRemaining = Math.floor(
        +remainingTime / TimeConversions.SECONDS_PER_MINUTE
    );

    return {
        time: minutesRemaining,
        unit: 'minutes',
        timeAndUnit: `${minutesRemaining} minute${minutesRemaining > 1 ? 's' : ''}`,
    };
};
