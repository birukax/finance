import { useEffect, useState } from 'react';
import { AppState, AppDispatch } from '../../utils/store';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchOutputs, updateOutputs } from './slices';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button'


const List = () => {
    const outputs = useSelector((state: AppState) => state.output.outputs)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchOutputs());
    }, [])

    const handleUpdate = async () => {
        try {

            await dispatch(updateOutputs()).unwrap();
            await dispatch(fetchOutputs()).unwrap();
        } catch (error) {
            console.log(error)
        }

    }

    if (outputs.error != null) {
        toast.error(JSON.stringify(outputs.error || 'Error'))
    }

    return (
        <div className='w-auto h-full '>
            <h2 className='text-lg' >Output List</h2>
            <Button size='sm' disabled={outputs.loading} onClick={() => handleUpdate()}> Update List</Button>
            <Table>
                <TableCaption> A list of all NAV Outputs.</TableCaption>
                <TableHeader className='text-gray-200 bg-gray-100'>
                    <TableRow className='text-base'>
                        <TableHead>Date</TableHead>
                        <TableHead >Entry No.</TableHead>
                        <TableHead>Order No.</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>UoM</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {outputs?.data?.length > 0 &&
                        outputs?.data?.map((output) => (
                            <TableRow key={output.id}>
                                <TableCell>{String(output.posting_date)}</TableCell>
                                <TableCell>{output.entry_no}</TableCell>
                                <TableCell>{output.order ? output.order.no : ''}</TableCell>
                                <TableCell>{output.location ? output.location?.code : ''}</TableCell>
                                <TableCell>{output.order?.item ? output.order?.item?.name : ''}</TableCell>
                                <TableCell>{String(output.uom)}</TableCell>
                                <TableCell className="text-right">{String(output.quantity.toLocaleString())}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default List;