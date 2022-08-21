import React from 'react'
import { Container } from 'reactstrap'
import ReactIdSwiper from 'react-id-swiper'

export default props => {
  const params = {
    containerClass: `swiper-container brands-slider pb-5`,
    slidesPerView: 1,
    spaceBetween: 15,
    loop: false,
    roundLengths: true,
    pagination: {
        el: `.swiper-pagination`,
        clickable: true,
        dynamicBullets: false
    },
    breakpoints: {
        1200: {
            slidesPerView: 4
        },
        991: {
            slidesPerView: 4
        },
        768: {
            slidesPerView: 3
        }
    }
  }

  return (
    <section className={`py-6 bg-gray-200`}>
      <Container>
        <h5 className="text-center text-uppercase letter-spacing-3 mb-5">
            {props.title}
        </h5>
        <ReactIdSwiper {...params}>
          {props.partners.map((partner, index) =>
            <div key={index} className="h-auto d-flex align-items-center justify-content-center">
              <img src={`/content/${partner.img}`} alt={partner.title} className="img-fluid w-6rem opacity-7" />
            </div>
          )}
        </ReactIdSwiper>
      </Container>
    </section>
  )
}
