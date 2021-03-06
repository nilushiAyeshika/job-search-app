import { FC } from 'react'

import imgSrc from '../../../assets/img/default.jpg'
import Grid from '../../../components/layout/grid/Grid.component'

import HeaderWrapper from './Header.theme'

const Header: FC = () => {
  return (
    <HeaderWrapper>
      <Grid className="header__imgWrapper" data-test="header-wrapper">
        <img src={imgSrc} alt="background-img" data-test="header-image" />
        <Grid className="header__gradient" />
      </Grid>
    </HeaderWrapper>
  )
}

export default Header
