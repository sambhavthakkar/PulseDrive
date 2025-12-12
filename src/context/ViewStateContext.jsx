import React, { createContext, useContext, useState } from 'react';

const ViewStateContext = createContext();

export function ViewStateProvider({ children }) {
    const [viewState, setViewState] = useState({
        diagnosisVisited: false,
        dataAnalysisVisited: false,
    });

    const [pageData, setPageDataState] = useState({});

    const setVisited = (key) => {
        setViewState(prev => ({ ...prev, [key]: true }));
    };

    const setPageData = (key, data) => {
        setPageDataState(prev => ({ ...prev, [key]: data }));
    };

    return (
        <ViewStateContext.Provider value={{ viewState, setVisited, pageData, setPageData }}>
            {children}
        </ViewStateContext.Provider>
    );
}

export function useViewState() {
    return useContext(ViewStateContext);
}
