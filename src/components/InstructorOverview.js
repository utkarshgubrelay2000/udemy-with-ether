import React from 'react'
import Link from 'next/link'

import {
    Media
} from 'reactstrap'


export default props => {
    const data = props.data
    return (
        <Media className="d-block d-sm-flex review">
            <div className="text-md-center mr-4 mr-xl-5">
                <img src={`/content/img/avatar/${data.avatar}`} alt={data.title} className="d-block avatar avatar-xl p-2 mb-2" />
            </div>
            <Media body>
                <h6 className="mt-2 mb-1">{data.name}</h6>
                <p className="text-muted text-sm">{data.content}</p>
            </Media>
        </Media>
    )
}
