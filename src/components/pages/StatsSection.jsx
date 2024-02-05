import React from 'react';
import { stats } from '../constants/index';
import '../../Sass/StatsSection.scss';


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
