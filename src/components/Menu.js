import React, { useEffect, useState } from 'react';
import { withTrans } from '../i18n/withTrans';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import MenuIcon from '../icons/MenuIcon';
import CloseIcon from '../icons/CloseIcon';
import { LinkWrapper } from './LinkWrapper';
import { MenuTitle } from '../styles/typographyComponents';
import { devices } from '../styles/devices';

const MenuContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.marble};
  position: fixed;
  z-index: 2;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

const MenuActions = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;
  z-index: 3;

  svg {
    &:hover,
    &:active {
      filter: blur(0px);
      transform: scale(1);
    }
  }

  @media ${devices.tablet} {
    svg {
      &:hover,
      &:active {
        filter: blur(2px);
        transform: scale(1.05);
      }
    }
  }
`;

const MenuContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  padding: 0 2rem 0 0;
  height: 100%;
  color: ${props => props.theme.colors.red};
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.red};
`;

const Menu = ({ t, color = 'red' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const jumpTo = path => {
    navigate(path);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <>
      <MenuActions>
        {!isMenuOpen ? (
          <MenuIcon color={color} onClickHandler={() => setIsMenuOpen(true)} />
        ) : (
          <CloseIcon color="red" onClickHandler={() => setIsMenuOpen(false)} />
        )}
      </MenuActions>
      {isMenuOpen && (
        <MenuContentWrapper>
          <MenuContent>
            <Links>
              <LinkWrapper
                onClick={() => jumpTo('/about')}
                color="red"
                radius="25px"
              >
                <MenuTitle>{t('menu.about').toUpperCase()}</MenuTitle>
              </LinkWrapper>
              <LinkWrapper
                onClick={() => jumpTo('/services')}
                color="red"
                radius="25px"
              >
                <MenuTitle>{t('menu.services').toUpperCase()}</MenuTitle>
              </LinkWrapper>
              <LinkWrapper
                onClick={() => jumpTo('/blog')}
                color="red"
                radius="25px"
              >
                <MenuTitle>{t('menu.stories').toUpperCase()}</MenuTitle>
              </LinkWrapper>
              <LinkWrapper
                onClick={() => jumpTo('/projects')}
                color="red"
                radius="25px"
              >
                <MenuTitle>{t('menu.portfolio').toUpperCase()}</MenuTitle>
              </LinkWrapper>
              <LinkWrapper
                onClick={() => jumpTo('/contact')}
                color="red"
                radius="25px"
              >
                <MenuTitle>{t('menu.contacts').toUpperCase()}</MenuTitle>
              </LinkWrapper>
            </Links>
          </MenuContent>
        </MenuContentWrapper>
      )}
    </>
  );
};

export default withTrans(Menu);
