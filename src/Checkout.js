import React from "react";
import { useLocation } from "react-router-dom";

export default function Checkout() {
    const location = useLocation(),
        data = location.state,
        total = data.length && data.reduce((i1, i2) => i1 + i2.price * i2.quantity,0);
    return (
        <div className="container checkout">
            <div className="row h6 text-white bg-primary mb-3 text-wrap d-none d-sm-flex">
                <div className="col-3 text-center">Product Picture</div>
                <div className="col-3 text-center">Product Name</div>
                <div className="col-2 text-center">Price</div>
                <div className="col-2 text-center">Quantity</div>
                <div className="col-2 text-center">Amount</div>
            </div>
            {
                data.length && data.map(item => {
                    return (
                        <div className="row mt-5" key={item.id}>
                            <div className="col-12 col-sm-3" data-title="Product Picture">
                                <img src={item.imgUrl} alt={item.name} className="img-fluid" />
                            </div>
                            <div className="col-12 col-sm-3 text-center" data-title="Product Name">{item.name}</div>
                            <div className="col-12 col-sm-2 text-center" data-title="Price">{item.price}</div>
                            <div className="col-12 col-sm-2 text-center" data-title="Quantity">{item.quantity}</div>
                            <div className="col-12 col-sm-2 text-center" data-title="Amount">{item.quantity * item.price}</div>
                        </div>
                    );
                })
            }
            <div className="row font-weight-bold font-italic text-white bg-success mt-5 mb-2">
                <div className="col-6 col-sm-10">Total</div>
                <div className="col-6 col-sm-2 text-center">
                    {total}
                </div>
            </div>
        </div>
    );
}