'use client'

import BirthdayForm from "./components/birthday-form";

export default function Home() {
  return (
    <>
      <main className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8">
        <h1 className="text-5xl font-extrabold mb-8">
          CumpleAI
        </h1>
        {/* Birthday Form */}
        <BirthdayForm />
      </main>
      <footer className="text-center">
        <p>Built by Dmiante 🦁</p>
      </footer>
    </>
  )
}
