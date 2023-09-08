'use client'
import { useTus } from 'use-tus'
import React, {Fragment,useCallback, ChangeEvent, useState } from 'react';
import styles from './uploadImages.module.css'
import { Image, Box, Button } from '@chakra-ui/react'
import { Anybody } from 'next/font/google';

export const Uploader = () => {
    const [img, setImg] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { upload, setUpload, isSuccess, error, remove } = useTus();
    const handleSetUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        if (!file) {
          return;
        }
        console.log(file)

        setImg(file);

        // Read the selected file and create a data URL for preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
        
        setUpload(file, {
          endpoint: '',
          metadata: {
            filename: file.name,
            filetype: file.type,
          },
        });
      },
      [setUpload]
    );
    const handleStart = useCallback(() => {
      if (!upload) {
        return;
      }
      // Start to upload the file.
      upload.start();
    }, [upload]);
    return (
      <div className={styles.wrapper}>
        <label htmlFor="file-upload" className={styles.customfileupload}>
            Custom Upload
        </label>
        <input className={styles.fileUpload} id="file-upload" type="file" onChange={handleSetUpload}/>
        
        {img && (
            <div>
            <p>Selected File: {img.name}</p>
            {imagePreview && (
                <Box boxSize='sm'>
                    <Image  src={imagePreview} alt='Dan Abramov' />
                </Box>
            )}
            </div>
        )}
        <button type="button" onClick={handleStart}>
          Upload
        </button>
      </div>
    );
  };