import { Link, useNavigate } from 'react-router-dom';
import { getUnitsWithTopics, getTopicBySlug } from '../content/catalog';
import { ReaderLayout } from '../layout/ReaderLayout';

const lastTopicKey = 'tarihche:lastTopic';

function safeGetLastTopicSlug(): string {
  try {
    return localStorage.getItem(lastTopicKey) ?? '';
  } catch {
    return '';
  }
}

export default function TocPage() {
  const navigate = useNavigate();
  const units = getUnitsWithTopics();
  const lastSlug = safeGetLastTopicSlug();
  const lastTopic = lastSlug ? getTopicBySlug(lastSlug) : undefined;

  const goLast = () => {
    if (!lastTopic) return;
    navigate(`/topic/${lastTopic.slug}`);
  };

  return (
    <ReaderLayout
      topBar={
        <div className="tc-topbarInner">
          <div className="tc-topbarLeft">
            <Link to="/toc" className="tc-topbarBrand" aria-label="İçindekiler">
              Tarihche
            </Link>
          </div>
          <div className="tc-topbarCenter">
            <div className="tc-topbarTitle">İçindekiler</div>
          </div>
          <div className="tc-topbarRight">
            {lastTopic ? (
              <button
                type="button"
                className="tc-topbarNavBtn"
                onClick={goLast}
              >
                Devam et
              </button>
            ) : null}
          </div>
        </div>
      }
    >
      <div className="tc-toc">
        {lastTopic ? (
          <div className="tc-tocLast">
            <div className="tc-tocLastLabel">Son kaldığın yer</div>
            <button type="button" className="tc-tocLastBtn" onClick={goLast}>
              {lastTopic.title}
            </button>
          </div>
        ) : null}

        <div className="tc-tocUnits">
          {units.map((u) => (
            <details key={u.id} className="tc-tocUnit" open>
              <summary className="tc-tocUnitTitle">{u.title}</summary>
              <ul className="tc-tocTopicList">
                {u.topics.map((t) => (
                  <li key={t.slug}>
                    <Link
                      className={
                        t.slug === lastSlug
                          ? 'tc-tocTopic tc-tocTopicActive'
                          : 'tc-tocTopic'
                      }
                      to={`/topic/${t.slug}`}
                    >
                      {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </ReaderLayout>
  );
}
