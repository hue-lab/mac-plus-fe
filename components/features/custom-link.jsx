import Link from "next/link";

import { parseContent } from '~/utils';

export default function ALink ( { children, className, content, style, itemProp, ...props } ) {

    const preventDefault = ( e ) => {
        if ( props.href === '#' ) {
            e.preventDefault();
        }

        if ( props.onClick ) {
            props.onClick();
        }
    }

    return (
        content ?
            <Link { ...props } >
                <a itemProp={itemProp} className={ className } style={ style } onClick={ preventDefault } dangerouslySetInnerHTML={ parseContent( content ) }>
                    { children }
                </a>
            </Link> :
            <Link { ...props } >
                <a itemProp={itemProp} className={ className } style={ style } onClick={ preventDefault }>
                    { children }
                </a>
            </Link>
    )
}
