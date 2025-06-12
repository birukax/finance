import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLabelPerHour, updateLabelPerHour } from './slices';
import { AppState, AppDispatch } from '../../utils/store';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';


const Edit = () => {
    const { id } = useParams();
    const { labelPerHour } = useSelector((state: AppState) => state.labelPerHour)
    const [formData, setFormData] = useState({
        quantity: 0,
    })
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            try {
                dispatch(fetchLabelPerHour(id)).unwrap()
            } catch (error) {
                toast.error(error)
            }
        }
    }, [])
    useEffect(() => {
        setFormData({
            quantity: labelPerHour?.data?.quantity || 0
        })
    }, [labelPerHour.data])
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
            await dispatch(updateLabelPerHour({ id, formData })).unwrap();
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
                        Edit LabelPerHour
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4'>

                    <div className='grid grid-cols-2 gap-2 items-center' >
                        <Label htmlFor='quantity'>Quantity</Label>
                        <Input min={0} type='number' disabled={labelPerHour.loading} name='quantity' value={formData.quantity} onChange={handleChange} id='quantity' />
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