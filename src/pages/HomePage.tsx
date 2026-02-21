import { Link } from 'react-router-dom';
import { getUnitsWithTopics } from '../content/catalog';

export default function HomePage() {
  const units = getUnitsWithTopics();

  return (
    <div className="tc-home">
      <h1 className="tc-title">Tarihche</h1>
      <p className="tc-subtitle">
        A modular, navigable study interface: topics are pages, sections are
        collapsible.
      </p>

      <div className="tc-homeUnits">
        {units.map((u) => (
          <section key={u.id} className="tc-homeUnit">
            <h2 className="tc-homeUnitTitle">{u.title}</h2>
            <ul className="tc-homeTopicList">
              {u.topics.map((t) => (
                <li key={t.slug} className="tc-homeTopicItem">
                  <Link to={`/topic/${t.slug}`} className="tc-link">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
