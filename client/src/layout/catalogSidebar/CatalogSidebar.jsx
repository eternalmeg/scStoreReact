import React from "react";

export default function CatalogSidebar({ categories, activeCategory, onCategorySelect }) {
    return (
        <section className="sidebar-single-area product-categories-area">
            <h3 className="sidebar-single-area__title">Product Categories</h3>

            <ul className="product-categories">
                <li
                    className={activeCategory === null ? "active" : ""}
                    onClick={() => onCategorySelect(null)}
                >
                    All Products ({categories.reduce((s, c) => s + c.count, 0)})
                </li>

                {categories.map(cat => (
                    <li
                        key={cat.name}
                        className={activeCategory === cat.name ? "active" : ""}
                        onClick={() => onCategorySelect(cat.name)}
                    >
                        {cat.name} ({cat.count})
                    </li>
                ))}
            </ul>
        </section>
    );
}
