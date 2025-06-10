import { useEffect, useState } from 'react';
import { AppState, AppDispatch } from '../../utils/store';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchOrders, updateOrders } from './slices';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button'


const List = () => {
    const orders = useSelector((state: AppState) => state.order.orders)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchOrders());
    }, [])

    const handleUpdate = async () => {
        try {

            await dispatch(updateOrders()).unwrap();
            await dispatch(fetchOrders()).unwrap();
        } catch (error) {
            console.log(error)
        }

    }

    if (orders.error != null) {
        toast.error(JSON.stringify(orders.error || 'Error'))
    }

    return (
        <div className='w-auto h-full '>
            <h2 className='text-lg' >Order List</h2>
            <Button size='sm' onClick={() => handleUpdate()}> Update List</Button>
            <Table>
                <TableCaption> A list of all NAV Orders.</TableCaption>
                <TableHeader className='text-gray-200 bg-gray-100'>
                    <TableRow className='text-base'>
                        <TableHead >No.</TableHead>
                        <TableHead>Item No.</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Location</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders?.data != [] &&
                        orders?.data?.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.no}</TableCell>
                                <TableCell>{order.item ? order.item.no : ''}</TableCell>
                                <TableCell>{order.item ? order.item.name : ''}</TableCell>
                                <TableCell>{order.location ? order.location.code : ''}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default List;