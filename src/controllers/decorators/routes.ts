import 'reflect-metadata';
import { Methods } from '../enums/Methods';
import { MetadataKeys } from '../enums/MetadataKeys';
import { RequestHandler } from 'express';

interface RouteHandlerDesc extends PropertyDescriptor {
	value?: RequestHandler;
}

function routeBinder(method: Methods) {
	return function (path: string) {
		return function (target: any, key: string, desc: RouteHandlerDesc) {
			Reflect.defineMetadata(MetadataKeys.path, path, target, key);
			Reflect.defineMetadata(MetadataKeys.method, method, target, key);
		};
	};
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
