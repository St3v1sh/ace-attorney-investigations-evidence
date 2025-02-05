import { useEffect, useRef, useState } from "react";
import { Item } from "../../utils/types";
import SafeImage from "../SafeImage/SafeImage";
import "./ItemCarousel.css";

interface ItemCarouselProps {
  itemList: Item[];
  activeItem: number;
  setActiveItem: (activeItem: number) => void;
}

const ItemCarousel: React.FC<ItemCarouselProps> = ({
  itemList,
  activeItem,
  setActiveItem,
}) => {
  const [itemSlots, setItemSlots] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [maxPageIndicators, setMaxPageIndicators] = useState(0);
  const [pageIndicatorNumberOffset, setPageIndicatorNumberOffset] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [itemsOnPage, setItemsOnPage] = useState<Item[]>([]);

  const indicatorRef = useRef<HTMLDivElement>(null);
  const measurementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const indicatorContainer = indicatorRef.current;
    if (!indicatorContainer) return;

    const updateItemList = () => {
      const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );

      // Calculate the number of item slots.
      const carouselWidth =
        measurementRef.current!.getBoundingClientRect().width;
      const itemWidth = (4 + 0.75 + 0.75) * rem;
      const calculatedItemSlots = Math.floor(carouselWidth / itemWidth);
      setItemSlots(calculatedItemSlots);

      // Calculate the number of pages. There won't be a divide by zero error because carouselWidth has a minimum value.
      const itemPages = Math.ceil(itemList.length / calculatedItemSlots);
      setNumberOfPages(Math.max(1, itemPages));

      // Calculate the max number of page indicators and the page indicator number offset.
      const pageIndicatorContainerWidth =
        indicatorContainer.getBoundingClientRect().width - (26 + 26); // Hardcoded value based on ellipsis width.
      const pageIndicatorWidth = (0.5 + 0.25 + 0.25) * rem;
      const pageIndicators = Math.floor(
        pageIndicatorContainerWidth / pageIndicatorWidth
      );

      setPageIndicatorNumberOffset(
        numberOfPages > maxPageIndicators
          ? Math.min(
              Math.max(0, activePage - Math.floor(maxPageIndicators / 2)),
              numberOfPages - maxPageIndicators
            )
          : 0
      );
      setMaxPageIndicators(Math.max(1, pageIndicators));

      // Fix the active page indicator if it is out of bounds.
      if (activePage > numberOfPages - 1) {
        setActivePage(Math.max(0, numberOfPages - 1));
      }

      // Populate the itemsOnPage array.
      const itemsOnPage: Item[] = [];
      for (let i = 0; i < itemSlots; i++) {
        const itemIndex = i + activePage * itemSlots;
        if (itemIndex < itemList.length) {
          itemsOnPage.push(itemList[itemIndex]);
        } else {
          itemsOnPage.push({} as Item);
        }
      }
      setItemsOnPage(itemsOnPage);
    };

    updateItemList();

    const resizeObserver = new ResizeObserver(updateItemList);
    resizeObserver.observe(indicatorContainer);
    window.addEventListener("resize", updateItemList);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateItemList);
    };
  }, [activePage, itemList, itemSlots, maxPageIndicators, numberOfPages]);

  const handlePrevious = () => {
    setActivePage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setActivePage((prevPage) => Math.min(prevPage + 1, numberOfPages - 1));
  };

  const isEmptyItem = (item: Item) => {
    for (const _ in item) {
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="pagination-container">
        <div className="item-controls-container">
          <button className="item-controls" onClick={handlePrevious}>
            <svg
              fill="#925c1f"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              width={"2.5rem"}
              height={"3.5rem"}
            >
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#462c0e"
                strokeWidth="10"
              >
                <filter
                  id="arrow-shadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="15"
                    dy="15"
                    stdDeviation="10"
                    floodColor="black"
                    floodOpacity="0.8"
                  />
                </filter>
                <path
                  filter="url(#arrow-shadow)"
                  d="M366.326 2.877c-16.847-6.426-35.491-1.883-47.497 11.572L128.884 227.314c-14.592 16.353-14.592 41.019.001 57.372l189.944 212.865c8.386 9.399 20.012 14.448 32.004 14.448 5.172 0 10.415-.938 15.493-2.874 16.847-6.425 27.734-22.227 27.734-40.259V43.135c0-18.031-10.885-33.833-27.734-40.258z"
                ></path>
              </g>
            </svg>
          </button>
          <div className="item-list">
            <div className="carousel">
              {/* Evidence goes here */}
              {itemsOnPage.map((item, index) => {
                return (
                  <button
                    className={
                      "carousel-item" + (isEmptyItem(item) ? " invisible" : "")
                    }
                    key={index}
                    onClick={() => {
                      if (!isEmptyItem(item)) {
                        setActiveItem(activePage * itemSlots + index);
                      }
                    }}
                  >
                    {!isEmptyItem(item) && (
                      <>
                        <SafeImage
                          src={item.imageUrl}
                          alt={item.name}
                          className="carousel-image"
                        />
                        <div
                          className={
                            "carousel-item-shadow" +
                            (index === activeItem - activePage * itemSlots
                              ? " active"
                              : "")
                          }
                        ></div>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <button className="item-controls" onClick={handleNext}>
            <svg
              fill="#925c1f"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              width={"2.5rem"}
              height={"3.5rem"}
              transform="matrix(-1, 0, 0, 1, 0, 0)"
            >
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#462c0e"
                strokeWidth="10"
              >
                <filter
                  id="arrow-shadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="15"
                    dy="15"
                    stdDeviation="10"
                    floodColor="black"
                    floodOpacity="0.8"
                  />
                </filter>
                <path
                  filter="url(#arrow-shadow)"
                  d="M366.326 2.877c-16.847-6.426-35.491-1.883-47.497 11.572L128.884 227.314c-14.592 16.353-14.592 41.019.001 57.372l189.944 212.865c8.386 9.399 20.012 14.448 32.004 14.448 5.172 0 10.415-.938 15.493-2.874 16.847-6.425 27.734-22.227 27.734-40.259V43.135c0-18.031-10.885-33.833-27.734-40.258z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        <div className="page-indicator" ref={indicatorRef}>
          {/* Pagination indicators here. */}
          {numberOfPages > maxPageIndicators &&
            activePage > Math.floor(maxPageIndicators / 2) && (
              <span className="ellipsis">...</span>
            )}
          {Array.from(
            { length: Math.min(numberOfPages, maxPageIndicators) },
            (_, index) => index
          ).map((index) => (
            <div
              key={index}
              className={
                index + pageIndicatorNumberOffset === activePage ? "active" : ""
              }
            ></div>
          ))}
          {numberOfPages > maxPageIndicators &&
            activePage < numberOfPages - Math.floor(maxPageIndicators / 2) && (
              <span className="ellipsis">...</span>
            )}
        </div>
      </div>
      <div className="measurement-container">
        <div className="measurement" ref={measurementRef}></div>
      </div>
    </>
  );
};

export default ItemCarousel;
