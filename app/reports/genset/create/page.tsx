"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type FormData = {
  regu: string
  tanggal: string
  waktuPemakaianJam: number | null
  hourMeterAwal: number | null
  hourMeterAkhir: number | null
  solarLevelAwal: number | null
  solarLevelAkhir: number | null
  photo: File | null
}

type Errors = Partial<Record<keyof FormData, string>>

export default function CreateGensetReport() {
  const router = useRouter()

  const [form, setForm] = useState<FormData>({
    regu: '',
    tanggal: '',
    waktuPemakaianJam: null,
    hourMeterAwal: null,
    hourMeterAkhir: null,
    solarLevelAwal: null,
    solarLevelAkhir: null,
    photo: null
  })

  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  // 🔧 DIPERKECIL UNTUK MOBILE
  const inputClass =
    'w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lpka-green/50 focus:border-lpka-green shadow-sm transition md:px-4 md:py-3'

  const labelClass =
    'block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5 sm:mb-2'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target

    if (name === 'photo') {
      const file = files?.[0] || null
      if (file && !file.type.startsWith('image/')) {
        toast.error('❌ Hanya file foto yang diizinkan')
        return
      }
      setForm(prev => ({ ...prev, photo: file }))
      setErrors(prev => ({ ...prev, photo: '' }))
      return
    }

    const numericFields = [
      'waktuPemakaianJam',
      'hourMeterAwal',
      'hourMeterAkhir',
      'solarLevelAwal',
      'solarLevelAkhir'
    ]

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

    if (!form.regu.trim()) newErrors.regu = 'Regu wajib diisi'
    if (!form.tanggal) newErrors.tanggal = 'Tanggal wajib diisi'

    if (!form.waktuPemakaianJam || form.waktuPemakaianJam <= 0)
      newErrors.waktuPemakaianJam = 'Harus lebih dari 0 jam'

    if (form.hourMeterAwal == null || form.hourMeterAwal < 0)
      newErrors.hourMeterAwal = 'Hour meter awal tidak valid'

    if (
      form.hourMeterAkhir == null ||
      form.hourMeterAwal == null ||
      form.hourMeterAkhir <= form.hourMeterAwal
    )
      newErrors.hourMeterAkhir = 'Hour meter akhir harus > awal'

    if (
      form.solarLevelAwal == null ||
      form.solarLevelAwal < 0 ||
      form.solarLevelAwal > 100
    )
      newErrors.solarLevelAwal = 'Solar awal 0-100%'

    if (
      form.solarLevelAkhir == null ||
      form.solarLevelAkhir < 0 ||
      form.solarLevelAkhir > 100
    )
      newErrors.solarLevelAkhir = 'Solar akhir 0-100%'

    if (
      form.solarLevelAwal != null &&
      form.solarLevelAkhir != null &&
      form.solarLevelAkhir > form.solarLevelAwal
    )
      newErrors.solarLevelAkhir = 'Solar akhir ≤ awal'

    if (!form.photo) newErrors.photo = 'Foto wajib diupload'

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('⚠️ Mohon lengkapi data')
      return
    }

    setSubmitting(true)

    try {
      const solarPemakaian =
        (form.solarLevelAwal ?? 0) - (form.solarLevelAkhir ?? 0)

      const formData = new FormData()
      formData.append('regu', form.regu)
      formData.append('tanggal', form.tanggal)
      formData.append('waktuPemakaianJam', String(form.waktuPemakaianJam!))
      formData.append('hourMeterAwal', String(form.hourMeterAwal!))
      formData.append('hourMeterAkhir', String(form.hourMeterAkhir!))
      formData.append('solarLevelAwal', String(form.solarLevelAwal!))
      formData.append('solarLevelAkhir', String(form.solarLevelAkhir!))
      formData.append('solarPemakaian', String(solarPemakaian))

      if (form.photo) formData.append('photo', form.photo)

      const res = await fetch('/api/reports/genset', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast.success('✅ Berhasil!')
        router.push('/')
      } else {
        toast.error(data.message || '❌ Gagal')
      }
    } catch {
      toast.error('❌ Error jaringan')
    } finally {
      setSubmitting(false)
    }
  }

  const solarPreview =
    form.solarLevelAwal != null && form.solarLevelAkhir != null
      ? form.solarLevelAwal - form.solarLevelAkhir
      : null

  return (
    <div>
      {/* BACKGROUND */}
      <div className='fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.2),transparent),radial-gradient(circle_at_80%_20%,rgba(120,200,255,0.15),transparent)] pointer-events-none' />

      {/* CONTAINER */}
      <div className='relative z-10 flex items-start justify-center min-h-screen px-3 py-4 sm:p-6'>

        <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 overflow-hidden'>

          {/* HEADER */}
          <div className='bg-gradient-to-r from-lpka-green/95 to-green-700 p-4 sm:p-6 md:p-8 text-white'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>Laporan Genset</h1>
            <p className='text-green-100 text-sm mt-1'>Input data operasional</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className='p-4 sm:p-6 md:p-8 space-y-5 md:space-y-6'>

            {/* BASIC */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className={labelClass}>Regu *</label>
                <input name='regu' value={form.regu} onChange={handleChange} className={inputClass} />
                {errors.regu && <p className='text-red-500 text-xs mt-1'>{errors.regu}</p>}
              </div>

              <div>
                <label className={labelClass}>Tanggal *</label>
                <input type='date' name='tanggal' value={form.tanggal} onChange={handleChange} className={inputClass} />
                {errors.tanggal && <p className='text-red-500 text-xs mt-1'>{errors.tanggal}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>Waktu Pemakaian (Jam) *</label>
              <input type='number' name='waktuPemakaianJam' value={form.waktuPemakaianJam ?? ''} onChange={handleChange} className={inputClass} />
              {errors.waktuPemakaianJam && <p className='text-red-500 text-xs mt-1'>{errors.waktuPemakaianJam}</p>}
            </div>

            {/* HM */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className={labelClass}>HM Awal *</label>
                <input type='number' name='hourMeterAwal' value={form.hourMeterAwal ?? ''} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>HM Akhir *</label>
                <input type='number' name='hourMeterAkhir' value={form.hourMeterAkhir ?? ''} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            {/* SOLAR */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className={labelClass}>Solar Awal (%) *</label>
                <input type='number' name='solarLevelAwal' value={form.solarLevelAwal ?? ''} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Solar Akhir (%) *</label>
                <input type='number' name='solarLevelAkhir' value={form.solarLevelAkhir ?? ''} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            {/* PREVIEW */}
            {solarPreview != null && (
              <div className='p-3 rounded-xl bg-green-50 text-green-800 text-sm font-semibold border border-green-200'>
                Pemakaian: <span className='font-bold'>{solarPreview}%</span>
              </div>
            )}

            {/* FILE */}
            <div>
              <label className={labelClass}>Upload Foto *</label>
              <input type='file' name='photo' accept='image/*' onChange={handleChange}
                className="w-full p-2 border border-dashed border-lpka-green/40 rounded-xl text-sm file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:bg-lpka-green file:text-white"
              />
            </div>

            {/* BUTTON */}
            <button
              disabled={submitting}
              className='w-full bg-lpka-green text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition'
            >
              {submitting ? 'Menyimpan...' : 'Simpan Laporan'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}