import React, { useEffect, useRef, useState } from 'react'
import Card from '../components/Card'
import { Post } from '../types.d'

export default function Posts(){
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data: Post[]) => {
        if (cancelled) return
        setPosts(prev => page === 1 ? data : [...prev, ...data])
        setHasMore(data.length > 0)
      })
      .catch(err => { if (!cancelled) setError(String(err)) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [page])

  // reset when search query changes
  useEffect(() => {
    setPosts([])
    setPage(1)
    setHasMore(true)
  }, [q])

  // infinite scroll observer
  useEffect(() => {
    if (!sentinelRef.current) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage(p => p + 1)
      }
    }, { root: null, rootMargin: '200px', threshold: 0.1 })
    observerRef.current.observe(sentinelRef.current)
    return () => observerRef.current?.disconnect()
  }, [hasMore, loading])

  const filtered = posts.filter(p => p.title.includes(q) || p.body.includes(q))

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center gap-2">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search posts" className="flex-1 rounded px-3 py-2 dark:bg-gray-700" />
          <button onClick={() => { setPage(1); setPosts([]) }} className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700">Refresh</button>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <Card key={p.id} className="hover:scale-[1.01] transition-transform">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm mt-2">{p.body}</p>
          </Card>
        ))}
      </div>

      {error && <div className="text-red-500">{error}</div>}
      {loading && <div>Loading...</div>}

      <div ref={sentinelRef} />
      {!hasMore && <div className="text-center text-sm text-gray-500">No more posts</div>}
    </div>
  )
}
