import React from 'react';
import './StatsSection.scss';


export const stats = [
    {
        id: "stats-1",
        title:  "Visiteurs par jour",
        value: "300+",
    },
    {
        id: "stats-2",
        title: "Associations",
        value: "30+",
    },
    {
        id: "stats-3",
        title: "adherents",
        value: "223",
    },
];

const StatItem = ({ title, value }) => (
    <div className="stat-item">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
    </div>
);

const StatsSection = () => (

    <>

        <section className="stats-section">
            {stats.map((stat) => (
                <StatItem key={stat.id} {...stat} />
            ))}
        </section>
    </>
);

export default StatsSection;
