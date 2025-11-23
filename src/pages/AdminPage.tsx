import { useState, useEffect } from "react";
import { GetProducts, AddProduct, DeleteProduct, Register, Logout, GetUsers, DeleteUser, GetSalesReport, ClearSalesHistory } from "../api/functions";
import type { Product, ProductAdd, SalesReport } from "../interfaces/Product";
import type { UserRegister, AuthOut } from "../interfaces/Auth";
import { toast } from "react-toastify";
import Typography from "../Typography";
import Button from "../inputs/Button";
import TextBox from "../inputs/TextBox";

interface Props {
    onLogout: () => void;
    username: string;
}

const AdminPage = (props: Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [users, setUsers] = useState<AuthOut[]>([]);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    
    const [newProduct, setNewProduct] = useState<ProductAdd>({
        article: "",
        name: "",
        price: 0,
        quantity: 0
    });
    
    const [newUser, setNewUser] = useState<UserRegister>({
        username: "",
        password: "",
        role: "cashier"
    });

    useEffect(() => {
        loadProducts();
        loadUsers();
    }, []);

    const loadProducts = () => {
        GetProducts((res) => {
            if (res.status === 'ok' && res.data) {
                setProducts(res.data);
            }
        });
    };

    const loadUsers = () => {
        GetUsers((res) => {
            if (res.status === 'ok' && res.data) {
                setUsers(res.data);
            }
        });
    };

    const handleAddProduct = () => {
        if (!newProduct.article || !newProduct.name || newProduct.price <= 0) {
            toast.error("Заполните все поля корректно");
            return;
        }

        AddProduct(newProduct, (res) => {
            if (res.status === 'ok') {
                toast.success(res.message || "Товар добавлен");
                setShowAddProductModal(false);
                setNewProduct({ article: "", name: "", price: 0, quantity: 0 });
                loadProducts();
            } else {
                toast.error(res.message || "Ошибка при добавлении товара");
            }
        });
    };

    const handleDeleteProduct = (article: string) => {
        if (!confirm(`Удалить товар ${article}?`)) return;

        DeleteProduct(article, (res) => {
            if (res.status === 'ok') {
                toast.success("Товар удалён");
                loadProducts(); // Обновляем список
            } else {
                toast.error(res.message || "Ошибка при удалении");
            }
        });
    };

    const handleAddUser = () => {
        if (!newUser.username || !newUser.password) {
            toast.error("Заполните логин и пароль");
            return;
        }

        Register(newUser, (res) => {
            if (res.status === 'ok') {
                toast.success("Пользователь создан");
                setShowAddUserModal(false);
                setNewUser({ username: "", password: "", role: "cashier" });
                loadUsers(); // Обновляем список
            } else {
                toast.error(res.message || "Ошибка при создании пользователя");
            }
        });
    };

    const handleDeleteUser = (userId: number) => {
        if (!confirm("Вы уверены что хотите удалить этого пользователя?")) {
            return;
        }

        DeleteUser(userId, (res) => {
            if (res.status === 'ok') {
                toast.success("Пользователь удалён");
                loadUsers();
            } else {
                toast.error(res.message || "Ошибка при удалении");
            }
        });
    };

    const exportReport = () => {
        // Получаем отчёт о продажах с сервера и экспортируем в CSV
        GetSalesReport((res) => {
            if (res.status === 'ok' && res.data) {
                const report = res.data;
                
                const csvHeader = "\ufeffАртикул,Название,Общее количество продаж,Общая выручка\n";
                const csvRows = report.sales.map(s => 
                    `${s.article},${s.name},${s.total_quantity},${s.total_revenue.toFixed(2)}`
                ).join("\n");
                const csvFooter = `\n\nОБЩАЯ ВЫРУЧКА,,,${report.total_revenue.toFixed(2)}`;
                
                const csvContent = csvHeader + csvRows + csvFooter;
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                
                link.setAttribute("href", url);
                link.setAttribute("download", `sales_report_${new Date().toISOString().split('T')[0]}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                toast.success("Отчёт экспортирован");
            } else {
                toast.error(res.message || "Ошибка при получении отчёта");
            }
        });
    };

    const clearSalesReport = () => {
        if (!confirm("Вы уверены что хотите очистить всю историю продаж? Это действие необратимо!")) {
            return;
        }

        ClearSalesHistory((res) => {
            if (res.status === 'ok') {
                toast.success("История продаж очищена");
            } else {
                toast.error(res.message || "Ошибка при очистке");
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

    return (
        <div className='w-full h-full flex flex-col bg-gray-100'>
            {/* Header */}
            <div className='w-full bg-white shadow-md p-4 flex justify-between items-center'>
                <Typography size='h2'>Администрирование</Typography>
                <div className='flex items-center gap-4'>
                    <Typography size='h5'>Администратор: {props.username}</Typography>
                    <Button onClick={handleLogout}>
                        <Typography size='h5'>Выйти</Typography>
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 p-4 space-y-4 overflow-y-auto'>
                {/* Control Panel */}
                <div className='bg-white rounded-lg shadow-md p-6 flex gap-4'>
                    <Button onClick={() => setShowAddProductModal(true)}>
                        <Typography size='h5'>+ Добавить товар</Typography>
                    </Button>
                    <Button onClick={() => setShowAddUserModal(true)}>
                        <Typography size='h5'>+ Добавить кассира</Typography>
                    </Button>
                    <Button onClick={exportReport} className='bg-green-600 hover:bg-green-700'>
                        <Typography size='h5'>📊 Экспорт отчёта</Typography>
                    </Button>
                    <Button onClick={clearSalesReport} className='bg-red-600 hover:bg-red-700'>
                        <Typography size='h5'>🗑️ Обнулить продажи</Typography>
                    </Button>
                </div>

                {/* Products Table */}
                <div className='bg-white rounded-lg shadow-md p-6'>
                    <Typography size='h3' className='mb-4'>Товары на складе</Typography>
                    <div className='overflow-x-auto'>
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className='p-3 text-left'>Артикул</th>
                                    <th className='p-3 text-left'>Название</th>
                                    <th className='p-3 text-left'>Цена</th>
                                    <th className='p-3 text-left'>Количество</th>
                                    <th className='p-3 text-left'>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className='p-3 text-center text-gray-400'>
                                            Нет товаров
                                        </td>
                                    </tr>
                                ) : (
                                    products.map(product => (
                                        <tr key={product.id} className='border-b hover:bg-gray-50'>
                                            <td className='p-3'>{product.article}</td>
                                            <td className='p-3'>{product.name}</td>
                                            <td className='p-3'>{product.price.toFixed(2)} ₽</td>
                                            <td className='p-3'>{product.quantity}</td>
                                            <td className='p-3'>
                                                <Button 
                                                    onClick={() => handleDeleteProduct(product.article)}
                                                    className='bg-red-600 hover:bg-red-700 text-sm px-3 py-1'
                                                >
                                                    Удалить
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Users Table */}
                <div className='bg-white rounded-lg shadow-md p-6'>
                    <Typography size='h3' className='mb-4'>Пользователи системы</Typography>
                    <div className='overflow-x-auto'>
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className='p-3 text-left'>ID</th>
                                    <th className='p-3 text-left'>Логин</th>
                                    <th className='p-3 text-left'>Роль</th>
                                    <th className='p-3 text-left'>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className='p-3 text-center text-gray-400'>
                                            Нет пользователей
                                        </td>
                                    </tr>
                                ) : (
                                    users.map(user => (
                                        <tr key={user.id} className='border-b hover:bg-gray-50'>
                                            <td className='p-3'>{user.id}</td>
                                            <td className='p-3'>{user.username}</td>
                                            <td className='p-3'>
                                                <span className={`px-2 py-1 rounded text-sm ${
                                                    user.role === 'admin' 
                                                        ? 'bg-purple-100 text-purple-800' 
                                                        : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {user.role === 'admin' ? 'Администратор' : 'Кассир'}
                                                </span>
                                            </td>
                                            <td className='p-3'>
                                                {user.username !== props.username && (
                                                    <Button 
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className='bg-red-600 hover:bg-red-700 text-sm px-3 py-1'
                                                    >
                                                        Удалить
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Product Modal */}
            {showAddProductModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg p-6 w-[500px] shadow-xl'>
                        <Typography size='h3' className='mb-4'>Добавить товар</Typography>
                        <div className='space-y-3'>
                            <TextBox 
                                placeholder='Артикул'
                                value={newProduct.article}
                                onChange={(e) => setNewProduct({...newProduct, article: e.target.value})}
                            />
                            <TextBox 
                                placeholder='Название'
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                            />
                            <TextBox 
                                type='number'
                                placeholder='Цена'
                                value={newProduct.price.toString()}
                                onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                            />
                            <TextBox 
                                type='number'
                                placeholder='Количество'
                                value={newProduct.quantity.toString()}
                                onChange={(e) => setNewProduct({...newProduct, quantity: parseInt(e.target.value) || 0})}
                            />
                        </div>
                        <div className='flex gap-3 mt-4'>
                            <Button 
                                onClick={() => {
                                    setShowAddProductModal(false);
                                    setNewProduct({ article: "", name: "", price: 0, quantity: 0 });
                                }}
                                className='flex-1 bg-gray-500 hover:bg-gray-600'
                            >
                                <Typography size='h5'>Отмена</Typography>
                            </Button>
                            <Button 
                                onClick={handleAddProduct}
                                className='flex-1'
                            >
                                <Typography size='h5'>Добавить</Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add User Modal */}
            {showAddUserModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg p-6 w-[400px] shadow-xl'>
                        <Typography size='h3' className='mb-4'>Добавить кассира</Typography>
                        <div className='space-y-3'>
                            <TextBox 
                                placeholder='Логин'
                                value={newUser.username}
                                onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                            />
                            <TextBox 
                                type='password'
                                placeholder='Пароль'
                                value={newUser.password}
                                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                            />
                            <select 
                                className='w-full p-2 border rounded'
                                value={newUser.role}
                                onChange={(e) => setNewUser({...newUser, role: e.target.value as 'admin' | 'cashier'})}
                            >
                                <option value='cashier'>Кассир</option>
                                <option value='admin'>Администратор</option>
                            </select>
                        </div>
                        <div className='flex gap-3 mt-4'>
                            <Button 
                                onClick={() => {
                                    setShowAddUserModal(false);
                                    setNewUser({ username: "", password: "", role: "cashier" });
                                }}
                                className='flex-1 bg-gray-500 hover:bg-gray-600'
                            >
                                <Typography size='h5'>Отмена</Typography>
                            </Button>
                            <Button 
                                onClick={handleAddUser}
                                className='flex-1'
                            >
                                <Typography size='h5'>Создать</Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
