import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { cloneDeep } from 'lodash';

export default function App() {

  const [content, setContent] = useState({ data: [], currPage: 0, start: 0, end: 0 }),
    [cart, setCart] = useState([]),
    history = useHistory();

  const getEnd = (currPage) => {
    return content.data.length > content.perPage * (currPage + 1)
      ? (content.perPage) * (currPage + 1)
      : content.data.length;
  }

  useEffect(() => {
    fetch('https://api.jsonbin.io/b/5f6c6d727243cd7e8242ac90')
      .then(res => res.json())
      .then(data => {
        const currPage = 0, perPage = 15;
        setContent({
          data: data.sort((item1, item2) => item1.name > item2.name ? 1 : -1),
          perPage: perPage,
          totalPages: Math.ceil(data.length / perPage) - 1,
          currPage: currPage,
          start: perPage * currPage,
          end: data.length > perPage * (currPage + 1) ? perPage * (currPage + 1) : data.length
        });
      })
      .catch(err => console.error(err));
  }, []);

  const handlePagination = type => {
    if (type === 'next' && content.totalPages > content.currPage) {
      const currPage = content.currPage + 1,
        start = currPage * (content.perPage),
        end = getEnd(currPage);
      setContent({ ...content, currPage: currPage, start: start, end: end });
    }
    else if (type === 'prev' && content.currPage > 0) {
      const currPage = content.currPage - 1,
        start = currPage * (content.perPage),
        end = getEnd(currPage);
      setContent({ ...content, currPage: currPage, start: start, end: end });
    }
  }

  const handleAddRemove = (id, type) => {
    const newCart = cloneDeep(cart);
    if (newCart && newCart.findIndex(item => item.id === id) !== -1) {
      if (type === 'add') {
        newCart[newCart.findIndex(item => item.id === id)]['quantity'] += 1;
      }
      else if (newCart.find(i => i.id === id)['quantity'] !== 1) {
        newCart[newCart.findIndex(item => item.id === id)]['quantity'] -= 1;
      }
      else {
        newCart.splice(newCart.findIndex(item => item.id === id), 1);
      }
      setCart(newCart);
    }
    else if (type === 'add') {
      setCart([...newCart, { ...content.data.find(item => item.id === id), quantity: 1 }])
    }

  }

  const handleSubmit = () => {
    history.push('/checkout', cart);
  }

  return (
    <div className="container home">
      <div className="row h6 text-white bg-primary mb-3 text-wrap d-none d-sm-flex">
        <div className="col text-center">Product Picture</div>
        <div className="col text-center">Product Name</div>
        <div className="col text-center">Price</div>
        <div className="col text-center">Add to cart</div>
      </div>
      {
        content.data.length && content.data.slice(content.start, content.end).map(item => {
          return (
            <div className="row mt-5" key={item.id}>
              <div className="col-12 col-sm" data-title="Product Picture">
                <img src={item.imgUrl} alt={item.name} className="img-fluid" />
              </div>
              <div className="col-12 col-sm text-center" data-title="Product Name">{item.name}</div>
              <div className="col-12 col-sm text-center" data-title="Price">{item.price}</div>
              <div className="col-12 col-sm-2 text-center" data-title="Add to cart">
                <div className="row justify-content-center justify-content-sm-start">
                  <div className="col-2 p-0">
                    <button
                      type="button"
                      className="btn w-100 bg-secondary"
                      onClick={() => handleAddRemove(item.id, 'add')}>
                      +
                  </button>
                  </div>

                  <div className="col-2 d-flex align-items-center justify-content-center">
                    {cart.find(i => i.id === item.id) && cart.find(i => i.id === item.id)['quantity']}
                  </div>
                  <div className="col-2 p-0">
                    <button
                      type="button"
                      className="btn w-100 bg-secondary"
                      onClick={() => handleAddRemove(item.id, 'remove')}>
                      -
                  </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      }
      <div className="container-fluid d-flex justify-content-center mt-3 mb-3 ">
        <button type="button" className="btn btn-primary mr-5s" onClick={() => handlePagination('prev')}>Previous</button>
        <button type="button" className="btn btn-primary ml-5" onClick={() => handlePagination('next')}>Next</button>
      </div>
      <div className="d-flex justify-content-center mt-3 mb-3">
        <button type="button" className="btn btn-success" onClick={handleSubmit}>Submit</button>
      </div>

    </div>
  );
}