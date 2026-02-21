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
        <div className="flex items-center justify-between w-full h-full">
          <div className="flex-none w-48">
            <Link to="/toc" className="flex items-center gap-3 text-2xl font-black tracking-tighter text-slate-900 hover:text-indigo-700 transition-colors font-serif" aria-label="İçindekiler">
              <span className="w-8 h-8 bg-slate-900 text-white rounded-sm flex items-center justify-center text-lg">T</span>
              Tarihche
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-xl font-bold text-slate-800 font-serif border-b-2 border-slate-300 pb-1">İçindekiler</div>
          </div>
          <div className="flex-none w-48 flex justify-end">
            {lastTopic ? (
              <button
                type="button"
                className="px-4 py-2 rounded-lg font-bold text-indigo-700 hover:bg-indigo-50 transition-colors font-serif"
                onClick={goLast}
              >
                Devam et →
              </button>
            ) : null}
          </div>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto py-16 px-6">
        {lastTopic ? (
          <div className="mb-16 p-8 bg-[#fffdfa] rounded-sm border-2 border-slate-200 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative before:absolute before:inset-0 before:border-[6px] before:border-double before:border-slate-100/50 before:pointer-events-none before:rounded-sm">
            <div className="relative z-10">
              <div className="text-sm font-bold text-indigo-700 uppercase tracking-widest mb-2 font-sans">Son kaldığın yer</div>
              <div className="text-2xl font-bold text-slate-900 font-serif">{lastTopic.title}</div>
            </div>
            <button type="button" className="relative z-10 px-8 py-3 bg-slate-900 text-white font-bold rounded-sm hover:bg-slate-800 transition-colors shadow-sm font-serif" onClick={goLast}>
              Devam et
            </button>
          </div>
        ) : null}

        <div className="space-y-12">
          {units.map((u) => (
            <details key={u.id} className="group bg-[#fffdfa] rounded-sm border border-slate-300 shadow-sm overflow-hidden" open>
              <summary className="cursor-pointer p-8 bg-slate-100/50 font-bold text-2xl text-slate-900 flex items-center justify-between select-none font-serif border-b border-slate-200">
                {u.title}
                <svg className="w-6 h-6 text-slate-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <ul className="p-8 space-y-4 m-0 list-none">
                {u.topics.map((t) => (
                  <li key={t.slug}>
                    <Link
                      className={`block p-4 rounded-sm transition-colors font-serif text-lg ${
                        t.slug === lastSlug
                          ? 'bg-indigo-50/50 text-indigo-800 font-bold border-l-4 border-indigo-600'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent hover:border-slate-300'
                      }`}
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
