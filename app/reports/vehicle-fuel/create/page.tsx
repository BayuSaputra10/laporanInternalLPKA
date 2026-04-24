"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type FormData = {
  jenisKendaraan: string
  tambahSolar: number | null
  tanggal: string
  photo: File | null
}

type Errors = Partial<Record<keyof FormData, string>>

export default function CreateVehicleFuelReport() {
  const router = useRouter()

  const [form, setForm] = useState<FormData>({
    jenisKendaraan: '',
    tambahSolar: null,
    tanggal: '',
    photo: null
  })

  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lpka-green/50 focus:border-lpka-green shadow-sm hover:shadow-md transition-all md:px-6 md:py-4'
  const labelClass = 'block text-sm font-semibold text-gray-800 mb-2 md:text-base md:mb-3'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
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
    if (name === 'tambahSolar') {
      const num = value === '' ? null : Number(value)
      setForm(prev => ({ ...prev, tambahSolar: isNaN(num!) ? null : num }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
    setErrors(prev => ({ ...prev, [name as keyof FormData]: '' }))
  }

  const validate = (): Errors => {
    const newErrors: Errors = {}
    if (!form.jenisKendaraan.trim()) newErrors.jenisKendaraan = 'Jenis kendaraan wajib diisi'
    if (!form.tanggal) newErrors.tanggal = 'Tanggal wajib diisi'
    if (form.tambahSolar == null || form.tambahSolar <= 0) newErrors.tambahSolar = 'Jumlah solar harus valid (> 0 liter)'
    if (!form.photo) newErrors.photo = 'Foto struk wajib diupload'
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
      formData.append('jenisKendaraan', form.jenisKendaraan)
      formData.append('tambahSolar', String(form.tambahSolar!))
      formData.append('tanggal', form.tanggal)
      if (form.photo) formData.append('photo', form.photo)
      const res = await fetch('/api/reports/vehicle-fuel', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success('Laporan pengisian solar berhasil dibuat!')
        router.push('/reports/vehicle-fuel')
      } else {
        toast.error(data.message || 'Gagal membuat laporan pengisian solar')
      }
    } catch {
      toast.error('Kesalahan jaringan')
    } finally {
      setSubmitting(false)
    }
  }

 return (
  <div>
    <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent),radial-gradient(circle_at_50%_50%,rgba(120,200,255,0.2),transparent)] pointer-events-none animate-pulse" />

    <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden mx-auto">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-lpka-green/95 to-emerald-700 p-6 sm:p-8 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Pengisian Solar
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base md:text-lg mt-2 opacity-90">
            Laporan pengisian solar kendaraan dinas
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6 md:p-8 space-y-5 md:space-y-6"
        >
          {/* Jenis Kendaraan */}
          <div>
            <label className={labelClass}>Jenis Kendaraan *</label>
            <input
              name="jenisKendaraan"
              placeholder="Contoh: Toyota Avanza, Pick Up, dll"
              value={form.jenisKendaraan}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.jenisKendaraan && (
              <p className="text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium">
                {errors.jenisKendaraan}
              </p>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {/* Tanggal */}
            <div>
              <label className={labelClass}>Tanggal Pengisian *</label>
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

            {/* Tambah Solar */}
            <div>
              <label className={labelClass}>Tambah Solar (Liter) *</label>
              <input
                type="number"
                name="tambahSolar"
                placeholder="Contoh: 25.5"
                step="0.1"
                value={form.tambahSolar ?? ""}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.tambahSolar && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium">
                  {errors.tambahSolar}
                </p>
              )}
            </div>
          </div>

          {/* Upload */}
          <div>
            <label className={labelClass}>
              Upload Foto Struk Pembelian *
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full mt-2 p-3 border-2 border-dashed border-lpka-green/30 rounded-xl bg-lpka-green/5 text-sm sm:text-base file:mr-4 file:py-2 sm:file:py-3 file:px-4 sm:file:px-6 file:rounded-xl file:border-0 file:font-semibold file:bg-lpka-green file:text-white hover:file:bg-lpka-green/90 hover:border-lpka-green/50 transition-all cursor-pointer"
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
            className="w-full bg-gradient-to-r from-lpka-green to-emerald-600 hover:from-lpka-green/90 hover:to-emerald-600/90 text-white py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-lpka-green/50"
          >
            {submitting ? "Menyimpan Laporan..." : "Simpan Laporan"}
          </button>
        </form>
      </div>
    </div>
  </div>
)
}