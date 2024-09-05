import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface PropertyDetails {
  'id' : bigint,
  'bedrooms' : bigint,
  'description' : string,
  'squareFootage' : bigint,
  'address' : string,
  'bathrooms' : bigint,
  'price' : bigint,
  'images' : Array<string>,
}
export type Result = { 'ok' : PropertyDetails } |
  { 'err' : string };
export interface _SERVICE {
  'addProperty' : ActorMethod<[PropertyDetails], bigint>,
  'getProperties' : ActorMethod<[], Array<PropertyDetails>>,
  'getProperty' : ActorMethod<[bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
