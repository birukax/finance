import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLabelPerHour, createLabelPerHour } from './slices';
import { fetchItems } from '../item/slices';
import { fetchLocations } from '../location/slices';
import { AppState, AppDispatch } from '../../utils/store';
import { toast } from 'react-toastify';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';


const Edit = () => {
    const { labelPerHour } = useSelector((state: AppState) => state.labelPerHour)
    const { items } = useSelector((state: AppState) => state.item)
    const { locations } = useSelector((state: AppState) => state.location)
    const [formData, setFormData] = useState({
        item_id: '',
        location_id: '',
        quantity: 0,
    })
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    useEffect(() => {
        try {
            dispatch(fetchItems()).unwrap()
            dispatch(fetchLocations()).unwrap()
        } catch (error) {
            toast.error(error)
        }
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == 'quantity' && value < 0) {
            return
        }
        setFormData({ ...formData, [name]: value })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createLabelPerHour(formData)).unwrap();
            navigate('/label-per-hour/list')
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className='min-h-full w-fit mx-auto mt-4'>
            <div className="w-md max-w-md items-center blabelPerHour rounded-2xl p-6">
                <div className='mb-2'>
                    <p className='font-semibold text-lg'>
                        Edit Label Per Hour
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4'>

                    <div className='grid grid-cols-3 gap-2 items-center' >
                        <div>
                            <Label htmlFor='quantity'>Quantity</Label>
                        </div>
                        <div className='col-span-2'>
                            <Input min={0} value={formData.quantity} type='number' disabled={labelPerHour.loading} name='quantity' onChange={handleChange} id='quantity' />
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-2 items-center'>
                        <div>
                            <Label htmlFor='item_id' >Item</Label>
                        </div>
                        <div className='col-span-2'>
                            <Select disabled={labelPerHour.loading} name='item_id' onValueChange={(value) => setFormData({ ...formData, item_id: value })} value={formData.item_id}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select Item' />
                                </SelectTrigger >
                                <SelectContent className='w-full'>
                                    {items?.data &&
                                        items.data.map((item) => (
                                            <SelectItem key={item.id} value={String(item.id)}>{item.name} - {item.no}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-2 items-center'>
                        <div>
                            <Label htmlFor='location_id' >Location</Label>
                        </div>
                        <div className='col-span-2'>
                            <Select disabled={labelPerHour.loading} name='location_id' onValueChange={(value) => setFormData({ ...formData, location_id: value })} value={formData.location_id}>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select Location' />
                                </SelectTrigger>
                                <SelectContent className='w-full'>
                                    {locations?.data &&
                                        locations.data.map((location) => (
                                            <SelectItem key={location.id} value={String(location.id)}>{location.code}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex gap-4">

                        <Button size='sm' type='submit' className='mt-2'>Save</Button>
                        <Button size='sm' variant='outline' className='mt-2' onClick={() => navigate('/label-per-hour/list')}>Cancel</Button>
                    </div>


                </form>
            </div>
        </div >
    )

}

export default Edit;