import { useState, useEffect } from "react";
import { GetProducts, ProcessSale, Logout } from "../api/functions";
import type { Product, CartItem, SaleRequest } from "../interfaces/Product";
import { toast } from "react-toastify";
import Typography from "../Typography";
import Button from "../inputs/Button";
import TextBox from "../inputs/TextBox";

interface Props {
    onLogout: () => void;
    username: string;
}

const CashierPage = (props: Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [articleInput, setArticleInput] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        GetProducts((res) => {
            if (res.status === 'ok' && res.data) {
                setProducts(res.data);
            }
        });
    };

    const addToCart = () => {
        if (!articleInput.trim()) {
            toast.error("Введите артикул");
            return;
        }

        const product = products.find(p => p.article === articleInput.trim());
        
        if (!product) {
            toast.error("Товар не найден");
            return;
        }

        if (product.quantity === 0) {
            toast.error("Товар закончился на складе");
            return;
        }

        const existingItem = cart.find(item => item.article === product.article);
        
        if (existingItem) {
            if (existingItem.quantity >= product.quantity) {
                toast.error("Недостаточно товара на складе");
                return;
            }
            setCart(cart.map(item => 
                item.article === product.article 
                    ? {...item, quantity: item.quantity + 1}
                    : item
            ));
        } else {
            setCart([...cart, {
                article: product.article,
                name: product.name,
                price: product.price,
                quantity: 1
            }]);
        }

        setArticleInput("");
        setShowAddModal(false);
        toast.success(`${product.name} добавлен в чек`);
    };

    const updateCartQuantity = (article: string, delta: number) => {
        const product = products.find(p => p.article === article);
        const cartItem = cart.find(item => item.article === article);
        
        if (!product || !cartItem) return;

        const newQuantity = cartItem.quantity + delta;
        
        if (newQuantity <= 0) {
            setCart(cart.filter(item => item.article !== article));
            return;
        }

        if (newQuantity > product.quantity) {
            toast.error("Недостаточно товара на складе");
            return;
        }

        setCart(cart.map(item => 
            item.article === article 
                ? {...item, quantity: newQuantity}
                : item
        ));
    };

    const clearCart = () => {
        setCart([]);
        toast.info("Чек очищен");
    };

    const processPayment = () => {
        if (cart.length === 0) {
            toast.error("Чек пуст");
            return;
        }

        const saleRequest: SaleRequest = {
            items: cart.map(item => ({
                article: item.article,
                quantity: item.quantity
            }))
        };

        ProcessSale(saleRequest, (res) => {
            if (res.status === 'ok' && res.data) {
                toast.success(`Оплата успешна! Итого: ${res.data.total_price.toFixed(2)} ₽`);
                setCart([]);
                loadProducts();
            } else {
                toast.error(res.message || "Ошибка при оплате");
            }
        });
    };

    const handleLogout = () => {
        Logout((res) => {
            if (res.status === 'ok') {
                toast.info("Вы вышли из системы");
                props.onLogout();
            }
        });
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className='w-full h-full flex flex-col bg-gray-100'>
            {/* Header */}
            <div className='w-full bg-white shadow-md p-4 flex justify-between items-center'>
                <Typography size='h2'>Касса</Typography>
                <div className='flex items-center gap-4'>
                    <Typography size='h5'>Кассир: {props.username}</Typography>
                    <Button onClick={handleLogout}>
                        <Typography size='h5'>Выйти</Typography>
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 flex gap-4 p-4'>
                {/* Cart Section */}
                <div className='flex-1 flex flex-col bg-white rounded-lg shadow-md p-6'>
                    <div className='flex justify-between items-center mb-4'>
                        <Typography size='h3'>Чек</Typography>
                        <Button onClick={() => setShowAddModal(true)}>
                            <Typography size='h5'>+ Добавить товар</Typography>
                        </Button>
                    </div>

                    {/* Cart Items */}
                    <div className='flex-1 overflow-y-auto space-y-3 mb-4'>
                        {cart.length === 0 ? (
                            <div className='flex items-center justify-center h-full'>
                                <Typography size='h5' className='text-gray-400'>
                                    Чек пуст
                                </Typography>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.article} className='bg-gray-50 rounded-lg p-4 flex justify-between items-center'>
                                    <div className='flex-1'>
                                        <Typography size='h4'>{item.name}</Typography>
                                        <Typography size='h6' className='text-gray-500'>
                                            {item.article}
                                        </Typography>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <Button 
                                            onClick={() => updateCartQuantity(item.article, -1)}
                                            className='w-8 h-8 p-0'
                                        >
                                            -
                                        </Button>
                                        <Typography size='h4'>{item.quantity}</Typography>
                                        <Button 
                                            onClick={() => updateCartQuantity(item.article, 1)}
                                            className='w-8 h-8 p-0'
                                        >
                                            +
                                        </Button>
                                        <Typography size='h4' className='ml-4 w-24 text-right'>
                                            {(item.price * item.quantity).toFixed(2)} ₽
                                        </Typography>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Cart Footer */}
                    <div className='border-t pt-4 space-y-3'>
                        <div className='flex justify-between items-center'>
                            <Typography size='h3'>Итого:</Typography>
                            <Typography size='h2'>{totalPrice.toFixed(2)} ₽</Typography>
                        </div>
                        <div className='flex gap-3'>
                            <Button 
                                onClick={clearCart}
                                className='flex-1 bg-gray-500 hover:bg-gray-600'
                            >
                                <Typography size='h4'>Очистить</Typography>
                            </Button>
                            <Button 
                                onClick={processPayment}
                                className='flex-1 bg-green-600 hover:bg-green-700'
                                disabled={cart.length === 0}
                            >
                                <Typography size='h4'>Оплатить</Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg p-6 w-[400px] shadow-xl'>
                        <Typography size='h3' className='mb-4'>Добавить товар</Typography>
                        <TextBox 
                            placeholder='Введите артикул'
                            value={articleInput}
                            onChange={(e) => setArticleInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') addToCart();
                            }}
                        />
                        <div className='flex gap-3 mt-4'>
                            <Button 
                                onClick={() => {
                                    setShowAddModal(false);
                                    setArticleInput("");
                                }}
                                className='flex-1 bg-gray-500 hover:bg-gray-600'
                            >
                                <Typography size='h5'>Отмена</Typography>
                            </Button>
                            <Button 
                                onClick={addToCart}
                                className='flex-1'
                            >
                                <Typography size='h5'>Добавить</Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CashierPage;
