import React, { useState, createContext } from "react";

export const EkipeContext = createContext();

export const EkipeContextProvider = (props) => {
  const [ekipe, setEkipe] = useState([]);
  const [asistenti, setAsistenti] = useState([]);
  const [razpored, setRazpored] = useState([]);
  const [igralci, setIgralci] = useState([]);
  const [tekme, setTekme] = useState([]);
  const [lestvica, setLestvica] = useState([]);
  const [tekma, setTekma] = useState([]);
  const [goalass, setGoalAss] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  //Izbira ekipa, da aplikacija ve katera ekipa je izbrana
  const [selectedTeam, setSelectedTeam] = useState(null);

  const addEkipe = (ekipa) => {
    setEkipe([...ekipe, ekipa]);
  };

  const addPlayers = (igralec) => {
    setIgralci([...igralci, igralec]);
  };

  const addMatches = (tekma) => {
    setTekme([...tekme, tekma]);
  };

  const addStrelciAsistenti = (posamezna) => {
    setGoalAss([...goalass, posamezna]);
  };

  return (
    <EkipeContext.Provider
      value={{
        isAuth,
        setIsAuth,
        ekipe,
        setEkipe,
        addEkipe,
        asistenti,
        setAsistenti,
        razpored,
        setRazpored,
        igralci,
        setIgralci,
        addPlayers,
        tekme,
        setTekme,
        addMatches,
        lestvica,
        setLestvica,
        selectedTeam,
        setSelectedTeam,
        tekma,
        setTekma,
        goalass,
        setGoalAss,
        addStrelciAsistenti,
      }}
    >
      {props.children}
    </EkipeContext.Provider>
  );
};
