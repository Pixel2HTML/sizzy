// @flow
import Settings from 'stores/models/settings';
import DeviceType from 'stores/models/device';

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {deviceHeader} from 'styles/sizes';
import ORIENTATIONS from 'config/orientations';

//external
import Framed from 'react-frame-component';
import Urlbox from 'urlbox';
import CopyToClipboard from 'react-copy-to-clipboard';

//styled-components
import {
  Name,
  Header,
  Button,
  ButtonIcon,
  Device,
  Buttons,
  Size,
  buttonIconClassname
} from './styles';

type Props = {
  device: DeviceType,
  children?: React.Element<*>,
  theme: Object,
  visible: boolean,
  url: string,
  urlToLoad: string
};

@observer class DeviceComponent extends Component {
  props: Props;
  settings: Settings = new Settings();

  render() {
    const {
      device: {width, name, height, settings},
      children,
      theme,
      visible,
      url,
      urlToLoad
    } = this.props;

    const {orientation, zoom, showSizes} = settings;

    //invert values in landscape
    const landscape = orientation === ORIENTATIONS.LANDSCAPE;
    const iframeHeight = (landscape ? width : height) || 0;
    const iframeWidth = (landscape ? height : width) || 0;

    const zoomValue = zoom * 0.01;
    const deviceHeaderTotalHeight =
      deviceHeader.height + deviceHeader.marginBottom;

    //highly dynamic styles must be inline
    const frameProps = {
      style: {
        transform: `scale(${zoomValue})`,
        transformOrigin: 'top left',
        position: 'absolute',
        border: 'none',
        top: deviceHeaderTotalHeight,
        left: 0,
        borderRadius: 3,
        backgroundColor: 'white',
        ...theme.iframeStyle
      },
      width: `${iframeWidth}px`,
      height: `${iframeHeight}px`
    };

    const deviceStyle = {
      width: iframeWidth * zoomValue,
      height: iframeHeight * zoomValue + deviceHeaderTotalHeight,
      position: 'relative',
      display: visible ? 'flex' : 'none' //hide/show iframe instead of completely destroying it, much faster.
    };

    const hasChildren = !url && children;
    const smallZoom = zoom < 50;
    const showSize = showSizes === true && smallZoom === false;

    // Plugin your API key and secret
    const urlbox = Urlbox('', '');

    // Set your options
    const options = {
      url: urlToLoad,
      width: width,
      height: height,
      full_page: true
    };

    const imgUrl = urlbox.buildUrl(options);

    return (
      <Device style={deviceStyle}>
        <Header>
          <Buttons>
            {!smallZoom &&
              <CopyToClipboard text={imgUrl}>
                <Button
                  onClick={() =>
                    alert('Screenshot URL copied to clipboard! 📸')}
                  title="Settings"
                >
                  <ButtonIcon className={buttonIconClassname} name="camera" />
                </Button>
              </CopyToClipboard>}
            <Button
              onClick={settings.toggleOrientation}
              title="Toggle orientation"
            >
              <ButtonIcon
                className={buttonIconClassname}
                orientation={orientation}
                name="mobile"
              />
            </Button>
          </Buttons>

          <Name small={smallZoom}> {name} </Name>

          <Size>
            {showSize && <span>{width} x {height} </span>}
          </Size>
        </Header>

        {urlToLoad && <iframe src={urlToLoad} {...frameProps} />}

        {/* Allows Sizzy to be used as a component/plugin in react-storybook, etc */}
        {hasChildren &&
          <Framed {...frameProps}>
            {children}
          </Framed>}
      </Device>
    );
  }
}

export default DeviceComponent;
