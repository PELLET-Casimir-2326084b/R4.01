import React from 'react';

function Categories({ categories, toggleCategory, openCategory }) {
    return (
        <div className="categories-list">
            {categories.map((category) => (
                <div key={category.id} className="category-item">
                    <h3 onClick={() => toggleCategory(category.id)}>
                        {category.title}
                        <span>{openCategory === category.id ? '▼' : '►'}</span>
                    </h3>

                    {openCategory === category.id && (
                        <div className="category-details">
                            <p><strong>Couleur :</strong> {category.color}</p>
                            <p><strong>Actif :</strong> {category.actif ? 'Oui' : 'Non'}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Categories;
