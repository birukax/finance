import { useEffect, useState } from 'react';
import { AppState, AppDispatch } from '../../utils/store';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchProrationTypes } from './slices';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react';

const List = () => {
    const prorationTypes = useSelector((state: AppState) => state.prorationType.prorationTypes)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchProrationTypes());
    }, [])


    if (prorationTypes.error != null) {
        toast.error(JSON.stringify(prorationTypes.error || 'Error'))
    }

    return (
        <div className='w-auto h-full '>
            <h2 className='text-lg' >ProrationType List</h2>
            <div className='w-fit'>
                <Button size='sm' asChild className='flex items-center gap-1' >
                    <Link to='/proration-type/create'>
                        <Plus />
                        <span>
                            New
                        </span>
                    </Link>
                </Button>
            </div>
            <Table>
                <TableCaption> A list of all Proration Types.</TableCaption>
                <TableHeader className='text-gray-200 bg-gray-100'>
                    <TableRow className='text-base'>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {prorationTypes?.data != [] &&
                        prorationTypes?.data?.map((prorationType) => (
                            <TableRow key={prorationType.id}>
                                <TableCell>{prorationType.name}</TableCell>
                                <TableCell>{prorationType.location && prorationType.location?.code}</TableCell>
                                <TableCell>{String(prorationType.active)}</TableCell>
                                <TableCell className='items-center'><Button variant='link' size='sm' onClick={() => navigate(`/proration-type/${prorationType.id}/edit`)}>Edit</Button></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default List;