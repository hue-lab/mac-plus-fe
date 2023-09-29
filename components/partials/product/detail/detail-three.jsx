import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Collapse } from 'react-bootstrap';

import ALink from '~/components/features/custom-link';
import Countdown from '~/components/features/countdown';
import Quantity from '~/components/features/quantity';

import ProductNav from '~/components/partials/product/product-nav';
import DescTwo from '~/components/partials/product/desc/desc-two';

import { wishlistActions } from '~/store/wishlist';
import { cartActions } from '~/store/cart';

import { toDecimal } from '~/utils';

function DetailThree ( props ) {
    let router = useRouter();
    const { product, isSticky = false, isDesc = false, adClass = '', isSizeGuide = true, isNav = true } = props;
    const { toggleWishlist, addToCart, wishlist } = props;
    const [ curColor, setCurColor ] = useState( 'null' );
    const [ curSize, setCurSize ] = useState( 'null' );
    const [ curIndex, setCurIndex ] = useState( 0 );
    const [ cartActive, setCartActive ] = useState( false );
    const [ quantity, setQauntity ] = useState( 1 );

    // decide if the product is wishlisted
    let isWishlisted, colors = [], sizes = [];
    isWishlisted = wishlist.findIndex( item => item._id === product._id ) > -1 ? true : false;

    useEffect( () => {
        setCurIndex( -1 );
        resetValueHandler();
    }, [ product ] )

    useEffect( () => {
        setCartActive( true );

        if ( !product.isStock ) {
            setCartActive( false );
        }
    }, [ curColor, curSize, product ] )

    const wishlistHandler = ( e ) => {
        e.preventDefault();

        if ( toggleWishlist && !isWishlisted ) {
            let currentTarget = e.currentTarget;
            currentTarget.classList.add( 'load-more-overlay', 'loading' );
            toggleWishlist( product.data );

            setTimeout( () => {
                currentTarget.classList.remove( 'load-more-overlay', 'loading' );
            }, 1000 );
        } else {
            router.push( '/pages/wishlist' );
        }
    }

    const toggleColorHandler = ( color ) => {
        if ( !isDisabled( color.name, curSize ) ) {
            if ( curColor === color.name ) {
                setCurColor( 'null' );
            } else {
                setCurColor( color.name );
            }
        }
    }

    const toggleSizeHandler = ( size ) => {
        if ( !isDisabled( curColor, size.name ) ) {
            if ( curSize === size.name ) {
                setCurSize( 'null' );
            } else {
                setCurSize( size.name );
            }
        }
    }

    const addToCartHandler = () => {
        // if ( product.data.stock > 0 && cartActive ) {
        //     if ( product.data.variants.length > 0 ) {
        //         let tmpName = product.data.name, tmpPrice;
        //         tmpName += curColor !== 'null' ? '-' + curColor : '';
        //         tmpName += curSize !== 'null' ? '-' + curSize : '';
        //
        //         if ( product.data.price[ 0 ] === product.data.price[ 1 ] ) {
        //             tmpPrice = product.data.price[ 0 ];
        //         } else if ( !product.data.variants[ 0 ].price && product.data.discount > 0 ) {
        //             tmpPrice = product.data.price[ 0 ];
        //         } else {
        //             tmpPrice = product.data.variants[ curIndex ].sale_price ? product.data.variants[ curIndex ].sale_price : product.data.variants[ curIndex ].price;
        //         }
        //
        //         addToCart( { ...product.data, name: tmpName, qty: quantity, price: tmpPrice } );
        //     } else {
        //         addToCart( { ...product.data, qty: quantity, price: product.data.price[ 0 ] } );
        //     }
        // }
    }

    const resetValueHandler = ( e ) => {
        setCurColor( 'null' );
        setCurSize( 'null' );
    }

    function isDisabled ( color, size ) {
        // if ( color === 'null' || size === 'null' ) return false;
        //
        // if ( sizes.length === 0 ) {
        //     return product.data.variants.findIndex( item => item.color.name === curColor ) === -1;
        // }
        //
        // if ( colors.length === 0 ) {
        //     return product.data.variants.findIndex( item => item.size.name === curSize ) === -1;
        // }
        //
        // return product.data.variants.findIndex( item => item.color.name === color && item.size.name === size ) === -1;
    }

    function changeQty ( qty ) {
        setQauntity( qty );
    }

    return (
        <div className={ `product-details ${ isSticky ? 'sticky' : '' } ${ adClass }` }>
            {
                isNav ?
                    <div className="product-navigation pt-0">
                        <ul className="breadcrumb breadcrumb-lg">
                            <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                            <li><ALink href="#" className="active">Products</ALink></li>
                            <li>Detail</li>
                        </ul>

                        <ProductNav product={ product } />
                    </div> : ''
            }

            <h2 className="product-name">{ product.name }</h2>

            <div className='product-meta'>
                Категория: <span className='product-brand'>{ product.categoryId }</span>
            </div>

            <div className="product-price">
                {
                    product.discount > 0 ?
                      <>
                          <ins className="new-price">{ toDecimal( product.totalPrice ) } BYN</ins>
                          <del className="old-price">{ toDecimal( product.price ) } BYN</del>
                      </>
                      : <ins className="new-price">{ toDecimal( product.price ) } BYN</ins>
                }
            </div>

            {/*{*/}
            {/*    product.data.price[ 0 ] !== product.data.price[ 1 ] && product.data.variants.length === 0 ?*/}
            {/*        <Countdown type={ 2 } /> : ''*/}
            {/*}*/}

            <p className="product-short-desc">{ product.description }</p>

            <hr className="product-divider"></hr>

            <div className="product-form product-qty pb-0">
                <label className="d-none">QTY:</label>
                <div className="product-form-group">
                    <Quantity max={ product.isStock } product={ product } onChangeQty={ changeQty } />
                    <button className={ `btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${ cartActive ? '' : 'disabled' }` } onClick={ addToCartHandler } onClick={ addToCartHandler }><i className='d-icon-bag'></i>В корзину</button>
                </div>
            </div>

            <hr className="product-divider mb-3"></hr>

            <div className="product-footer">
                <a href="#" className={ `btn-product btn-wishlist` } title={ isWishlisted ? 'Browse wishlist' : 'Add to wishlist' } onClick={ wishlistHandler }>
                    <i className={ isWishlisted ? "d-icon-heart-full" : "d-icon-heart" }></i> {
                        isWishlisted ? 'Посмотреть избранное' : 'Добавить в избранное'
                    }
                </a>
            </div>

            {
                isDesc ? <DescTwo product={ product.data } adClass={ adClass } isSizeGuide={ isSizeGuide } /> : ''
            }
        </div >
    )
}

function mapStateToProps ( state ) {
    return {
        wishlist: state.wishlist.data ? state.wishlist.data : []
    }
}

export default connect( mapStateToProps, { toggleWishlist: wishlistActions.toggleWishlist, addToCart: cartActions.addToCart } )( DetailThree );
