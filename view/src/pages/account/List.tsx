import { useEffect, useState } from 'react';
import { AppState, AppDispatch } from '../../utils/store';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchAccounts, updateAccounts } from './slices';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button'


const List = () => {
    const accounts = useSelector((state: AppState) => state.account.accounts)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchAccounts());
    }, [])

    const handleUpdate = async () => {
        try {

            await dispatch(updateAccounts()).unwrap();
            await dispatch(fetchAccounts()).unwrap();
        } catch (error) {
            console.log(error)
        }

    }

    if (accounts.error != null) {
        toast.error(JSON.stringify(accounts.error || 'Error'))
    }

    return (
        <div className='w-auto h-full '>
            <h2 className='text-lg' >Account List</h2>
            <Button size='sm' onClick={() => handleUpdate()}> Update List</Button>
            <Table>
                <TableCaption> A list of all NAV Accounts.</TableCaption>
                <TableHeader className='text-gray-200 bg-gray-100'>
                    <TableRow className='text-base'>
                        <TableHead >No.</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Proration type</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {accounts?.data != [] &&
                        accounts?.data?.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell>{account.no}</TableCell>
                                <TableCell>{account.name}</TableCell>
                                <TableCell>{account.proration_type ? account.proration_type.name : ''}</TableCell>
                                <TableCell>{String(account.active)}</TableCell>
                                <TableCell className="items-center"><Button variant='link' size="sm" onClick={() => navigate(`/account/${account.id}/edit`)}>Edit</Button></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default List;