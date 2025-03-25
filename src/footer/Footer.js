import React, { useState } from 'react';
import Button from '../button/Button';
import './Footer.css';
import { useData } from '../data/DataContext'; // Importer le hook personnalisé

function Footer() {
    const { addTache, addCategorie } = useData(); // Accéder aux fonctions du contexte
    const [selectedButton, setSelectedButton] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date_creation: '',
        date_echeance: '',
        etat: '',
        color: ''
    });
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Gestion du clic sur les boutons Tâche / Catégorie
    const handleButtonClick = (buttonName) => {
        if (selectedButton === buttonName) {
            setSelectedButton(null);
            setIsFormVisible(false);  // Masquer le formulaire si on clique à nouveau
        } else {
            setSelectedButton(buttonName);
            setIsFormVisible(true);   // Afficher le formulaire lorsque l'on sélectionne une nouvelle option
        }
    };

    // Gestion des changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Ajouter la tâche ou la catégorie en fonction de la sélection
        if (selectedButton === 'tache') {
            addTache(formData);
        } else if (selectedButton === 'categorie') {
            addCategorie(formData);
        }

        // Réinitialisation du formulaire
        setFormData({
            title: '',
            description: '',
            date_creation: '',
            date_echeance: '',
            etat: '',
            color: ''
        });

        // Masquer le formulaire après ajout
        setIsFormVisible(false);
    };

    return (
        <footer>
            <div className="btn-container">
                <Button
                    label="Tâche"
                    isActive={selectedButton === 'tache'}
                    onClick={() => handleButtonClick('tache')}
                />
                <Button
                    label="Catégorie"
                    isActive={selectedButton === 'categorie'}
                    onClick={() => handleButtonClick('categorie')}
                />
            </div>

            {isFormVisible && (
                <div className="form-container">
                    <h2>{selectedButton === 'tache' ? 'Ajouter une tâche' : 'Ajouter une catégorie'}</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Titre:
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        {selectedButton === 'tache' && (
                            <>
                                <label>
                                    Description:
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Date de création:
                                    <input
                                        type="date"
                                        name="date_creation"
                                        value={formData.date_creation}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Date d'échéance:
                                    <input
                                        type="date"
                                        name="date_echeance"
                                        value={formData.date_echeance}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Statut:
                                    <select
                                        name="etat"
                                        value={formData.etat}
                                        onChange={handleChange}
                                    >
                                        <option value="Nouveau">Nouveau</option>
                                        <option value="En attente">En attente</option>
                                        <option value="En Cours">En Cours</option>
                                        <option value="Reussi">Réussi</option>
                                        <option value="Abandonné">Abandonné</option>
                                    </select>
                                </label>
                            </>
                        )}

                        {selectedButton === 'categorie' && (
                            <>
                                <label>
                                    Couleur:
                                    <input
                                        type="text"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </>
                        )}

                        <button type="submit">Ajouter</button>
                    </form>
                </div>
            )}
        </footer>
    );
}

export default Footer;
