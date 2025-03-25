import React from 'react';
import Camembert from './Camembert';
import { useData } from '../data/DataContext'; // Import du hook personnalisé

function Header() {
    const { currentdata } = useData(); // Accès aux données via useData

    const tachesFiltre = currentdata.taches.filter(tache => tache.etat !== "Reussi" && tache.etat !== "Abandonne");
    const nbTachesFiltre = tachesFiltre.length;

    return (
        <div style={{ backgroundColor: "yellowgreen" }}>
            <div>
                {nbTachesFiltre} Tâches en cours
                <Camembert taches={currentdata.taches} />
            </div>
        </div>
    );
}

export default Header;
