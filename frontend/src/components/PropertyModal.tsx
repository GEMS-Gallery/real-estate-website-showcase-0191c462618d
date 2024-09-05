import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';

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

interface PropertyModalProps {
  property: Property;
  open: boolean;
  onClose: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{property.address}</DialogTitle>
      <DialogContent>
        <img
          src={property.images[0] || 'https://via.placeholder.com/600x400'}
          alt={property.address}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <Typography variant="h6">${Number(property.price).toLocaleString()}</Typography>
        <Typography>
          {Number(property.bedrooms)} bed | {Number(property.bathrooms)} bath | {Number(property.squareFootage)} sqft
        </Typography>
        <Typography variant="body1" paragraph>
          {property.description}
        </Typography>
        <Button variant="contained" onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyModal;
