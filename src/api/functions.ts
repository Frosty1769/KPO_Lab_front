import { Path } from "../enums/Path";
import type { AuthIn, AuthOut, UserRegister } from "../interfaces/Auth";
import type { Product, ProductAdd, SaleRequest, SaleResponse, SalesReport } from "../interfaces/Product";
import type { ResponseContainer } from "./base";
import { requestDelete, requestGet, requestPost } from "./requester";

// ==================== User API ====================

export function Login(
	args: AuthIn,
	callback: (resp: ResponseContainer<AuthOut>) => void
) {
	requestPost<ResponseContainer<AuthOut>>(Path.Login, args, callback);
}

export function Register(
	args: UserRegister,
	callback: (resp: ResponseContainer<null>) => void
) {
	requestPost<ResponseContainer<null>>(Path.Register, args, callback);
}

export function Check(
	callback: (resp: ResponseContainer<AuthOut>) => void
) {
	requestGet<AuthOut>(Path.Info, callback);
}

export function Logout(
	callback: (resp: ResponseContainer<null>) => void
) {
	requestPost<null>(Path.Logout, {}, callback);
}

export function GetUsers(
	callback: (resp: ResponseContainer<AuthOut[]>) => void
) {
	requestGet<AuthOut[]>(Path.UserList, callback);
}

export function DeleteUser(
	userId: number,
	callback: (resp: ResponseContainer<null>) => void
) {
	requestDelete<null>(Path.UserDelete + userId, callback);
}

// ==================== Products API ====================

export function AddProduct(
	args: ProductAdd,
	callback: (resp: ResponseContainer<Product>) => void
) {
	requestPost<ResponseContainer<Product>>(Path.ProductAdd, args, callback);
}

export function GetProducts(
	callback: (resp: ResponseContainer<Product[]>) => void
) {
	requestGet<Product[]>(Path.ProductList, callback);
}

export function GetProductByArticle(
	article: string,
	callback: (resp: ResponseContainer<Product>) => void
) {
	requestGet<Product>(`${Path.ProductByArticle}${article}`, callback);
}

export function DeleteProduct(
	article: string,
	callback: (resp: ResponseContainer<null>) => void
) {
	requestDelete<null>(`${Path.ProductDelete}${article}`, callback);
}

export function ProcessSale(
	args: SaleRequest,
	callback: (resp: ResponseContainer<SaleResponse>) => void
) {
	requestPost<ResponseContainer<SaleResponse>>(Path.Sale, args, callback);
}

export function GetSalesReport(
	callback: (resp: ResponseContainer<SalesReport>) => void
) {
	requestGet<SalesReport>(Path.SalesReport, callback);
}

export function ClearSalesHistory(
	callback: (resp: ResponseContainer<null>) => void
) {
	requestPost<null>(Path.ClearSales, {}, callback);
}

