import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { useData } from '../data/DataContext';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function Camembert() {
    const { currentdata } = useData();

    const counts = currentdata.taches.reduce((acc, tache) => {
        if (tache.etat === 'Reussi') acc.reussi += 1;
        else if (tache.etat === 'Abandonne') acc.abandonne += 1;
        else if (tache.etat === 'En attente') acc.enAttente += 1;
        else if (tache.etat === 'Nouveau') acc.nouveau += 1;
        else if (tache.etat === 'En cours') acc.encours += 1;
        return acc;
    }, { reussi: 0, abandonne: 0, enCours: 0, enAttente: 0, nouveau: 0});

    const data = {
        labels: ['Réussi', 'Abandonné', 'En Cours', 'En attente', 'Nouveau'],
        datasets: [
            {
                data: [counts.reussi, counts.abandonne, counts.enCours, counts.enAttente, counts.nouveau],
                backgroundColor: ['#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6c757d'],
                hoverBackgroundColor: ['#218838', '#c82333', '#e0a800', '#138496', '#5a6268'],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
            },
        },
    };

    return (
        <div>
            <div style={{ width: '235px', height: '235px' }}>
                <Pie data={data} options={options} />
            </div>
        </div>
    );
}

export default Camembert;
