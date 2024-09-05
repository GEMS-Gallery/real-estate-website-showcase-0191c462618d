import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor {
  type PropertyDetails = {
    id: Nat;
    address: Text;
    price: Nat;
    bedrooms: Nat;
    bathrooms: Nat;
    squareFootage: Nat;
    description: Text;
    images: [Text];
  };

  stable var nextPropertyId: Nat = 0;
  let properties = HashMap.HashMap<Nat, PropertyDetails>(10, Nat.equal, Nat.hash);

  public query func getProperties() : async [PropertyDetails] {
    let entries = Iter.toArray(properties.entries());
    Array.map(entries, func((_, property) : (Nat, PropertyDetails)) : PropertyDetails { property })
  };

  public query func getProperty(id: Nat) : async Result.Result<PropertyDetails, Text> {
    switch (properties.get(id)) {
      case (null) { #err("Property not found") };
      case (?property) { #ok(property) };
    };
  };

  public func addProperty(property: PropertyDetails) : async Nat {
    let id = nextPropertyId;
    let newProperty = {
      id = id;
      address = property.address;
      price = property.price;
      bedrooms = property.bedrooms;
      bathrooms = property.bathrooms;
      squareFootage = property.squareFootage;
      description = property.description;
      images = property.images;
    };
    properties.put(id, newProperty);
    nextPropertyId += 1;
    id
  };
}
