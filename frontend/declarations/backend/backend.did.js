export const idlFactory = ({ IDL }) => {
  const PropertyDetails = IDL.Record({
    'id' : IDL.Nat,
    'bedrooms' : IDL.Nat,
    'description' : IDL.Text,
    'squareFootage' : IDL.Nat,
    'address' : IDL.Text,
    'bathrooms' : IDL.Nat,
    'price' : IDL.Nat,
    'images' : IDL.Vec(IDL.Text),
  });
  const Result = IDL.Variant({ 'ok' : PropertyDetails, 'err' : IDL.Text });
  return IDL.Service({
    'addProperty' : IDL.Func([PropertyDetails], [IDL.Nat], []),
    'getProperties' : IDL.Func([], [IDL.Vec(PropertyDetails)], ['query']),
    'getProperty' : IDL.Func([IDL.Nat], [Result], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
