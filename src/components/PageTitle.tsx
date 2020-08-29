import React, { FunctionComponent } from 'react';
import {Helmet} from "react-helmet";

interface PageTitleProps {
  title: string
}

const PageTitle: FunctionComponent<PageTitleProps> = ({title, ...rest}) => {
  return <>
    <Helmet>
      <title>{`${title ? `${title} - ` : `` }Localing Business Dashboard`}</title>
    </Helmet>
  </>
}

export default PageTitle;