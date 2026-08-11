import React, { useState } from 'react'
import { useSubscribers, useAddSubscriber, useDeleteSubscriber } from '@/services/query-hooks'
import { Mail, Plus, Trash2, Loader2, Users } from 'lucide-react'

const NewsletterAudiencePanel: React.FC = () => {
  const { data: subscribers, isLoading } = useSubscribers()
  const addSubscriber = useAddSubscriber()
  const deleteSubscriber = useDeleteSubscriber()

  const [newEmail, setNewEmail] = useState('')
  const [newName, setNewName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!newEmail.trim()) return

    try {
      await addSubscriber.mutateAsync({ email: newEmail, name: newName })
      setNewEmail('')
      setNewName('')
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Failed to add subscriber')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this subscriber?')) {
      await deleteSubscriber.mutateAsync(id)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <Mail size={16} color="#10B981" />
        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>Newsletter Audience</p>
      </div>
      
      <p style={{ margin: '0 0 10px', fontSize: '0.82rem', color: '#666' }}>
        Manage your mailing list. You can publish directly to these subscribers from the Content Creation page.
      </p>

      {/* Add new subscriber form */}
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <input
          type="email"
          placeholder="Email address"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
          style={{
            flex: 1,
            minWidth: 200,
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #E2E8F0',
            fontSize: '0.85rem'
          }}
        />
        <input
          type="text"
          placeholder="Name (Optional)"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            width: 150,
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #E2E8F0',
            fontSize: '0.85rem'
          }}
        />
        <button
          type="submit"
          disabled={addSubscriber.isPending || !newEmail.trim()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            backgroundColor: '#10B981',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontWeight: 500,
            fontSize: '0.85rem',
            cursor: (addSubscriber.isPending || !newEmail.trim()) ? 'not-allowed' : 'pointer',
            opacity: (addSubscriber.isPending || !newEmail.trim()) ? 0.7 : 1
          }}
        >
          {addSubscriber.isPending ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
          Add
        </button>
      </form>
      
      {errorMsg && <p style={{ margin: 0, color: '#EF4444', fontSize: '0.8rem' }}>{errorMsg}</p>}

      {/* Subscribers list */}
      <div style={{ 
        marginTop: 12,
        backgroundColor: '#F8FAFC', 
        border: '1px solid #E2E8F0', 
        borderRadius: 8,
        overflow: 'hidden'
      }}>
        <div style={{ padding: '12px 16px', backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Users size={14} /> Total Subscribers
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A', backgroundColor: '#E2E8F0', padding: '2px 8px', borderRadius: 12 }}>
            {subscribers?.length || 0}
          </span>
        </div>

        {isLoading ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#64748B' }}>
            <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto' }} />
          </div>
        ) : subscribers && subscribers.length > 0 ? (
          <div style={{ maxHeight: 250, overflowY: 'auto' }}>
            {subscribers.map((sub: any) => (
              <div key={sub.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '12px 16px',
                borderBottom: '1px solid #F1F5F9',
                backgroundColor: 'white'
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 500, color: '#1E293B' }}>{sub.email}</p>
                  {sub.name && <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748B' }}>{sub.name}</p>}
                </div>
                <button
                  onClick={() => handleDelete(sub.id)}
                  disabled={deleteSubscriber.isPending}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#EF4444',
                    cursor: deleteSubscriber.isPending ? 'not-allowed' : 'pointer',
                    opacity: deleteSubscriber.isPending ? 0.5 : 1,
                    padding: 4
                  }}
                  title="Remove subscriber"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: 24, textAlign: 'center', color: '#64748B', fontSize: '0.85rem' }}>
            No subscribers yet. Add one above!
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsletterAudiencePanel
