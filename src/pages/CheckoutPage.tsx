import { useState } from 'react';
import ScrollArea from '../table/ScrollArea';
import type { OrderItem } from '../interfaces/Checkout';
import Typography from '../Typography';
import TextBox from '../inputs/TextBox';
import SearchIcon from '../icons/SearchIcon';
import { useAuth } from '../hooks/AuthContext';
import Role from '../enums/Role';
import Button from '../inputs/Button';
import { useNavigate } from 'react-router';
import { Path } from '../enums/Path';
import clsx from 'clsx';

interface IProps {
    onLogout: () => void
}

const CheckoutPage = ({
    onLogout,
    ...props
}: IProps) => {
    const [auth] = useAuth();
    const navigate = useNavigate()

    const [selected, setSelected] = useState<string | undefined>(undefined)

    const [orderList, setOrderList] = useState<OrderItem[]>([
        { id: '0', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.92, count: 1 },
        { id: '1', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '2', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.92, count: 3 },
        { id: '3', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '4', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '5', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '6', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '7', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '8', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 2 },
        { id: '9', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '10', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '11', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '12', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '13', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '14', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '15', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '16', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '17', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '18', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '19', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '20', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '21', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '22', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '23', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 },
        { id: '24', name: 'Пиво темное "Белый Медведь" 0.5л', description: "Медоварня Мьольнир", cost: 89.9, count: 1 }
    ])

    const handleSelect = (id: string) => {
        setSelected(id)
    }

    const handleRejectItem = () => {
        if (selected === undefined) return
        let tempList = [...orderList]
        let index = tempList.findIndex(it => it.id === selected)
        if (index === -1) return
        tempList[index].rejected = true
        setOrderList([...tempList])
    }

    const getSum = () => {
        let sum = 0
        orderList.map(it => {
            sum += it.rejected ? 0 : it.count * it.cost
        })
        return Math.round(sum * 100) / 100
    }

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-1/2 bg-backround-secondary h-full flex flex-col gap-8 p-4'>
                <div className='flex gap-4 w-full'>
                    {auth.role !== Role.User &&
                        <Button onClick={() => navigate(Path.Admin)}>
                            Меню
                        </Button>
                    }
                    {auth.role === Role.User &&
                        <Button variant='warning' onClick={onLogout}>
                            Выйти
                        </Button>
                    }
                    <div className='w-full'>
                        <TextBox
                            icon={<SearchIcon />}
                            iconAnchor='right'
                            placeholder='Поиск товара'
                        />
                    </div>
                </div>
                <ScrollArea>
                    <div className='flex flex-1 flex-col'>
                        {orderList.map((item, index) => (
                            <div
                                className={clsx('flex border border-x-transparent border-t-transparent border-accent justify-between items-center', selected === item.id && 'bg-backround-primary/20')}
                                onClick={() => handleSelect(item.id)}
                            >
                                <div className='flex gap-8 items-center'>
                                    <div className='flex flex-col'>
                                        <div className='flex relative'>
                                            <Typography size='h2'>{item.name}</Typography>
                                            {item.rejected && <span className='absolute top-1/2 w-full border-system-red border'></span>}
                                        </div>
                                        <Typography size='h3'>{item.description}</Typography>
                                    </div>
                                    <div className='flex relative'>
                                        <Typography size='h2'>{item.count > 1 && `${item.cost} x ${item.count}`}</Typography>
                                        {item.rejected && <span className='absolute top-1/2 w-full border-system-red border'></span>}
                                    </div>
                                </div>
                                <div className='flex relative'>
                                    <Typography size='h1'>{Math.round(item.cost * item.count * 100) / 100} ₽</Typography>
                                    {item.rejected && <span className='absolute top-1/2 w-full border-system-red border'></span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <div className='bg-backround-primary h-full w-1/2 flex flex-col p-4'>
                <div className='flex items-center gap-4 justify-between w-full h-16 '>
                    <div className='flex border-2 w-full justify-center border-backround-secondary rounded-2xl p-4'>
                        <Typography size='h1'>{`Сумма к оплате ${getSum()}`}</Typography>
                    </div>
                    <Button
                        onClick={handleRejectItem}
                        variant='warning'
                    >Удалить выбранный товар</Button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;