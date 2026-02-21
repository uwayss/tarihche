import { Link } from 'react-router-dom';
import { getUnitsWithTopics } from '../content/catalog';

export default function HomePage() {
  const units = getUnitsWithTopics();

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center py-24 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 border-4 border-slate-200 rounded-full opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 border-4 border-slate-200 rounded-full opacity-50 pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 border-4 border-slate-200 rotate-45 opacity-50 pointer-events-none"></div>

      <div className="max-w-4xl w-full text-center mb-20 relative z-10">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-900 text-white rounded-sm mb-8 shadow-xl rotate-3">
          <span className="text-6xl font-serif font-black">T</span>
        </div>
        <h1 className="text-7xl font-black tracking-tighter text-slate-900 mb-6 font-serif">Tarihche</h1>
        <p className="text-2xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-serif italic">
          A modular, navigable study interface: topics are pages, sections are
          collapsible.
        </p>
        <div className="mt-12">
          <Link to="/toc" className="inline-block px-10 py-5 bg-slate-900 text-white font-bold text-xl rounded-sm shadow-xl hover:bg-slate-800 hover:-translate-y-1 transition-all active:translate-y-0 font-serif border-b-4 border-slate-700">
            İçindekiler'e Git →
          </Link>
        </div>
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        {units.map((u) => (
          <section key={u.id} className="bg-[#fffdfa] p-10 rounded-sm shadow-lg border-2 border-slate-200 hover:shadow-xl transition-shadow relative before:absolute before:inset-0 before:border-[6px] before:border-double before:border-slate-100/50 before:pointer-events-none before:rounded-sm">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b-2 border-slate-200 font-serif">{u.title}</h2>
            <ul className="space-y-4 m-0 p-0 list-none">
              {u.topics.map((t) => (
                <li key={t.slug} className="group">
                  <Link to={`/topic/${t.slug}`} className="flex items-start text-xl text-slate-700 hover:text-indigo-800 transition-colors font-serif">
                    <span className="text-slate-400 group-hover:text-indigo-500 mr-4 mt-1 font-sans">§</span>
                    <span className="border-b border-transparent group-hover:border-indigo-200 pb-1">{t.title}</span>
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
