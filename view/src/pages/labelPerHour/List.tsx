import { useEffect, useState } from 'react';
import { AppState, AppDispatch } from '../../utils/store';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchLabelPerHours, updateLabelPerHours } from './slices';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react';

const List = () => {
    const labelPerHours = useSelector((state: AppState) => state.labelPerHour.labelPerHours)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchLabelPerHours());
    }, [])

    const handleUpdate = async () => {
        try {

            await dispatch(updateLabelPerHours()).unwrap();
            await dispatch(fetchLabelPerHours()).unwrap();
        } catch (error) {
            console.log(error)
        }

    }

    if (labelPerHours.error != null) {
        toast.error(JSON.stringify(labelPerHours.error || 'Error'))
    }

    return (
        <div className='w-auto h-full '>
            <h2 className='text-lg' >Label Per Hour List</h2>
            <div className='w-fit'>
                <Button size='sm' asChild className='flex items-center gap-1' >
                    <Link to='/label-per-hour/create'>
                        <Plus />
                        <span>
                            New
                        </span>
                    </Link>
                </Button>
            </div>
            <Table>
                <TableCaption> A list of all Label Per Hours.</TableCaption>
                <TableHeader className='text-gray-200 bg-gray-100'>
                    <TableRow className='text-base'>
                        <TableHead>Location</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>UoM</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {labelPerHours?.data != [] &&
                        labelPerHours?.data?.map((labelPerHour) => (
                            <TableRow key={labelPerHour.id}>
                                <TableCell>{labelPerHour.location ? labelPerHour.location.code : ''}</TableCell>
                                <TableCell>{labelPerHour.item ? labelPerHour.item.name : ''}</TableCell>
                                <TableCell className={labelPerHour.quantity === 0 && "text-red-500"}>{labelPerHour.quantity}</TableCell>
                                <TableCell>{labelPerHour.item ? labelPerHour.item.unit_of_measure : ''}</TableCell>
                                <TableCell className='items-center'><Button variant='link' size='sm' onClick={() => navigate(`/label-per-hour/${labelPerHour.id}/edit`)}>Edit</Button></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div >
    )
}

export default List;