export default function({cartItem,  onIncreace, onDecreace}){
    return(
        <li className="cart-item">
            <p>
                {cartItem.name} - {cartItem.quantity} - {cartItem.price}
            </p>
            <p className="cart-item-actions">
                <button onClick={()=>onDecreace(cartItem.id)}>-</button>
                <span>{cartItem.quantity}</span>
                <button onClick={()=>onIncreace(cartItem)}>+</button>
            </p>
        </li>
    )
}