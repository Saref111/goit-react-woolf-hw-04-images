import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.scss';

export const ImageGallery = ({images, onImageClick}) => {
  const listItems = images.map((image) => (
    <ImageGalleryItem key={image.id} image={image} onClick={onImageClick} />
  ));
  return <ul className={css.gallery}>{listItems}</ul>;
};
