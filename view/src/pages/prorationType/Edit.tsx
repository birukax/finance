import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProrationType, updateProrationType } from './slices';
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
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';


const Edit = () => {
    const { id } = useParams();
    const { prorationType } = useSelector((state: AppState) => state.prorationType)
    const { locations } = useSelector((state: AppState) => state.location)
    const [formData, setFormData] = useState({
        active: false,
        location_id: '',
    })
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            try {
                dispatch(fetchLocations()).unwrap()
                dispatch(fetchProrationType(id)).unwrap()
            } catch (error) {
                toast.error(error)
            }
        }
    }, [])
    useEffect(() => {
        setFormData({
            active: prorationType?.data?.active || false,
            location_id: String(prorationType?.data?.location?.id) || null,
        })
    }, [dispatch, prorationType.data])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateProrationType({ id, formData })).unwrap();
            navigate('/proration-type/list')
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className='min-h-full w-fit mx-auto mt-4'>
            <div className="w-md max-w-md items-center border rounded-2xl p-6">
                <div className='mb-2'>
                    <p className='font-semibold text-lg'>
                        Edit Proration Type
                        <span className='ml-4 font-normal text-gray-700'>
                            - {prorationType?.data?.name}
                        </span>
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid grid-cols-2 gap-2 items-center' >
                        <Label htmlFor='active'>Active</Label>
                        <Switch disabled={prorationType.loading} name='active' onCheckedChange={(checked) => setFormData({ ...formData, active: checked as boolean })} checked={formData.active} id='active' />
                    </div>
                    <div className='grid grid-cols-2 gap-2 items-center'>
                        <Label htmlFor='location_id' >Location</Label>
                        <Select disabled={prorationType.loading} name='location_id' onValueChange={(value) => setFormData({ ...formData, location_id: value })} value={formData.location_id} >
                            <SelectTrigger>
                                <SelectValue placeholder='Select Location' />
                            </SelectTrigger>
                            <SelectContent>
                                {locations?.data &&
                                    locations.data.map((location) => (
                                        <SelectItem key={location.id} value={String(location.id)}>{location.code}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-4">

                        <Button size='sm' type='submit' className='mt-2'>Save</Button>
                        <Button size='sm' variant='outline' className='mt-2' onClick={() => navigate('/proration-type/list')}>Cancel</Button>
                    </div>


                </form>
            </div>
        </div >
    )

}

export default Edit;