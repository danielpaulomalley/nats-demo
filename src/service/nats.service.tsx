//https://dev.to/dansolhan/simple-dependency-injection-functionality-for-react-518j
import React, { createContext, FC } from "react";

export interface INATSService {

}

export const NATSServiceContext = createContext<INATSService | undefined>(undefined);

const NATSService: FC = ({children}: any) => {
  const natsService = {

  }
  return (
    <>
      <NATSServiceContext.Provider value={natsService}>
        {children}
      </NATSServiceContext.Provider>
    </>
  )
}

export default NATSService