import React, { ReactNode, ReactElement } from 'react';

interface IfProps {
  condition: boolean;
  els?: Function;
}

const If: React.FunctionComponent<IfProps> = ({condition, els, children}) => {  
  {
    if (condition) {
      return children as ReactElement<any>;
    } else if (els) {
      return els();
    } else {
      return <></>;
    }
  }
}

export default If;
