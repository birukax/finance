import { useEffect, useState } from 'react';
import { AppState, AppDispatch } from '../../utils/store';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchProrations } from './slices';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react';

const List = () => {
    const prorations = useSelector((state: AppState) => state.proration.prorations)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchProrations());
    }, [])


    if (prorations.error != null) {
        toast.error(JSON.stringify(prorations.error || 'Error'))
    }

    return (
        <div className='w-auto h-full '>
            <h2 className='text-lg' >Proration List</h2>
            <div className='w-fit'>
                <Button size='sm' asChild className='flex items-center gap-1' >
                    <Link to='/proration/create'>
                        <Plus />
                        <span>
                            New
                        </span>
                    </Link>
                </Button>
            </div>
            <Table>
                <TableCaption> A list of all Prorations.</TableCaption>
                <TableHeader className='text-gray-200 bg-gray-100'>
                    <TableRow className='text-base'>
                        <TableHead>Reference</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {prorations?.data.length > 0 &&
                        prorations?.data?.map((proration) => (
                            <TableRow key={proration.id}>
                                <TableCell>{proration.reference}</TableCell>
                                <TableCell>{proration.start_date}</TableCell>
                                <TableCell>{proration.end_date}</TableCell>
                                <TableCell className='items-center'><Button variant='link' size='sm' onClick={() => navigate(`/proration/${proration.id}/edit`)}>Edit</Button></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default List;