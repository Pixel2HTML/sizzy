// @flow
import typeof store from 'stores/store';

import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import views from 'config/views';

//images
import LogoSvg from 'img/pxl-iso-white.svg';

//styled-components
import {Toolbar, ToolbarLeft, Logo} from './styles';

//components
import UrlBar from 'components/UrlBar';
import HeaderLink from 'components/HeaderLink';

type Props = {
  store: any | store
};

@inject('store')
@observer
class ToolbarComponent extends Component {
  static defaultProps = {
    store: null
  };

  props: Props;

  render() {
    const {store} = this.props;
    const {app, router} = store;
    const {isValidUrl} = app;

    return (
      <Toolbar>

        <ToolbarLeft>
          <Logo
            onClick={app.resetToHome}
            src={LogoSvg}
            alt="Pixel2HTML"
            width="35px"
          />
          {isValidUrl && <UrlBar />}
        </ToolbarLeft>

      </Toolbar>
    );
  }
}

export default ToolbarComponent;
