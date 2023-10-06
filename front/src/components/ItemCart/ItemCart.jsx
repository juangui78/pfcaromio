import React from 'react'

const ItemCart = ( {name, cant, price, image, id}) => {
  return (
    <div>
        <Img src={image} alt="" />
    </div>
  )
}

export default ItemCart