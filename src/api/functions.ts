import { Path } from "../enums/Path";
import type { AuthIn, AuthOut } from "../interfaces/Auth";
import type { ResponseContainer } from "./base";
import { P, requestDelete, requestGet, requestPost } from "./requester";

export function Login(
	args: AuthIn,
	callback: (resp: ResponseContainer<AuthOut>) => void
) {
	requestPost<ResponseContainer<AuthOut>>(Path.Login, args, callback);
}

export function Register(
	args: AuthIn,
	callback: (resp: ResponseContainer<AuthOut>) => void
) {
	requestPost<ResponseContainer<AuthOut>>(Path.Register, args, callback);
}

export function Check(
	callback: (resp: ResponseContainer<AuthOut>) => void
) {
	const encodedToken = localStorage.getItem('token');
	requestGet<AuthOut>(
		Path.Info,
		callback,
		{ Authorization: encodedToken }
	);
}

export function Logout(
	callback: (resp: ResponseContainer<AuthOut>) => void
) {
	requestPost<AuthOut>(Path.Logout, {}, callback);
}

