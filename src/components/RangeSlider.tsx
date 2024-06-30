import React from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

interface RangeSliderProps {
    min: number;
    max: number;
    range: [number, number] | null;
    setRange: React.Dispatch<React.SetStateAction<[number, number] | null>>;
    label: string;
    step: number;
}
const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, range, setRange, label, step }) => {
    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setRange([newValue, newValue]);
        } else if (Array.isArray(newValue)) {
            setRange(newValue as [number, number]);
        }
    };

    return (
        <div className="w-full flex flex-col items-center relative p-3">
           
            <p className="text-lg font-bold text-center p-2 m-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">{label}</span>
            </p>
            
            <Slider
                id={label.toLowerCase()}
                value={range ?? [min, max]}
                onChange={handleChange}
                min={min}
                max={max}
                step={step}
                valueLabelDisplay="auto"
                aria-labelledby={`${label}-slider`}
                sx={{                    
                    color: '#c23c08',
                    '& .MuiSlider-thumb': {
                        width: 16,
                        height: 16,
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: '0px 0px 0px 8px rgba(194, 60, 8, 0.16)',
                        },
                    },
                    '& .MuiSlider-track': {
                        borderRadius: 4,
                    },
                    '& .MuiSlider-rail': {
                        opacity: 0.3,
                    },
                }}
            />
            <p className="text-white text-xl text-center p-2 mt-2">
{range && range[0] === range[1] ? range[0] : `${range ? `${range[0]} - ${range[1]}` : `${min} - ${max}`}`}
            </p>
        </div>
    );
};

export default RangeSlider;
