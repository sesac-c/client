import { useState, useCallback, useMemo } from 'react';

import PropTypes from 'prop-types';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';

const ITEMS_PER_PAGE = 4;

const Carousel = ({ items, title, itemsPerPage = ITEMS_PER_PAGE }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { totalPages, isNextDisabled, isPrevDisabled, displayedItems, emptySpaces } = useMemo(() => {
    const safeItems = items || [];
    const totalItems = safeItems.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const displayedItems = safeItems.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);
    return {
      totalPages,
      isNextDisabled: currentIndex >= totalPages - 1,
      isPrevDisabled: currentIndex <= 0,
      displayedItems,
      emptySpaces: itemsPerPage - displayedItems.length
    };
  }, [items, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, totalPages - 1));
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  }, []);

  return (
    <section className='carousel'>
      <div className='carousel__container'>
        <div className='carousel__content'>
          <header className='carousel__header'>
            <h2 className='carousel__title'>{title}</h2>
          </header>
          <ul className='carousel__list'>
            <NavButton direction='prev' onClick={handlePrev} disabled={isPrevDisabled} />
            {displayedItems.map((item, index) => (
              <CarouselItem key={`item-${currentIndex * itemsPerPage + index}`} text={item.text} />
            ))}
            {Array.from({ length: emptySpaces }).map((_, index) => (
              <EmptyItem key={`empty-${index}`} />
            ))}
            <NavButton direction='next' onClick={handleNext} disabled={isNextDisabled} />
          </ul>
        </div>
      </div>
    </section>
  );
};

const NavButton = ({ direction, onClick, disabled }) => (
  <div
    className={`carousel__nav-btn carousel__nav-btn--${direction} ${disabled ? 'carousel__nav-btn--disabled' : ''}`}
    aria-label={`${direction === 'prev' ? '이전' : '다음'} 항목`}
  >
    <button onClick={onClick} disabled={disabled}>
      {direction === 'prev' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  </div>
);

const CarouselItem = ({ text }) => (
  <li className='carousel__item'>
    <button className='carousel__item-btn'>{text}</button>
  </li>
);

const EmptyItem = () => (
  <li className='carousel__item'>
    <button className='carousel__item-btn carousel__item-btn--disabled' disabled></button>
  </li>
);

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  title: PropTypes.string.isRequired
};

NavButton.propTypes = {
  direction: PropTypes.oneOf(['prev', 'next']).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

CarouselItem.propTypes = {
  text: PropTypes.string.isRequired
};

export default Carousel;
