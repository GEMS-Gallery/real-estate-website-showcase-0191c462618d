import Char "mo:base/Char";
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

  func initProperties() {
    let sampleProperties = [
      {
        id = 0;
        address = "123 Main St, Anytown, USA";
        price = 250000;
        bedrooms = 3;
        bathrooms = 2;
        squareFootage = 1500;
        description = "Charming 3-bedroom home in a quiet neighborhood.";
        images = ["https://picsum.photos/seed/prop1/400/300"];
      },
      {
        id = 1;
        address = "456 Elm St, Somewhere, USA";
        price = 350000;
        bedrooms = 4;
        bathrooms = 3;
        squareFootage = 2000;
        description = "Spacious 4-bedroom family home with a large backyard.";
        images = ["https://picsum.photos/seed/prop2/400/300"];
      },
      {
        id = 2;
        address = "789 Oak Ave, Elsewhere, USA";
        price = 180000;
        bedrooms = 2;
        bathrooms = 1;
        squareFootage = 1000;
        description = "Cozy 2-bedroom starter home, perfect for first-time buyers.";
        images = ["https://picsum.photos/seed/prop3/400/300"];
      },
      {
        id = 3;
        address = "101 Pine Rd, Nowhere, USA";
        price = 450000;
        bedrooms = 5;
        bathrooms = 4;
        squareFootage = 2500;
        description = "Luxurious 5-bedroom home with modern amenities.";
        images = ["https://picsum.photos/seed/prop4/400/300"];
      },
      {
        id = 4;
        address = "202 Maple Ln, Someplace, USA";
        price = 300000;
        bedrooms = 3;
        bathrooms = 2;
        squareFootage = 1800;
        description = "Beautiful 3-bedroom home with a newly renovated kitchen.";
        images = ["https://picsum.photos/seed/prop5/400/300"];
      },
      {
        id = 5;
        address = "303 Cedar Blvd, Anystate, USA";
        price = 275000;
        bedrooms = 3;
        bathrooms = 2;
        squareFootage = 1600;
        description = "Lovely 3-bedroom home in a family-friendly neighborhood.";
        images = ["https://picsum.photos/seed/prop6/400/300"];
      },
      {
        id = 6;
        address = "404 Birch St, Othertown, USA";
        price = 220000;
        bedrooms = 2;
        bathrooms = 2;
        squareFootage = 1200;
        description = "Cute 2-bedroom bungalow with a charming front porch.";
        images = ["https://picsum.photos/seed/prop7/400/300"];
      },
      {
        id = 7;
        address = "505 Willow Way, Newcity, USA";
        price = 400000;
        bedrooms = 4;
        bathrooms = 3;
        squareFootage = 2200;
        description = "Elegant 4-bedroom home with a spacious open floor plan.";
        images = ["https://picsum.photos/seed/prop8/400/300"];
      },
      {
        id = 8;
        address = "606 Spruce Ct, Oldtown, USA";
        price = 320000;
        bedrooms = 3;
        bathrooms = 2;
        squareFootage = 1700;
        description = "Well-maintained 3-bedroom home with a beautiful garden.";
        images = ["https://picsum.photos/seed/prop9/400/300"];
      },
      {
        id = 9;
        address = "707 Redwood Dr, Greenville, USA";
        price = 380000;
        bedrooms = 4;
        bathrooms = 3;
        squareFootage = 2100;
        description = "Stunning 4-bedroom home with mountain views.";
        images = ["https://picsum.photos/seed/prop10/400/300"];
      }
    ];

    for (property in sampleProperties.vals()) {
      properties.put(property.id, property);
      nextPropertyId += 1;
    };
  };

  let _ = initProperties();
}
