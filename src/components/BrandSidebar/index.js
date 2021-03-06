import cn from 'classnames';
import { array, bool, string } from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import stickybits from 'stickybits';
import { ScrollContext } from '../_enhancers/ScrollContext';
import scrollToIdElement from '../../utils/scrollToIdElement';
import './style.scss';

export const SidebarContext = React.createContext({});

export const SidebarProvider = props => {
  const [currentElement, setCurrentElement] = useState('');
  const [currentSubElement, setCurrentSubElement] = useState('');

  return (
    <SidebarContext.Provider
      value={{
        currentElement,
        setCurrentElement,
        currentSubElement,
        setCurrentSubElement,
      }}
      {...props}
    />
  );
};

const propTypes = {
  data: array.isRequired,
  activeSectionId: string,
  light: bool,
};

const BrandSidebar = ({ data, light, activeSectionId, onSectionClick }) => {
  const { currentElement, currentSubElement } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(ScrollContext);
  const { isScrollUp } = context;
  const sidebarRef = useRef();

  useEffect(() => {
    stickybits(sidebarRef.current, { noStyles: true });
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={cn('BrandSidebar', {
        'BrandSidebar--onTop': !isScrollUp,
        'BrandSidebar--open': isOpen,
        'BrandSidebar--light': light,
      })}
    >
      <div className="BrandSidebar__trigger" onClick={() => setIsOpen(!isOpen)} role="presentation">
        <div className="BrandSidebar__trigger-icon">{'<-'}</div>
      </div>

      <div className="BrandSidebar__wrapper">
        <div className="BrandSidebar__container">
          {data.map(({ id, title, subSections }) => {
            const isActive = currentElement === id || activeSectionId === id;

            return (
              <div className="BrandSidebar__group" key={id}>
                <button
                  className={cn('BrandSidebar__link', {
                    'BrandSidebar__link--active': isActive,
                  })}
                  onClick={() => {
                    if (onSectionClick) {
                      onSectionClick(id);
                    } else {
                      scrollToIdElement(id);
                      setIsOpen(!isOpen);
                    }
                  }}
                >
                  {title}
                </button>

                {isActive && subSections && subSections.length > 0 && (
                  <div className="BrandSidebar__sub-group">
                    {subSections.map(({ title, id }) => {
                      return (
                        <button
                          className={cn('BrandSidebar__sub-link', {
                            'BrandSidebar__sub-link--active': currentSubElement === id,
                          })}
                          key={id}
                          onClick={() => {
                            scrollToIdElement(id);
                            setIsOpen(!isOpen);
                          }}
                        >
                          {title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

BrandSidebar.propTypes = propTypes;

export default BrandSidebar;
