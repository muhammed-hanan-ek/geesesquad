import React, { createContext, useState } from 'react';

export const highlengthContext = createContext();
export const mediumlengthContext = createContext();
export const lowlengthContext = createContext();


export const ContextShare = ({ children }) => {
    const [highLength, setHighLength] = useState();
   const[meduimLength,setMediumLength]=useState()
   const[lowLength,setlowLength]=useState()

    return (
      
            <lowlengthContext.Provider value={[lowLength,setlowLength]}>
                <mediumlengthContext.Provider value={[meduimLength,setMediumLength]}>
                    <highlengthContext.Provider value={[highLength, setHighLength]}>
                        {children}
                    </highlengthContext.Provider>
                </mediumlengthContext.Provider>
            </lowlengthContext.Provider>
        

    );
};

export default ContextShare