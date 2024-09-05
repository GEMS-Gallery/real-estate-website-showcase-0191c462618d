import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Grid, Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';
import PropertyModal from './PropertyModal';

interface Property {
  id: bigint;
  address: string;
  price: bigint;
  bedrooms: bigint;
  bathrooms: bigint;
  squareFootage: bigint;
  description: string;
  images: string[];
}

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const result = await backend.getProperties();
      setProperties(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false);
    }
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Grid container spacing={3}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={Number(property.id)}>
            <Card onClick={() => handlePropertyClick(property)}>
              <CardMedia
                component="img"
                height="140"
                image={property.images[0] || 'https://via.placeholder.com/300x200'}
                alt={property.address}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {property.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${Number(property.price).toLocaleString()} | {Number(property.bedrooms)} bed | {Number(property.bathrooms)} bath
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          open={!!selectedProperty}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default PropertyList;
