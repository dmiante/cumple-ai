'use client'

import BirthdayForm from "./components/birthday-form"

export default function Home() {

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl w-full bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden">
          <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            CumpleAI
          </h1>
        </div>
        {/* Birthday Form */}
        <BirthdayForm />
      </main>
      <footer>
        <p>Built by Dmiante 🦁</p>
      </footer>
    </>
  );
}
