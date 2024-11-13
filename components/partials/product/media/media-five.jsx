import { useState, useEffect } from 'react';
import Image from "next/image";
import OwlCarousel from '~/components/features/owl-carousel';

import ThumbTwo from '~/components/partials/product/thumb/thumb-two';
import MediaLightBox from '~/components/partials/product/light-box';

import { mainSlider3 } from '~/utils/data/carousel';
import {getImgPath} from "~/utils";

export default function MediaFive ( props ) {
    const { product, adClass = '' } = props;
    const [ index, setIndex ] = useState( 0 );
    const [ isOpen, setOpenState ] = useState( false );
    const [ mediaRef, setMediaRef ] = useState( null );

    let lgImages = product.seo?.seoImage || [];

    useEffect( () => {
        if ( mediaRef !== null && mediaRef.current !== null && index >= 0 ) {
            mediaRef.current.$car.to( index, 300, true );
        }
    }, [ index ] )

    const setIndexHandler = ( mediaIndex ) => {
        if ( mediaIndex !== index ) {
            setIndex( mediaIndex );
        }
    }

    const changeRefHandler = ( carRef ) => {
        if ( carRef.current !== undefined ) {
            setMediaRef( carRef );
        }
    }

    const changeOpenState = openState => {
        setOpenState( openState );
    }

    const openLightBox = () => {
        setOpenState( true );
    }

    let events = {
        onTranslate: function ( e ) {
            if ( !e.target ) return;
            if ( document.querySelector( '.product-thumbs' ) ) {
                document.querySelector( '.product-thumbs' ).querySelector( '.product-thumb.active' ).classList.remove( 'active' );
                document.querySelector( '.product-thumbs' ).querySelectorAll( '.product-thumb' )[ e.item.index ].classList.add( 'active' );
            }
        }
    }

    return (
        <div className={ `product-gallery product-gallery-vertical product-gallery-sticky ${ adClass }` }>
            <div className="product-label-group">
                {
                    product.isRec ?
                        <label className="product-label label-top">Хит</label> : ""
                }

                {
                    product.isNew ?
                        <label className="product-label label-new">Новинка</label> : ""
                }

                {
                    product.discount ?
                        <label className="product-label label-sale">-{ product.discount }%</label> : ""
                }
            </div>

            <OwlCarousel adClass="product-single-carousel owl-theme owl-nav-inner"
                options={ mainSlider3 }
                onChangeIndex={ setIndexHandler }
                onChangeRef={ changeRefHandler }
                events={ events }
            >
                {
                    lgImages.map( ( image, index ) =>
                        <div key={ image.imageName + '-' + index }>
                            <Image
                              width={800}
                              height={540}
                              itemprop="image"
                              src={getImgPath(image.imageName)}
                              alt={`${image.imageAlt || product.name || ''}-${index}`}
                              title={`${image.imageAlt || product.name || ''}-${index}`}
                              className="product-image large-image"
                            />
                        </div>
                    ) }
            </OwlCarousel>

            <div className="product-image-full" onClick={ openLightBox }><i className="d-icon-zoom"></i></div>

            <ThumbTwo product={ product } index={ index } onChangeIndex={ setIndexHandler } />

            <MediaLightBox images={ lgImages } isOpen={ isOpen } changeOpenState={ changeOpenState } index={ index } product={ product } />
        </div>
    )
}
