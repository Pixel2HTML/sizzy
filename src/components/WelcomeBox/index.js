// @flow
import typeof store from 'stores/store';
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import themes from 'styles/themes';
import views from 'config/views';

//styled-components
import {
  WelcomeBox,
  IntroText,
  ExampleLink,
  UrlBar,
  Content,
  Letter,
  Shapes,
  LetterAndShapes,
  ShapesWrap,
  MadeBy
} from './styles';
import {ThemeProvider} from 'styled-components';

//styles
import {UrlInputStyles} from './styles';

//img
import LetterSvg from 'img/icon.svg';
import ShapesSvg from 'img/shapes.svg';

type Props = {
  store: any | store
};

@inject('store')
@observer
class WelcomeBoxComponent extends Component {
  props: Props;

  static defaultProps = {
    store: null
  };

  render() {
    const {store} = this.props;
    const {app, router} = store;
    const {loading, showWelcomeContent} = app;

    return (
      <WelcomeBox>

        <LetterAndShapes loading={loading}>
          <Letter loading={loading} src={LetterSvg} />
          <ShapesWrap loading={loading}>
            <Shapes src={ShapesSvg} />
          </ShapesWrap>
        </LetterAndShapes>

        <Content show={showWelcomeContent}>

          <IntroText> Enter an url to start </IntroText>

          <ThemeProvider theme={themes.dark}>
            <UrlBar styles={UrlInputStyles} />
          </ThemeProvider>

          <ExampleLink onClick={app.loadExampleUrl}>
            Click here to load an example!
          </ExampleLink>

        </Content>

      </WelcomeBox>
    );
  }
}

export default WelcomeBoxComponent;
