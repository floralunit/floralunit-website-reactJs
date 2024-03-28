import React, { useEffect,useState } from 'react';
import { GREEN_BACKGROUND, API_URL, RABBIT_BACKGROUND } from '../../../global-const';
import "../../../common/styles/gallery.css";
import {GalleryWithMusic} from "../../../common/components/PhotoMusicGallery.js"



export function RadostMojaPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [photosRadost, setPhotosRadost] = useState([]);
    const musics = [
        { type: "music", src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/146296601' },
        { type: "music", src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/136815635'},
        { type: "music", src: '' },

    ];
    useEffect(() => {
        fetch(`${API_URL}/getRadostMojaPhotos`) // �������� �� ��� URL API
            .then(response => {
                setIsLoaded(true);
                if (!response.ok) {
                    throw new Error('������ HTTP: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                setIsLoaded(true);
                const photos = data.response.items.map(photo => ({
                    src: photo.sizes.find(size => size.type === "x").url,
                    width: 4, // �������� �� ������ ������ ����������
                    height: 3, // �������� �� ������ ������ ����������
                    title: photo.text,
                    comments: photo.comments,
                    type: "photo"
                }));
                Array.prototype.push.apply(photos,musics); 
                setPhotosRadost(photos);
            })
            .catch(error => {
                console.error('������ ��� ��������� ����������', error);
            });
    }, []);




    return (
        <div>
            <crt/>

                                            <div className='photo-gallery'>
                                   <GalleryWithMusic items={photosRadost} className='photo-gallery'></GalleryWithMusic>
                                </div>
        </div>
    );
}
