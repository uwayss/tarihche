import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import TopicPage from './pages/TopicPage'
import TocPage from './pages/TocPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RestoreOrToc />} />
      <Route path="/toc" element={<TocPage />} />
      <Route path="/topic/:slug" element={<TopicPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

const lastTopicKey = 'tarihche:lastTopic'

function safeGetLastTopicSlug(): string {
  try {
    return localStorage.getItem(lastTopicKey) ?? ''
  } catch {
    return ''
  }
}

function RestoreOrToc() {
  const last = safeGetLastTopicSlug()
  if (last) {
    return <Navigate to={`/topic/${last}`} replace />
  }
  return <TocPage />
}
