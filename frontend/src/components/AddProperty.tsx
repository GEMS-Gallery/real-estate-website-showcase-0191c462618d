import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';
import { TextField, Button, Grid, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface PropertyFormData {
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  description: string;
  images: string;
}

const AddProperty: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<PropertyFormData>();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: PropertyFormData) => {
    setLoading(true);
    try {
      const images = data.images.split(',').map(img => img.trim());
      await backend.addProperty({
        id: BigInt(0), // The backend will assign the actual ID
        address: data.address,
        price: BigInt(data.price),
        bedrooms: BigInt(data.bedrooms),
        bathrooms: BigInt(data.bathrooms),
        squareFootage: BigInt(data.squareFootage),
        description: data.description,
        images: images,
      });
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.error('Error adding property:', error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom>Add New Property</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="address"
            control={control}
            rules={{ required: 'Address is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                fullWidth
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="price"
            control={control}
            rules={{ required: 'Price is required', min: 0 }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="bedrooms"
            control={control}
            rules={{ required: 'Number of bedrooms is required', min: 0 }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Bedrooms"
                type="number"
                fullWidth
                error={!!errors.bedrooms}
                helperText={errors.bedrooms?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="bathrooms"
            control={control}
            rules={{ required: 'Number of bathrooms is required', min: 0 }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Bathrooms"
                type="number"
                fullWidth
                error={!!errors.bathrooms}
                helperText={errors.bathrooms?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="squareFootage"
            control={control}
            rules={{ required: 'Square footage is required', min: 0 }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Square Footage"
                type="number"
                fullWidth
                error={!!errors.squareFootage}
                helperText={errors.squareFootage?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                rows={4}
                fullWidth
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="images"
            control={control}
            rules={{ required: 'At least one image URL is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Image URLs (comma-separated)"
                fullWidth
                error={!!errors.images}
                helperText={errors.images?.message || 'Enter image URLs separated by commas'}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Add Property'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddProperty;
