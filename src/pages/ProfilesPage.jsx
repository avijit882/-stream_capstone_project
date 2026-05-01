// src/pages/ProfilesPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProfile, addProfile } from '../redux/authSlice';
import { FiPlus, FiCheck } from 'react-icons/fi';

const AVATARS = ['🦁','🐼','🐸','🦊','🐯','🦄','🐉','🦋','🐺','🦅'];
const COLORS  = ['#E50914','#0080FF','#00C851','#FF6B00','#9C27B0','#FF69B4','#00BCD4','#FF9800'];

export default function ProfilesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profiles = useSelector(s => s.auth.profiles);

  const [adding,    setAdding]    = useState(false);
  const [newName,   setNewName]   = useState('');
  const [newAvatar, setNewAvatar] = useState(AVATARS[0]);
  const [newColor,  setNewColor]  = useState(COLORS[0]);

  const choose = profile => { dispatch(selectProfile(profile)); navigate('/home'); };

  const save = () => {
    if (!newName.trim()) return;
    dispatch(addProfile({ id: Date.now(), name: newName.trim(), avatar: newAvatar, color: newColor }));
    setAdding(false); setNewName('');
  };

  return (
    <div className="min-h-screen bg-sv-dark flex flex-col items-center justify-center px-4 font-body">
      <h1 className="text-white font-bold text-3xl sm:text-4xl mb-12">Who's watching?</h1>

      <div className="flex flex-wrap justify-center gap-5 max-w-2xl">
        {profiles.map(p => (
          <button key={p.id} onClick={() => choose(p)}
            className="group flex flex-col items-center gap-3 p-4 rounded-xl
                       hover:bg-white/5 transition-all duration-200 hover:scale-105">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl flex items-center justify-center text-5xl
                            border-2 border-transparent group-hover:border-white transition-all"
              style={{ background: p.color + '22' }}>
              {p.avatar}
            </div>
            <span className="text-gray-400 group-hover:text-white text-sm font-medium transition-colors">
              {p.name}
            </span>
          </button>
        ))}

        {profiles.length < 5 && !adding && (
          <button onClick={() => setAdding(true)}
            className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-all hover:scale-105">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-2 border-dashed border-gray-700
                            group-hover:border-gray-400 flex items-center justify-center transition-all">
              <FiPlus size={32} className="text-gray-700 group-hover:text-gray-300 transition-colors" />
            </div>
            <span className="text-gray-600 group-hover:text-gray-300 text-sm transition-colors">Add Profile</span>
          </button>
        )}
      </div>

      {/* Add profile form */}
      {adding && (
        <div className="mt-8 bg-sv-card border border-sv-border rounded-2xl p-6 w-full max-w-sm animate-slide-up space-y-4">
          <h3 className="text-white font-semibold text-base">New Profile</h3>

          <input autoFocus value={newName} onChange={e => setNewName(e.target.value)}
            placeholder="Name"
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-sv-border text-white text-sm
                       outline-none focus:border-sv-red transition-colors" />

          <div>
            <p className="text-gray-500 text-xs mb-2">Avatar</p>
            <div className="flex gap-2 flex-wrap">
              {AVATARS.map(a => (
                <button key={a} onClick={() => setNewAvatar(a)}
                  className={`text-2xl p-1 rounded-lg border-2 transition-all
                    ${newAvatar === a ? 'border-sv-red scale-110' : 'border-transparent hover:border-gray-600'}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-xs mb-2">Colour</p>
            <div className="flex gap-2">
              {COLORS.map(c => (
                <button key={c} onClick={() => setNewColor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition-all
                    ${newColor === c ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ background: c }} />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={save}
              className="flex-1 py-2.5 bg-sv-red text-white font-semibold rounded-xl text-sm hover:bg-red-700 transition-colors">
              Save
            </button>
            <button onClick={() => setAdding(false)}
              className="flex-1 py-2.5 border border-sv-border text-gray-300 rounded-xl text-sm hover:bg-white/5 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
