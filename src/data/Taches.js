import React from 'react';

function Taches({ taches, toggleTache, openTache }) {
    return (
        <div className="taches-list">
            {taches.map((tache) => (
                <div key={tache.id} className="tache-item">
                    <h3 onClick={() => toggleTache(tache.id)}>
                        {tache.title}
                        <span>{openTache === tache.id ? '▼' : '►'}</span>
                    </h3>

                    {openTache === tache.id && (
                        <div className="tache-details">
                            <p><strong>Status :</strong> {tache.etat}</p>
                            <p><strong>Date de création :</strong> {new Date(tache.date_creation).toLocaleDateString()}</p>
                            <p><strong>Date d'échéance :</strong> {new Date(tache.date_echeance).toLocaleDateString()}</p>
                            {tache.urgent && <p><strong>Urgent</strong></p>}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Taches;
