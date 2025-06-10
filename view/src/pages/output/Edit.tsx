import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOutput, updateOutput } from './slices';
import { fetchProrationTypes } from '../prorationType/slices';
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
    const { output } = useSelector((state: AppState) => state.output)
    const { prorationTypes } = useSelector((state: AppState) => state.prorationType)
    const [formData, setFormData] = useState({
        active: false,
        proration_type_id: '',
    })
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            try {
                dispatch(fetchOutput(id)).unwrap()
                dispatch(fetchProrationTypes()).unwrap()
            } catch (error) {
                toast.error(error)
            }
        }
    }, [])
    useEffect(() => {
        setFormData({
            active: output?.data?.active || false,
            proration_type_id: output?.data?.proration_type?.id && String(output?.data?.proration_type?.id),
        })
    }, [dispatch, output])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateOutput({ id, formData })).unwrap();
            navigate('/output/list')
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className='min-h-full w-fit mx-auto mt-4'>
            <div className="w-md max-w-md items-center border rounded-2xl p-6">
                <div className='mb-2'>
                    <p className='font-semibold text-lg'>
                        Edit Output
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid grid-cols-2 gap-2 items-center' >
                        <Label htmlFor='active'>Active</Label>
                        <Switch disabled={output.loading} name='active' onCheckedChange={(checked) => setFormData({ ...formData, active: checked as boolean })} checked={formData.active} id='active' />
                    </div>
                    <div className='grid grid-cols-2 gap-2 items-center'>
                        <Label htmlFor='proration_type_id' >Proration type</Label>
                        <Select disabled={output.loading} name='proration_type_id' onValueChange={(value) => setFormData({ ...formData, proration_type_id: value })} value={formData.proration_type_id}>
                            <SelectTrigger>
                                <SelectValue placeholder='Select Proration Type' />
                            </SelectTrigger>
                            <SelectContent>
                                {prorationTypes?.data &&
                                    prorationTypes.data.map((prorationType) => (
                                        <SelectItem key={prorationType.id} value={String(prorationType.id)}>{prorationType.name}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-4">

                        <Button size='sm' type='submit' className='mt-2'>Save</Button>
                        <Button size='sm' variant='outline' className='mt-2' onClick={() => navigate('/output/list')}>Cancel</Button>
                    </div>


                </form>
            </div>
        </div >
    )

}

export default Edit;