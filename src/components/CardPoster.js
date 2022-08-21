import React from 'react'
import Link from 'next/link'

import {
    Card,
    CardBody,
    CardTitle,
    CardText
} from 'reactstrap'

export default props => {
    const data = props.data
    return (
      <Card 
        className="card-poster gradient-overlay hover-animate mb-4 mb-lg-0" 
        style={{ backgroundColor: data.backgroundColor }}
      >
        <Link href={data.link}>
          <a className="tile-link" target="_blank" />
        </Link>
        <img src={data.img} alt="Card image" className="bg-image avatar avatar-sm avatar-border-white" style={{ 
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -20%)'
        }}/>
        <CardBody className="card-body overlay-content">
          <CardTitle tag="h6" className="card-title text-shadow text-uppercase" style={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '3',
              height: '3.8em',
              textOverflow: 'ellipsis',
          }}>
            {data.title}
          </CardTitle>
          <CardText className="card-text text-sm" style={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '4',
              height: '6.6em',
              textOverflow: 'ellipsis',
          }}>
              {data.subtitle}
            </CardText>
        </CardBody>
      </Card>
    )
}
