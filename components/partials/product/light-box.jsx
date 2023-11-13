import { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {getImgPath} from "~/utils";

function MediaLightBox( props ) {
    const { images, product } = props;
    const [ isOpen, setOpenState ] = useState( false );
    const [ index, setIndex ] = useState( 0 );

    useEffect( () => {
        setOpenState( props.isOpen );
    }, [ props.isOpen ] )

    useEffect( () => {
        setIndex( props.index );
    }, [ props.index ] )

    const closeLightBox = () => {
        props.changeOpenState( false );
    }

    const setNextHandler = () => {
        setIndex( ( index + 1 ) % images.length );
    }

    const setPrevHandler = () => {
        setIndex( ( index + images.length - 1 ) % images.length );
    }

    return (
        <>
            {
                isOpen ?
                    <Lightbox
                        mainSrc={ getImgPath(images[ index ].imageName) }
                        nextSrc={ getImgPath(images[ ( index + 1 ) % images.length ].imageName) }
                        prevSrc={ getImgPath(images[ ( index + images.length - 1 ) % images.length ].imageName) }
                        onCloseRequest={ closeLightBox }
                        onMovePrevRequest={ setPrevHandler }
                        onMoveNextRequest={ setNextHandler }
                        animationDisabled={ false }
                        animationDuration={ 300 }
                        imageTitle={ images[ index ].imageAlt || product.name }
                        imagePadding={ 80 }
                        clickOutsideToClose={ true }
                    />
                    : ''
            }
        </>
    )
}

export default MediaLightBox;
