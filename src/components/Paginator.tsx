import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginatorProps {
    isLoading: boolean;
    numberOfPages: number | null;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ isLoading, numberOfPages, currentPage, onPageChange }) => {
    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        onPageChange(page);
    };

    return (
        <div className={`bg-white p-2 rounded-xl ${isLoading ? 'hidden' : 'block'}`}>
            <Stack spacing={2} sx={{ justifyContent: 'center' }}>
                <Pagination
                    count={numberOfPages ?? 0}
                    size="large"
                    page={currentPage}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            backgroundColor: 'black',
                            color: 'white',
                            borderColor: 'white',
                        },
                        '& .MuiPaginationItem-root:hover': {
                            backgroundColor: 'gray',
                            color: 'black',
                        },
                        '& .Mui-selected': {
                            backgroundColor: '#fd9cff !important',
                            color: 'black !important',
                        },
                        '& .MuiPaginationItem-ellipsis': {
                            color: 'white',
                        },
                    }}
                />
            </Stack>
        </div>
    );
};

export default Paginator;
