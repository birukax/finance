import { useEffect, useState } from 'react';
import { AppState, AppDispatch } from '../../utils/store';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchRoutings, updateRoutings } from './slices';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button'


const List = () => {
    const routings = useSelector((state: AppState) => state.routing.routings)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchRoutings());
    }, [])

    const handleUpdate = async () => {
        try {

            await dispatch(updateRoutings()).unwrap();
            await dispatch(fetchRoutings()).unwrap();
        } catch (error) {
            console.log(error)
        }

    }

    if (routings.error != null) {
        toast.error(JSON.stringify(routings.error || 'Error'))
    }

    return (
        <div className='w-auto h-full '>
            <h2 className='text-lg' >Routing List</h2>
            <Button size='sm' disabled={routings.loading} onClick={() => handleUpdate()}> Update List</Button>
            <Table>
                <TableCaption> A list of all NAV Routings.</TableCaption>
                <TableHeader className='text-gray-200 bg-gray-100'>
                    <TableRow className='text-base'>
                        <TableHead>Order No.</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Operation No.</TableHead>
                        <TableHead>Machine Center No.</TableHead>
                        <TableHead>Machine Center Name</TableHead>
                        <TableHead>Work Center Code</TableHead>
                        <TableHead>Work Center Group Code</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {routings?.data != [] &&
                        routings?.data?.map((routing) => (
                            <TableRow key={routing.id}>
                                <TableCell>{routing.order ? routing.order.no : ''}</TableCell>
                                <TableCell>{routing.order?.item ? routing.order.item.name : ''}</TableCell>
                                <TableCell>{routing.operation_no}</TableCell>
                                <TableCell>{routing.machine_center_no}</TableCell>
                                <TableCell>{routing.machine_center_name}</TableCell>
                                <TableCell>{routing.work_center_code}</TableCell>
                                <TableCell>{routing.work_center_group_code}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default List;