import React, { createContext, useState, useContext } from 'react';
import data from './data.json';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [currentdata, setCurrentdata] = useState(data);

    const addTache = (newTache) => {
        const tache = {
            ...newTache,
            id: currentdata.taches.length + 101,
        };
        const newData = {
            ...currentdata,
            taches: [...currentdata.taches, tache],
        };
        setCurrentdata(newData);
    };

    const addCategorie = (newCategorie) => {
        const categorie = {
            ...newCategorie,
            id: currentdata.categories.length + 201,
            actif: true,
        };
        const newData = {
            ...currentdata,
            categories: [...currentdata.categories, categorie],
        };
        setCurrentdata(newData);
    };

    return (
        <DataContext.Provider value={{ currentdata, addTache, addCategorie }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
