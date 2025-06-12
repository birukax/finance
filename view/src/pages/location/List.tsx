import { useEffect, useState } from 'react';
import { AppState, AppDispatch } from '../../utils/store';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchLocations, updateLocations } from './slices';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button'


const List = () => {
    const locations = useSelector((state: AppState) => state.location.locations)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchLocations());
    }, [])

    const handleUpdate = async () => {
        try {

            await dispatch(updateLocations()).unwrap();
            await dispatch(fetchLocations()).unwrap();
        } catch (error) {
            console.log(error)
        }

    }

    if (locations.error != null) {
        toast.error(JSON.stringify(locations.error || 'Error'))
    }

    return (
        <div className='w-auto h-full '>
            <h2 className='text-lg' >Location List</h2>
            <Button size='sm' onClick={() => handleUpdate()}> Update List</Button>
            <Table>
                <TableCaption> A list of all NAV Locations.</TableCaption>
                <TableHeader className='text-gray-200 bg-gray-100'>
                    <TableRow className='text-base'>
                        <TableHead >Code</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {locations?.data != [] &&
                        locations?.data?.map((location) => (
                            <TableRow key={location.id}>
                                <TableCell>{location.code}</TableCell>
                                <TableCell>{location.name}</TableCell>
                                <TableCell>{String(location.active)}</TableCell>
                                <TableCell className='items-center'><Button variant='link' size='sm' onClick={() => navigate(`/location/${location.id}/edit`)}>Edit</Button></TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default List;