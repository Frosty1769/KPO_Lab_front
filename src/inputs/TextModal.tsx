import {useEffect, useState} from 'react'
import ModalBase from '../modal/ModalBase';
import TextBox from './TextBox';
import Button from './Button';

interface Props {
    open: boolean,
    onOpenChange(value: boolean): void,
    value: string | number | undefined,

    onConfirm(value: string): void
}

const TextModal = (props: Props) => {
    const [value, setValue] = useState<string>(String(props.value || ''));

    const onSave = () => {
        props.onConfirm(value)
    }

    useEffect(()=>{
        props.value !== undefined    && setValue(String(props.value))
    }, [props.value])

    return (
        <ModalBase
            open={props.open}
            onOpenChange={(props.onOpenChange)}
        >
            <div className='w-[150px] flex gap-1 p-1'>
                <TextBox
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                />
                <Button size='big-icon' onClick={()=>onSave()}>✔</Button>
            </div>
        </ModalBase>
    )
}

export default TextModal;