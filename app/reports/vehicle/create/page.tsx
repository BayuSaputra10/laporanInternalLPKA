"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type FormData = {
  jenisKendaraan: string
  keperluan: string
  tanggal: string
  kmAwal: number | null
  kmAkhir: number | null
  solarAwalStrip: number | null
  solarAkhirStrip: number | null
  photo: File | null
}

type Errors = Partial<Record<keyof FormData, string>>

export default function CreateVehicleReport() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({
    jenisKendaraan: '',
    keperluan: '',
    tanggal: '',
    kmAwal: null,
    kmAkhir: null,
    solarAwalStrip: null,
    solarAkhirStrip: null,
    photo: null
  })

  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lpka-primary/50 focus:border-lpka-primary shadow-sm hover:shadow-md transition-all md:px-6 md:py-4'

  const labelClass = 'block text-sm font-semibold text-gray-800 mb-2 md:text-base md:mb-3'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target

    if (name === 'photo') {
      const file = files?.[0] || null
      if (file && !file.type.startsWith('image/')) {
        toast.error('❌ Hanya file foto yang diizinkan (jpg, png, gif, etc.)')
        return
      }
      setForm(prev => ({ ...prev, photo: file }))
      setErrors(prev => ({ ...prev, photo: '' }))
      return
    }

    const numericFields = ['kmAwal', 'kmAkhir', 'solarAwalStrip', 'solarAkhirStrip']

    if (numericFields.includes(name)) {
      const num = value === '' ? null : Number(value)
      setForm(prev => ({
        ...prev,
        [name]: isNaN(num!) ? null : num
      }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }

    setErrors(prev => ({ ...prev, [name as keyof FormData]: '' }))
  }

  const validate = (): Errors => {
    const newErrors: Errors = {}

    if (!form.jenisKendaraan.trim()) newErrors.jenisKendaraan = 'Jenis kendaraan wajib diisi'
    if (!form.keperluan.trim()) newErrors.keperluan = 'Keperluan wajib diisi'
    if (!form.tanggal) newErrors.tanggal = 'Tanggal wajib diisi'

    if (form.kmAwal == null || form.kmAwal < 0) newErrors.kmAwal = 'KM Awal harus valid (>= 0)'
    if (form.kmAkhir == null || form.kmAkhir < 0) newErrors.kmAkhir = 'KM Akhir harus valid (>= 0)'
    if (form.kmAwal != null && form.kmAkhir != null && form.kmAkhir <= form.kmAwal) newErrors.kmAkhir = 'KM Akhir harus > KM Awal'

    if (form.solarAwalStrip == null || form.solarAwalStrip < 0) newErrors.solarAwalStrip = 'Solar Awal harus valid (>= 0)'
    if (form.solarAkhirStrip == null || form.solarAkhirStrip < 0) newErrors.solarAkhirStrip = 'Solar Akhir harus valid (>= 0)'
    if (form.solarAwalStrip != null && form.solarAkhirStrip != null && form.solarAkhirStrip > form.solarAwalStrip) newErrors.solarAkhirStrip = 'Solar Akhir ≤ Awal'

    if (!form.photo) {
      newErrors.photo = 'Foto wajib diupload'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('⚠️ Mohon lengkapi data yang kurang')
      return
    }

    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('jenisKendaraan', form.jenisKendaraan)
      formData.append('keperluan', form.keperluan)
      formData.append('tanggal', form.tanggal)
      formData.append('kmAwal', String(form.kmAwal!))
      formData.append('kmAkhir', String(form.kmAkhir!))
      formData.append('solarAwalStrip', String(form.solarAwalStrip!))
      formData.append('solarAkhirStrip', String(form.solarAkhirStrip!))
      if (form.photo) formData.append('photo', form.photo)

      const res = await fetch('/api/reports/vehicle', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success('✅ Laporan kendaraan berhasil dibuat!')
        router.push('/')
      } else {
        toast.error(data.message || '❌ Gagal membuat laporan kendaraan')
      }
    } catch (error) {
      toast.error('❌ Kesalahan jaringan')
    } finally {
      setSubmitting(false)
    }
  }

  const solarPreview =
    form.solarAwalStrip != null && form.solarAkhirStrip != null
      ? form.solarAwalStrip - form.solarAkhirStrip
      : null

  return (
    <div className=''>
      <div className=' fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent),radial-gradient(circle_at_50%_50%,rgba(120,200,255,0.2),transparent)] pointer-events-none animate-pulse' />
      <div className='relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8'>
        <div className='w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden mx-auto'>

          {/* HEADER */}
          <div className='bg-gradient-to-r from-lpka-primary/95 to-blue-700 p-6 sm:p-8 text-white'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight'>🚛 Laporan Kendaraan</h1>
            <p className='text-blue-100 text-sm sm:text-base md:text-lg mt-2 opacity-90'>Input data operasional harian</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className='p-6 sm:p-8 md:p-10 space-y-6 md:space-y-8'>

            {/* BASIC */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              <div>
                <label className={labelClass}>Jenis Kendaraan *</label>
                <input name='jenisKendaraan' value={form.jenisKendaraan} onChange={handleChange} className={inputClass} />
                {errors.jenisKendaraan && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.jenisKendaraan}</p>}
              </div>

              <div>
                <label className={labelClass}>Keperluan *</label>
                <input name='keperluan' value={form.keperluan} onChange={handleChange} className={inputClass} />
                {errors.keperluan && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.keperluan}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>Tanggal *</label>
              <input type='date' name='tanggal' value={form.tanggal} onChange={handleChange} className={inputClass} />
              {errors.tanggal && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.tanggal}</p>}
            </div>

            {/* KM */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              <div>
                <label className={labelClass}>KM Awal *</label>
                <input type='number' name='kmAwal' value={form.kmAwal ?? ''} onChange={handleChange} className={inputClass} />
                {errors.kmAwal && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.kmAwal}</p>}
              </div>

              <div>
                <label className={labelClass}>KM Akhir *</label>
                <input type='number' name='kmAkhir' value={form.kmAkhir ?? ''} onChange={handleChange} className={inputClass} />
                {errors.kmAkhir && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.kmAkhir}</p>}
              </div>
            </div>

            {/* SOLAR */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              <div>
                <label className={labelClass}>Solar Awal (%)</label>
                <input type='number' name='solarAwalStrip' value={form.solarAwalStrip ?? ''} onChange={handleChange} className={inputClass} />
                {errors.solarAwalStrip && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.solarAwalStrip}</p>}
              </div>

              <div>
                <label className={labelClass}>Solar Akhir (%)</label>
                <input type='number' name='solarAkhirStrip' value={form.solarAkhirStrip ?? ''} onChange={handleChange} className={inputClass} />
                {errors.solarAkhirStrip && <p className='text-red-500 text-xs sm:text-sm mt-1 md:mt-2 font-medium'>{errors.solarAkhirStrip}</p>}
              </div>
            </div>

            {solarPreview != null && (
              <div className='p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 text-sm sm:text-base md:text-lg font-semibold shadow-lg border border-blue-200'>
                Pemakaian Solar: <span className='text-xl sm:text-2xl md:text-3xl font-black'>{solarPreview + "%"}</span>
              </div>
            )}

            {/* FILE */}
            <div>
              <label className={labelClass}>Upload Foto *</label>
              <input type='file' name='photo' accept='image/*' onChange={handleChange} className="w-full mt-2 p-3 border-2 border-dashed border-lpka-primary/30 rounded-xl bg-lpka-primary/5 text-sm sm:text-base file:mr-4 file:py-2 sm:file:py-3 file:px-4 sm:file:px-6 file:rounded-xl file:border-0 file:font-semibold file:bg-lpka-primary file:text-white hover:file:bg-lpka-primary/90 hover:border-lpka-primary/50 transition-all cursor-pointer" />
              {errors.photo && <p className='text-red-500 text-xs sm:text-sm mt-2 font-medium'>{errors.photo}</p>}
            </div>

            {/* BUTTON */}
            <button
              disabled={submitting}
              className='w-full bg-gradient-to-r from-lpka-primary to-blue-600 hover:from-lpka-primary/90 hover:to-blue-600/90 text-white py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-lpka-primary/50'
            >
              {submitting ? 'Menyimpan Laporan...' : '💾 Simpan Laporan Kendaraan'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

