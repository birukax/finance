import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProrationType } from './slices';
import { AppState, AppDispatch } from '../../utils/store';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const Create = () => {
    const [formData, setFormData] = useState({
        name: '',
    })
    const { prorationType } = useSelector((state: AppState) => state.prorationType)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createProrationType(formData)).unwrap();
            toast.success('Proration Type created successfully');
            navigate('/proration-type/list');
        } catch (err) {
            toast.error(prorationType?.error?.error || 'Error while creating Proration Type!')
        }
    }

    return (
        <div className=' min-h-full w-fit mx-auto mt-4'>
            <div className=' w-md max-w-md items-center border rounded-2xl p-6'>
                <div className='mb-2'>
                    <p className='font-semibold text-lg'>
                        Create Proration Type
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid w-full max-w-sm items-center gap-3'>
                        <Label htmlFor='name' className='text-base'>Name</Label>
                        <Input
                            type='text'
                            id='name'
                            name='name'
                            required
                            value={formData.name}
                            placeholder='Name'
                            onChange={handleChange}
                        />
                        {
                            prorationType?.error?.name &&
                            <p className='text-red-500 text-sm'>
                                {prorationType?.error?.name}
                            </p>
                        }
                    </div>
                    <Button size='sm' type='submit' className='mt-2'>Create</Button>

                </form>
            </div>
        </div>

    )
}

export default Create;