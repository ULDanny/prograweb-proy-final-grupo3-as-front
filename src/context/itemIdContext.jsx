import { createContext, useContext, useState } from "react";
const ItemIdContext = createContext();
export const ItemIdProvider = ({children}) =>{
    const [itemId, setItemId] = useState(null);
    const setItemIdContext = (id) => {
        setItemId(id);
    }

    return (
        <ItemIdContext.Provider value={{itemId, setItemIdContext}}>
            {children}
        </ItemIdContext.Provider>
    );
};

export const useItemId = () => {
    const context = useContext(ItemIdContext);
    if(!context){
        throw new Error('useItemId debe ser utilizado dentro de un ItemIdProvider');
    }
    return context;
}
