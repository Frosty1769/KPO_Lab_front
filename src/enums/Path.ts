export enum Path {
    // Страницы
    Auth = '/',
    Cashier = '/cashier',
    Admin = '/admin',

    // API User
    Info = '/api/user/info',
    Login = '/api/user/login',
    Register = '/api/user/register',
    Logout = '/api/user/logout',
    UserList = '/api/user/list',
    UserDelete = '/api/user/delete/',

    // API Products
    ProductAdd = '/api/products/add',
    ProductList = '/api/products/list',
    ProductByArticle = '/api/products/article/',
    ProductDelete = '/api/products/delete/',
    Sale = '/api/products/sale',
    SalesReport = '/api/products/sales-report',
    ClearSales = '/api/products/clear-sales',
}