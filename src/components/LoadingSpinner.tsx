import React, { FunctionComponent } from 'react';


import * as styles from './styles/LoadingSpinnerStyles';

interface LoadingSpinnerProps {
  text?: string|undefined
}

const LoadingSpinner: FunctionComponent<LoadingSpinnerProps> = ({text, ...rest}) => {
  return (
    <styles.LoadingWrapper>
      {text ? <styles.LoadingText>{text}</styles.LoadingText> : null}
      <styles.SpinnerWrapper>
        <styles.LoadingSpinner animation="border" variant="primary" role="status"><span className="sr-only">Loading...</span></styles.LoadingSpinner>
      </styles.SpinnerWrapper>
    </styles.LoadingWrapper>
  )
}

export default LoadingSpinner;
