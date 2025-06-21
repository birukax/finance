import { useEffect, useState } from 'react';
import { AppState, AppDispatch } from '../../utils/store';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchItems, updateItems } from './slices';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button'


const List = () => {
    const items = useSelector((state: AppState) => state.item.items)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchItems());
    }, [])

    const handleUpdate = async () => {
        try {

            await dispatch(updateItems()).unwrap();
            await dispatch(fetchItems()).unwrap();
        } catch (error) {
            console.log(error)
        }

    }

    if (items.error != null) {
        toast.error(JSON.stringify(items.error || 'Error'))
    }

    return (
        <div className='w-auto h-full '>
            <h2 className='text-lg' >Item List</h2>
            <Button size='sm' disabled={items.loading} onClick={() => handleUpdate()}> Update List</Button>
            <Table>
                <TableCaption> A list of all NAV Items.</TableCaption>
                <TableHeader className='text-gray-200 bg-gray-100'>
                    <TableRow className='text-base'>
                        <TableHead >No.</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>UoM</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items?.data != [] &&
                        items?.data?.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.no}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.unit_of_measure}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default List;