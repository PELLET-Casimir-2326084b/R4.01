import './Body.css';
import React, { useState } from 'react';
import Button from '../button/Button'; // Import du composant Button
import Taches from '../data/Taches'; // Import des tâches
import Categories from '../data/Categories'; // Import des catégories
import { useData } from '../data/DataContext'; // Importer le hook personnalisé

function Body() {
    const { currentdata } = useData(); // Accéder aux données du contexte
    const [selectedButton, setSelectedButton] = useState("taches");
    const [statusFilter, setStatusFilter] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [openTache, setOpenTache] = useState(null); // État pour suivre la tâche ouverte
    const [openCategory, setOpenCategory] = useState(null); // État pour suivre la catégorie ouverte

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
    };

    // Filtrer les tâches par statut
    const filteredTaches = currentdata.taches.filter(tache => {
        if (statusFilter === '') return true;
        return tache.etat === statusFilter;
    });

    // Trier les tâches
    const sortedTaches = [...filteredTaches].sort((a, b) => {
        if (sortCriteria === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortCriteria === 'date_creation') {
            const dateA = new Date(a.date_creation);
            const dateB = new Date(b.date_creation);
            return dateA - dateB;
        } else if (sortCriteria === 'date_echeance') {
            const dateA = new Date(a.date_echeance);
            const dateB = new Date(b.date_echeance);
            return dateA - dateB;
        }
        return 0;
    });

    // Gérer l'ouverture/fermeture des tâches
    const toggleTache = (id) => {
        setOpenTache(openTache === id ? null : id); // Fermer si la même tâche est déjà ouverte
    };

    // Gérer l'ouverture/fermeture des catégories
    const toggleCategory = (id) => {
        setOpenCategory(openCategory === id ? null : id); // Fermer si la même catégorie est déjà ouverte
    };

    return (
        <header>
            <h1>Gestion des Tâches et Catégories</h1>
            <div className="btn-container">
                <Button
                    label="Tâche"
                    isActive={selectedButton === 'taches'}
                    onClick={() => handleButtonClick('taches')}
                />
                <Button
                    label="Catégorie"
                    isActive={selectedButton === 'categorie'}
                    onClick={() => handleButtonClick('categorie')}
                />
            </div>

            {selectedButton === 'taches' && (
                <main>
                    <div className="filters">
                        <label htmlFor="statusFilter">Filtrer par statut :</label>
                        <select id="statusFilter" value={statusFilter} onChange={handleStatusChange}>
                            <option value="">Tous</option>
                            <option value="Reussi">Réussi</option>
                            <option value="Abandonné">Abandonné</option>
                            <option value="En attente">En attente</option>
                            <option value="En cours">En Cours</option>
                            <option value="Nouveau">Nouveau</option>
                        </select>

                        <label htmlFor="sortCriteria">Trier par :</label>
                        <select id="sortCriteria" value={sortCriteria} onChange={handleSortChange}>
                            <option value="">Sélectionnez</option>
                            <option value="title">Nom</option>
                            <option value="date_creation">Date de création</option>
                            <option value="date_echeance">Date d'échéance</option>
                        </select>
                    </div>

                    <Taches
                        taches={sortedTaches}
                        toggleTache={toggleTache}
                        openTache={openTache}
                    />
                </main>
            )}

            {selectedButton === 'categorie' && (
                <main>
                    <Categories
                        categories={currentdata.categories}
                        toggleCategory={toggleCategory}
                        openCategory={openCategory}
                    />
                </main>
            )}
        </header>
    );
}

export default Body;
