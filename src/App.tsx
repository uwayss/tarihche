import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import TopicPage from './pages/TopicPage'
import { getFirstTopicSlug } from './content/catalog'

export default function App() {
  const first = getFirstTopicSlug()

  return (
    <Routes>
      <Route path="/" element={<Navigate to={first ? `/topic/${first}` : '/topic/welcome'} replace />} />
      <Route path="/topic/:slug" element={<TopicPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
