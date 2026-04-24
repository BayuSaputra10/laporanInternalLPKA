"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type FormData = {
  tanggal: string
  catatan: string
  photo: File | null
}

type Errors = Partial<Record<keyof FormData, string>>

export default function CreateGensetServiceReport() {
  const router = useRouter()

  const [form, setForm] = useState<FormData>({
    tanggal: '',
    catatan: '',
    photo: null
  })

  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 shadow-sm hover:shadow-md transition-all md:px-6 md:py-4'
  const labelClass = 'block text-sm font-semibold text-gray-800 mb-2 md:text-base md:mb-3'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement
    if (name === 'photo') {
      const file = files?.[0] || null
      if (file && !file.type.startsWith('image/')) {
        toast.error('Hanya file foto yang diizinkan')
        return
      }
      setForm(prev => ({ ...prev, photo: file }))
      setErrors(prev => ({ ...prev, photo: '' }))
      return
    }
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name as keyof FormData]: '' }))
  }

  const validate = (): Errors => {
    const newErrors: Errors = {}
    if (!form.tanggal) newErrors.tanggal = 'Tanggal wajib diisi'
    if (!form.catatan.trim()) newErrors.catatan = 'Catatan servis wajib diisi'
    if (!form.photo) newErrors.photo = 'Foto servis wajib diupload'
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Mohon lengkapi data yang kurang')
      return
    }
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('tanggal', form.tanggal)
      formData.append('catatan', form.catatan)
      if (form.photo) formData.append('photo', form.photo)
      const res = await fetch('/api/reports/genset-service', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success('Laporan servis genset berhasil dibuat!')
        router.push('/reports/genset-service')
      } else {
        toast.error(data.message || 'Gagal membuat laporan servis genset')
      }
    } catch {
      toast.error('Kesalahan jaringan')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(20,184,166,0.3),transparent),radial-gradient(circle_at_80%_20%,rgba(45,212,191,0.3),transparent),radial-gradient(circle_at_50%_50%,rgba(120,200,255,0.2),transparent)] pointer-events-none animate-pulse" />

      <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden mx-auto">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-teal-600/95 to-teal-800 p-6 sm:p-8 text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Servis Genset
            </h1>
            <p className="text-teal-100 text-sm sm:text-base md:text-lg mt-2 opacity-90">
              Laporan servis dan perawatan genset
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-6 md:p-8 space-y-5 md:space-y-6"
          >
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-3 md:gap-5">
              {/* Tanggal */}
              <div>
                <label className={labelClass}>Tanggal Servis *</label>
                <input
                  type="date"
                  name="tanggal"
                  value={form.tanggal}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.tanggal && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium">
                    {errors.tanggal}
                  </p>
                )}
              </div>
            </div>

            {/* Catatan */}
            <div>
              <label className={labelClass}>Catatan Servis *</label>
              <textarea
                name="catatan"
                placeholder="Contoh: Ganti oli mesin, servis filter, pengecekan sistem kelistrikan, dll"
                value={form.catatan}
                onChange={handleChange}
                rows={4}
                className={`${inputClass} resize-none`}
              />
              {errors.catatan && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium">
                  {errors.catatan}
                </p>
              )}
            </div>

            {/* Upload */}
            <div>
              <label className={labelClass}>
                Upload Foto Servis *
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="w-full mt-2 p-3 border-2 border-dashed border-teal-500/30 rounded-xl bg-teal-50/50 text-sm sm:text-base file:mr-4 file:py-2 sm:file:py-3 file:px-4 sm:file:px-6 file:rounded-xl file:border-0 file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-600/90 hover:border-teal-500/50 transition-all cursor-pointer"
              />
              {errors.photo && (
                <p className="text-red-500 text-xs sm:text-sm mt-2 font-medium">
                  {errors.photo}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              disabled={submitting}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-600/90 hover:to-teal-700/90 text-white py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-500/50"
            >
              {submitting ? "Menyimpan Laporan..." : "Simpan Laporan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

