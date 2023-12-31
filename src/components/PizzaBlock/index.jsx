import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCartItemById } from '../../redux/cart/selectors.js';
import { addItem } from '../../redux/cart/slice.js';

const typeNames = ['тонкое', 'традиционное'];

const PizzaBlock = ({ id, imageUrl, name, types, sizes, price, category, rating }) => {
  const cartItem = useSelector(selectCartItemById(id));
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addedCount = cartItem ? cartItem.count : 0;

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const onClickAdd = () => {
    try {
      const item = {
        id: id,
        imageUrl: imageUrl,
        name: name,
        type: typeNames[activeType],
        size: sizes[activeSize],
        price: price,
        category: category,
        rating: rating,
      };
      dispatch(addItem(item));
    } catch (error) {
      console.log('error in onClickAdd -->', error);
    }
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img
          className="pizza-block__image"
          style={{ cursor: 'pointer' }}
          src={imageUrl}
          alt="Pizza"
          onClick={() => navigate(`/pizza/${id}`)}
        />
        <h4 className="pizza-block__title">{name}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => {
              return (
                <li
                  key={index}
                  className={activeType === index ? 'active' : ''}
                  onClick={() => setActiveType(index)}>
                  {typeNames[type]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((size, index) => {
              return (
                <li
                  key={index}
                  className={activeSize === index ? 'active' : ''}
                  onClick={() => setActiveSize(index)}>
                  {size} см.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button className="button button--outline button--add" onClick={onClickAdd}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
